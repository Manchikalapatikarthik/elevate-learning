
import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import sanitizeHtml from "sanitize-html";

import { adminDb } from "../../../../lib/firebaseAdmin";
import { verifyAdmin } from "../../../../lib/verifyAdmin";

export const runtime = "nodejs";

const articlesCollection = adminDb.collection("articles");

class ArticleValidationError extends Error {}

function serializeArticle(doc: FirebaseFirestore.QueryDocumentSnapshot) {
  const data = doc.data();

  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
    updatedAt: data.updatedAt?.toDate?.().toISOString() ?? null,
    publishedAt: data.publishedAt?.toDate?.().toISOString() ?? null,
  };
}

function cleanArticleContent(content: string) {
  return sanitizeHtml(content, {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "h1", "h2", "h3", "img", "figure", "figcaption",
    ],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height"],
      code: ["class"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
      }),
    },
  });
}

function validImageUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !!url.hostname;
  } catch {
    return false;
  }
}

function validArticleId(id: string | null): id is string {
  return Boolean(id && /^[a-zA-Z0-9_-]+$/.test(id));
}

function validateArticle(body: Record<string, unknown>) {
  const {
    title, slug, excerpt, content, category, author,
    status, tags, coverImage, seoTitle, metaDescription,
  } = body;

  if (
    typeof title !== "string" ||
    typeof slug !== "string" ||
    typeof excerpt !== "string" ||
    typeof content !== "string" ||
    typeof category !== "string" ||
    typeof author !== "string"
  ) {
    throw new ArticleValidationError("Please provide all required article fields.");
  }

  const cleanTitle = title.trim();
  const cleanSlug = slug.trim().toLowerCase();
  const cleanExcerpt = excerpt.trim();
  const cleanCategory = category.trim();
  const cleanAuthor = author.trim();
  const cleanSeoTitle = typeof seoTitle === "string" ? seoTitle.trim() : "";
  const cleanMetaDescription =
    typeof metaDescription === "string" ? metaDescription.trim() : "";
  const cleanCoverImage =
    typeof coverImage === "string" ? coverImage.trim() : "";

  if (
    !cleanTitle || !cleanSlug || !cleanExcerpt ||
    !content.trim() || !cleanCategory || !cleanAuthor
  ) {
    throw new ArticleValidationError("Required fields cannot be empty.");
  }

  if (
    cleanTitle.length > 160 ||
    cleanSlug.length > 180 ||
    cleanExcerpt.length > 300 ||
    cleanCategory.length > 80 ||
    cleanAuthor.length > 100 ||
    cleanSeoTitle.length > 70 ||
    cleanMetaDescription.length > 160 ||
    content.length > 500000
  ) {
    throw new ArticleValidationError("One or more fields exceed the allowed length.");
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(cleanSlug)) {
    throw new ArticleValidationError(
      "Slug must contain lowercase letters, numbers and hyphens only."
    );
  }

  if (status !== "draft" && status !== "published") {
    throw new ArticleValidationError("Status must be draft or published.");
  }

  if (
    !Array.isArray(tags) ||
    !tags.every((tag) => typeof tag === "string") ||
    tags.length > 15
  ) {
    throw new ArticleValidationError("Tags must be an array of up to 15 strings.");
  }

  const cleanTags = tags.map((tag: string) => tag.trim()).filter(Boolean);

  if (cleanTags.some((tag: string) => tag.length > 40)) {
    throw new ArticleValidationError("Each tag must be 40 characters or fewer.");
  }

  if (
    coverImage !== undefined &&
    coverImage !== null &&
    typeof coverImage !== "string"
  ) {
    throw new ArticleValidationError("Cover image must be a URL string.");
  }

  if (cleanCoverImage && !validImageUrl(cleanCoverImage)) {
    throw new ArticleValidationError("Cover image must be a valid HTTPS URL.");
  }

  const cleanContent = cleanArticleContent(content);

  if (!cleanContent.trim()) {
    throw new ArticleValidationError("Article content is empty after sanitization.");
  }

  return {
    title: cleanTitle,
    slug: cleanSlug,
    excerpt: cleanExcerpt,
    content: cleanContent,
    category: cleanCategory,
    author: cleanAuthor,
    status,
    tags: cleanTags,
    coverImage: cleanCoverImage,
    seoTitle: cleanSeoTitle,
    metaDescription: cleanMetaDescription,
  };
}

// GET: Fetch all articles
export async function GET() {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const snapshot = await articlesCollection
      .orderBy("updatedAt", "desc")
      .get();

    return NextResponse.json({
      articles: snapshot.docs.map(serializeArticle),
    });
  } catch (error) {
    console.error("Fetch articles error:", error);

    return NextResponse.json(
      { error: "Unable to fetch articles." },
      { status: 500 }
    );
  }
}

// POST: Create an article
export async function POST(request: NextRequest) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const articleData = validateArticle(body);

    const existing = await articlesCollection
      .where("slug", "==", articleData.slug)
      .limit(1)
      .get();

    if (!existing.empty) {
      return NextResponse.json(
        { error: "An article with this slug already exists." },
        { status: 409 }
      );
    }

    const articleRef = await articlesCollection.add({
      ...articleData,
      createdBy: admin.uid,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt:
        articleData.status === "published"
          ? FieldValue.serverTimestamp()
          : null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Article created successfully.",
        id: articleRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create article error:", error);

    if (error instanceof ArticleValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Unable to create article." },
      { status: 500 }
    );
  }
}

// PATCH: Edit or unpublish an article
export async function PATCH(request: NextRequest) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const id = request.nextUrl.searchParams.get("id");

    if (!validArticleId(id)) {
      return NextResponse.json(
        { error: "A valid article ID is required." },
        { status: 400 }
      );
    }

    const articleRef = articlesCollection.doc(id);
    const existingDoc = await articleRef.get();

    if (!existingDoc.exists) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    // Unpublish without changing article content
    if (request.nextUrl.searchParams.get("action") === "unpublish") {
      await articleRef.update({
        status: "draft",
        publishedAt: null,
        updatedAt: FieldValue.serverTimestamp(),
      });

      return NextResponse.json({
        success: true,
        message: "Article moved to drafts.",
      });
    }

    const body = await request.json();
    const articleData = validateArticle(body);

    const duplicate = await articlesCollection
      .where("slug", "==", articleData.slug)
      .limit(2)
      .get();

    if (duplicate.docs.some((doc) => doc.id !== id)) {
      return NextResponse.json(
        { error: "Another article already uses this slug." },
        { status: 409 }
      );
    }

    const previousData = existingDoc.data();

    await articleRef.update({
      ...articleData,
      updatedAt: FieldValue.serverTimestamp(),
      publishedAt:
        articleData.status === "published"
          ? previousData?.publishedAt || FieldValue.serverTimestamp()
          : null,
    });

    return NextResponse.json({
      success: true,
      message: "Article updated successfully.",
      id,
    });
  } catch (error) {
    console.error("Update article error:", error);

    if (error instanceof ArticleValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Unable to update article." },
      { status: 500 }
    );
  }
}

// DELETE: Permanently delete an article record
export async function DELETE(request: NextRequest) {
  try {
    const admin = await verifyAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "Unauthorized access." },
        { status: 401 }
      );
    }

    const id = request.nextUrl.searchParams.get("id");

    if (!validArticleId(id)) {
      return NextResponse.json(
        { error: "A valid article ID is required." },
        { status: 400 }
      );
    }

    const articleRef = articlesCollection.doc(id);
    const articleDoc = await articleRef.get();

    if (!articleDoc.exists) {
      return NextResponse.json(
        { error: "Article not found." },
        { status: 404 }
      );
    }

    await articleRef.delete();

    return NextResponse.json({
      success: true,
      message: "Article deleted successfully.",
    });
  } catch (error) {
    console.error("Delete article error:", error);

    return NextResponse.json(
      { error: "Unable to delete article." },
      { status: 500 }
    );
  }
}
