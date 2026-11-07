
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { adminDb } from "./firebaseAdmin";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage?: string;
  source: "firestore" | "markdown";
};

export async function getAllPosts(): Promise<BlogPost[]> {
  // 1. Load existing Markdown articles
  let markdownPosts: BlogPost[] = [];

  if (fs.existsSync(postsDirectory)) {
    const fileNames = fs.readdirSync(postsDirectory);

    markdownPosts = fileNames
      .filter((fileName) => fileName.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        return {
          slug,
          title: String(matterResult.data.title || slug),
          date: String(matterResult.data.date || ""),
          excerpt: String(matterResult.data.excerpt || ""),
          source: "markdown" as const,
        };
      });
  }

  // 2. Load published Firestore articles
  try {
    const snapshot = await adminDb
      .collection("articles")
      .where("status", "==", "published")
      .get();

    const firestorePosts: BlogPost[] = snapshot.docs.map((doc) => {
      const data = doc.data();

      const publishedDate =
        data.publishedAt?.toDate?.() ??
        data.createdAt?.toDate?.() ??
        null;

      return {
        slug: String(data.slug || doc.id),
        title: String(data.title || ""),
        date: publishedDate
          ? publishedDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "",
        excerpt: String(data.excerpt || ""),
        coverImage: String(data.coverImage || ""),
        source: "firestore" as const,
      };
    });

    // 3. Prefer Firestore when a slug exists in both sources
    const firestoreSlugs = new Set(
      firestorePosts.map((post) => post.slug)
    );

    const combinedPosts = [
      ...firestorePosts,
      ...markdownPosts.filter(
        (post) => !firestoreSlugs.has(post.slug)
      ),
    ];

    return combinedPosts;
  } catch (error) {
    console.error("Unable to fetch Firestore articles:", error);

    // Keep the existing Markdown blog working if Firestore is unavailable.
    return markdownPosts;
  }
}
