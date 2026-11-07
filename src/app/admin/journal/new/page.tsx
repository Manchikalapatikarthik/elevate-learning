
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useUploadThing } from "@/lib/uploadthing";
import {
  ArrowLeft,
  Bold,
  Italic,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Save,
  Globe,
  Upload,
} from "lucide-react";

const categories = [
  "Embedded Systems",
  "VLSI",
  "IoT",
  "Artificial Intelligence",
  "Electronics",
  "Engineering",
  "Technology",
  "Research",
];

type ArticleData = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  tags: string[];
  coverImage?: string;
  seoTitle?: string;
  metaDescription?: string;
};

export default function NewArticlePage() {
  const router = useRouter();

  const coverInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);

  const [articleId, setArticleId] = useState("");
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Engineering");
  const [author, setAuthor] = useState("ELEVIT Editorial Team");
  const [tags, setTags] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          defaultProtocol: "https",
        },
      }),
      ImageExtension,
      Placeholder.configure({
        placeholder: "Start writing your article here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none min-h-[400px] focus:outline-none p-5 text-gray-200",
      },
    },
  });

  // Upload cover image
  const {
    startUpload: uploadCover,
    isUploading: isCoverUploading,
  } = useUploadThing("articleImageUploader", {
    onClientUploadComplete: (res) => {
      const url = res[0]?.serverData?.uploadedFileUrl;

      if (!url) {
        setMessage("Upload completed, but no image URL was returned.");
        return;
      }

      setCoverImage(url);
      setMessage("Cover image uploaded successfully!");
    },
    onUploadError: (error) => {
      setMessage(`Cover image upload failed: ${error.message}`);
    },
  });

  // Upload images inside article
  const {
    startUpload: uploadContentImage,
    isUploading: isContentUploading,
  } = useUploadThing("articleImageUploader", {
    onClientUploadComplete: (res) => {
      const url = res[0]?.serverData?.uploadedFileUrl;

      if (!url) {
        setMessage("Upload completed, but no image URL was returned.");
        return;
      }

      editor?.chain().focus().setImage({ src: url }).run();
      setMessage("Image inserted into your article!");
    },
    onUploadError: (error) => {
      setMessage(`Article image upload failed: ${error.message}`);
    },
  });

  // Detect edit mode
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setArticleId(params.get("id") || "");
  }, []);

  // Load existing article when Edit is clicked
  useEffect(() => {
    if (!articleId || !editor) return;

    let cancelled = false;

    async function loadArticle() {
      setLoadingArticle(true);
      setMessage("");

      try {
        const response = await fetch("/api/admin/articles", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load articles.");
        }

        const article: ArticleData | undefined =
          (data.articles || []).find(
            (item: ArticleData) => item.id === articleId
          );

        if (!article) {
          throw new Error("Article not found.");
        }

        if (cancelled) return;

        setTitle(article.title || "");
        setSlug(article.slug || "");
        setExcerpt(article.excerpt || "");
        setCategory(article.category || "Engineering");
        setAuthor(article.author || "ELEVIT Editorial Team");
        setTags(
          Array.isArray(article.tags) ? article.tags.join(", ") : ""
        );
        setCoverImage(article.coverImage || "");
        setSeoTitle(article.seoTitle || "");
        setMetaDescription(article.metaDescription || "");

        editor?.commands.setContent(article.content || "");
      } catch (error) {
        if (!cancelled) {
          setMessage(
            error instanceof Error
              ? error.message
              : "Unable to load article."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingArticle(false);
        }
      }
    }

    loadArticle();

    return () => {
      cancelled = true;
    };
  }, [articleId, editor]);

  function updateTitle(value: string) {
    setTitle(value);

    setSlug(
      value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    );

    if (!seoTitle) setSeoTitle(value);
  }

  function addLink() {
    if (!editor) return;

    const url = window.prompt("Enter the link URL:");

    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }

  function addImageByUrl() {
    if (!editor) return;

    const url = window.prompt("Enter the image URL:");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  async function handleCoverUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    setMessage("Uploading cover image...");

    try {
      await uploadCover([file]);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Cover upload failed."
      );
    }
  }

  async function handleContentImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");
      return;
    }

    if (!editor) {
      setMessage("The article editor is not ready.");
      return;
    }

    setMessage("Uploading article image...");

    try {
      await uploadContentImage([file]);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Image upload failed."
      );
    }
  }

  async function saveArticle(status: "draft" | "published") {
    setMessage("");

    if (
      !title.trim() ||
      !slug.trim() ||
      !excerpt.trim() ||
      !editor ||
      editor.isEmpty
    ) {
      setMessage(
        "Please complete the title, slug, excerpt and article content."
      );
      return;
    }

    if (isCoverUploading || isContentUploading) {
      setMessage("Please wait for image uploads to finish.");
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        articleId
          ? `/api/admin/articles?id=${encodeURIComponent(articleId)}`
          : "/api/admin/articles",
        {
          method: articleId ? "PATCH" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            slug,
            excerpt,
            content: editor.getHTML(),
            category,
            author,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean),
            coverImage,
            status,
            seoTitle,
            metaDescription,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to save article.");
      }

      setMessage(
        articleId
          ? "Article updated successfully!"
          : status === "published"
            ? "Article published successfully!"
            : "Draft saved successfully!"
      );

      router.push("/admin/journal");
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  const toolbarButton =
    "p-2 rounded-lg border border-white/10 hover:bg-cyan-400/15 hover:text-cyan-300 transition";

  const uploadsInProgress = isCoverUploading || isContentUploading;

  return (
    <main className="min-h-screen bg-[#080b14] text-white px-5 py-8 sm:px-8">
      <div className="max-w-6xl mx-auto">

        <Link
          href="/admin/journal"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8"
        >
          <ArrowLeft size={18} />
          Back to Journal Manager
        </Link>

        <div className="mb-9">
          <p className="text-cyan-400 tracking-[0.25em] text-sm mb-3">
            ELEVIT JOURNAL
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold">
            {articleId ? "Edit Article" : "Create New Article"}
          </h1>

          <p className="text-gray-400 mt-2">
            {articleId
              ? "Update your existing engineering article."
              : "Write, optimize and publish your engineering content."}
          </p>
        </div>

        {loadingArticle && (
          <p className="mb-5 text-cyan-400">
            Loading article details...
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

          <section className="lg:col-span-2 space-y-6">

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-6">

              <label className="block text-sm text-gray-300 mb-2">
                Article Title *
              </label>

              <input
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Enter your article title"
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />

              <label className="block text-sm text-gray-300 mt-5 mb-2">
                URL Slug *
              </label>

              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="your-article-url"
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />

              <p className="text-xs text-gray-500 mt-2">
                URL: elevateorbit.in/blog/{slug || "your-article-url"}
              </p>

              <label className="block text-sm text-gray-300 mt-5 mb-2">
                Short Description / Excerpt *
              </label>

              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="Write a short introduction to your article..."
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-cyan-400 resize-y"
              />

              <p className="text-xs text-gray-500 mt-1 text-right">
                {excerpt.length}/300
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden">

              <div className="p-4 border-b border-white/10">
                <h2 className="font-semibold mb-4">
                  Article Content *
                </h2>

                <div className="flex flex-wrap gap-2">

                  <button type="button" className={toolbarButton}
                    title="Bold"
                    onClick={() => editor?.chain().focus().toggleBold().run()}>
                    <Bold size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Italic"
                    onClick={() => editor?.chain().focus().toggleItalic().run()}>
                    <Italic size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Heading 1"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
                    <Heading1 size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Heading 2"
                    onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
                    <Heading2 size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Bullet list"
                    onClick={() => editor?.chain().focus().toggleBulletList().run()}>
                    <List size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Numbered list"
                    onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
                    <ListOrdered size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Quote"
                    onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
                    <Quote size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Add link"
                    onClick={addLink}>
                    <LinkIcon size={17} />
                  </button>

                  <button type="button" className={toolbarButton}
                    title="Insert image by URL"
                    onClick={addImageByUrl}>
                    <ImageIcon size={17} />
                  </button>

                  <button
                    type="button"
                    className={toolbarButton}
                    title="Upload image into article"
                    disabled={isContentUploading}
                    onClick={() => contentInputRef.current?.click()}
                  >
                    <Upload size={17} />
                  </button>

                  <input
                    ref={contentInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleContentImageUpload}
                  />

                </div>

                {isContentUploading && (
                  <p className="text-xs text-cyan-300 mt-3">
                    Uploading image into article...
                  </p>
                )}
              </div>

              <EditorContent editor={editor} />

            </div>
          </section>

          <aside className="space-y-6">

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h2 className="font-semibold mb-4">
                Publishing Details
              </h2>

              <label className="block text-sm text-gray-300 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-3 py-3 outline-none"
              >
                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <label className="block text-sm text-gray-300 mt-5 mb-2">
                Author
              </label>

              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-cyan-400"
              />

              <label className="block text-sm text-gray-300 mt-5 mb-2">
                Tags
              </label>

              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="ESP32, IoT, Electronics"
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-cyan-400"
              />

              <p className="text-xs text-gray-500 mt-2">
                Separate tags with commas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h2 className="font-semibold mb-4">
                Cover Image
              </h2>

              <button
                type="button"
                disabled={isCoverUploading}
                onClick={() => coverInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-cyan-400/40 text-cyan-300 py-3 hover:bg-cyan-400/10 disabled:opacity-50"
              >
                <Upload size={18} />
                {isCoverUploading ? "Uploading..." : "Upload Cover Image"}
              </button>

              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCoverUpload}
              />

              <p className="text-xs text-gray-500 mt-3">
                Select an image from your computer. Maximum size: 8 MB.
              </p>

              <p className="text-xs text-gray-500 mt-4 mb-2">
                Or paste an image URL
              </p>

              <input
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Paste image URL"
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-cyan-400"
              />

              {coverImage && (
                <img
                  src={coverImage}
                  alt="Article cover preview"
                  className="w-full h-36 object-cover rounded-xl mt-4"
                />
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#111827] p-5">
              <h2 className="font-semibold mb-4">
                SEO Settings
              </h2>

              <label className="block text-sm text-gray-300 mb-2">
                SEO Title
              </label>

              <input
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                maxLength={70}
                placeholder="Search engine title"
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-cyan-400"
              />

              <label className="block text-sm text-gray-300 mt-4 mb-2">
                Meta Description
              </label>

              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                maxLength={160}
                rows={3}
                placeholder="SEO description..."
                className="w-full bg-[#080b14] border border-white/10 rounded-xl px-3 py-3 outline-none focus:border-cyan-400 resize-y"
              />
            </div>

            {message && (
              <p className="text-sm text-amber-300 break-words">
                {message}
              </p>
            )}

            <div className="space-y-3">

              <button
                type="button"
                disabled={saving || uploadsInProgress || loadingArticle}
                onClick={() => saveArticle("draft")}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3 hover:bg-white/5 disabled:opacity-50"
              >
                <Save size={18} />
                {saving
                  ? "Saving..."
                  : articleId
                    ? "Save Changes as Draft"
                    : "Save as Draft"}
              </button>

              <button
                type="button"
                disabled={saving || uploadsInProgress || loadingArticle}
                onClick={() => saveArticle("published")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-cyan-400 text-black font-semibold py-3 hover:bg-cyan-300 disabled:opacity-50"
              >
                <Globe size={18} />
                {saving
                  ? "Saving..."
                  : articleId
                    ? "Save Changes & Publish"
                    : "Publish Article"}
              </button>

            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
