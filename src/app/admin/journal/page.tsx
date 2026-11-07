
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen, Plus, ArrowLeft, FileText, Eye, Clock, Globe,
  RefreshCw, Image as ImageIcon, Pencil, Trash2, Search,
  X, ExternalLink, Archive,
} from "lucide-react";

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  status: "draft" | "published";
  coverImage?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

type Filter = "all" | "draft" | "published";

export default function JournalManagerPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyId, setBusyId] = useState("");
  const [preview, setPreview] = useState<Article | null>(null);

  async function fetchArticles() {
    setLoading(true);
    setError("");

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

      setArticles(data.articles || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const drafts = articles.filter((a) => a.status === "draft");
  const published = articles.filter((a) => a.status === "published");

  const categories = useMemo(
    () => Array.from(new Set(articles.map((a) => a.category).filter(Boolean))).sort(),
    [articles]
  );

  const filteredArticles = articles.filter((article) => {
    const matchesStatus = filter === "all" || article.status === filter;
    const term = search.trim().toLowerCase();

    const matchesSearch =
      !term ||
      article.title.toLowerCase().includes(term) ||
      article.slug.toLowerCase().includes(term) ||
      article.excerpt.toLowerCase().includes(term) ||
      article.author.toLowerCase().includes(term);

    const matchesCategory =
      categoryFilter === "all" || article.category === categoryFilter;

    return matchesStatus && matchesSearch && matchesCategory;
  });

  function formatDate(date?: string | null) {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  async function deleteArticle(article: Article) {
    const confirmed = window.confirm(
      `Permanently delete "${article.title}"? This cannot be undone.`
    );

    if (!confirmed) return;

    setBusyId(article.id);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/articles?id=${encodeURIComponent(article.id)}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to delete article.");
      }

      setArticles((current) =>
        current.filter((a) => a.id !== article.id)
      );

      if (preview?.id === article.id) setPreview(null);

      setMessage("Article deleted successfully.");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Delete failed."
      );
    } finally {
      setBusyId("");
    }
  }

  async function unpublishArticle(article: Article) {
    const confirmed = window.confirm(
      `Move "${article.title}" back to drafts?`
    );

    if (!confirmed) return;

    setBusyId(article.id);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/articles?id=${encodeURIComponent(article.id)}&action=unpublish`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to unpublish article.");
      }

      setArticles((current) =>
        current.map((a) =>
          a.id === article.id
            ? { ...a, status: "draft", publishedAt: null }
            : a
        )
      );

      if (preview?.id === article.id) {
        setPreview({
          ...article,
          status: "draft",
          publishedAt: null,
        });
      }

      setMessage("Article moved back to drafts.");
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Unpublish failed."
      );
    } finally {
      setBusyId("");
    }
  }

  const tabClass = (tab: Filter) =>
    `rounded-xl px-5 py-3 text-sm font-medium transition ${
      filter === tab
        ? "bg-cyan-400 text-black"
        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <main className="min-h-screen bg-[#080b14] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-10"
        >
          <ArrowLeft size={18} />
          Back to Admin Dashboard
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div>
            <p className="text-cyan-400 text-sm tracking-[0.25em] mb-3">
              ELEVIT JOURNAL
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold">
              Journal Manager
            </h1>

            <p className="text-gray-400 mt-3">
              Create, search, preview and manage your engineering articles.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={fetchArticles}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-gray-300 hover:bg-white/5 disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>

            <Link
              href="/admin/journal/new"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-black hover:bg-cyan-300"
            >
              <Plus size={19} />
              Create Article
            </Link>
          </div>
        </div>

        {message && (
          <div className="mb-6 flex items-center justify-between rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-sm text-cyan-200">
            {message}

            <button
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-9">
          {[
            {
              label: "Total Articles",
              value: articles.length,
              icon: BookOpen,
              color: "text-cyan-400",
              note: "All journal content",
            },
            {
              label: "Drafts",
              value: drafts.length,
              icon: Clock,
              color: "text-amber-400",
              note: "Waiting to be published",
            },
            {
              label: "Published",
              value: published.length,
              icon: Globe,
              color: "text-green-400",
              note: "Live on your journal",
            },
          ].map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#111827] p-6"
              >
                <div className="flex items-center justify-between">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <Icon className={stat.color} size={22} />
                </div>

                <h2 className="text-3xl font-bold mt-4">
                  {loading ? "—" : stat.value}
                </h2>

                <p className="text-xs text-gray-500 mt-2">
                  {stat.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* ARTICLE WORKSPACE */}
        <section className="rounded-2xl border border-white/10 bg-[#111827] p-6 sm:p-8">

          <div className="flex flex-col gap-5 mb-7">
            <div>
              <h2 className="text-xl font-semibold">Your Articles</h2>

              <p className="text-sm text-gray-400 mt-2">
                Search, filter, preview, edit, unpublish or delete content.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className={tabClass("all")}
                onClick={() => setFilter("all")}
              >
                All ({articles.length})
              </button>

              <button
                className={tabClass("draft")}
                onClick={() => setFilter("draft")}
              >
                Drafts ({drafts.length})
              </button>

              <button
                className={tabClass("published")}
                onClick={() => setFilter("published")}
              >
                Published ({published.length})
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search title, slug, excerpt or author..."
                  className="w-full rounded-xl border border-white/10 bg-[#080b14] py-3 pl-11 pr-4 outline-none focus:border-cyan-400"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#080b14] px-4 py-3 text-gray-200 outline-none focus:border-cyan-400"
              >
                <option value="all">All categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading && (
            <div className="py-16 text-center text-gray-400">
              <RefreshCw
                size={30}
                className="mx-auto text-cyan-400 animate-spin"
              />

              <p className="mt-4">Loading your articles...</p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-6 text-center">
              <p className="text-red-300">{error}</p>

              <button
                onClick={fetchArticles}
                className="mt-4 text-cyan-400"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && filteredArticles.length === 0 && (
            <div className="border border-dashed border-white/15 rounded-xl p-12 text-center">
              <FileText
                size={38}
                className="mx-auto text-gray-500 mb-4"
              />

              <h3 className="text-lg font-semibold">
                No matching articles
              </h3>

              <p className="text-gray-400 mt-2 text-sm">
                Try another search or filter, or create a new article.
              </p>
            </div>
          )}

          {!loading && !error && filteredArticles.length > 0 && (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col sm:flex-row gap-5 rounded-xl border border-white/10 bg-[#080b14] p-5 hover:border-cyan-400/20"
                >
                  <div className="w-full sm:w-44 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                    {article.coverImage ? (
                      <img
                        src={article.coverImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={30} className="text-gray-600" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          article.status === "published"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-amber-400/10 text-amber-400"
                        }`}
                      >
                        {article.status === "published" ? "Published" : "Draft"}
                      </span>

                      <span className="text-xs text-gray-500">
                        {article.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500">
                      <span>Created: {formatDate(article.createdAt)}</span>
                      <span>Updated: {formatDate(article.updatedAt)}</span>
                      <span>Slug: {article.slug}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-5">
                      <button
                        onClick={() => setPreview(article)}
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        <Eye size={16} />
                        Preview
                      </button>

                      <Link
                        href={`/admin/journal/new?id=${encodeURIComponent(article.id)}`}
                        className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        <Pencil size={16} />
                        Edit
                      </Link>

                      {article.status === "published" && (
                        <>
                          <Link
                            href={`/blog/${article.slug}`}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                          >
                            <ExternalLink size={15} />
                            View live
                          </Link>

                          <button
                            onClick={() => unpublishArticle(article)}
                            disabled={busyId === article.id}
                            className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 disabled:opacity-50"
                          >
                            <Archive size={15} />
                            Unpublish
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => deleteArticle(article)}
                        disabled={busyId === article.id}
                        className="inline-flex items-center gap-2 text-sm text-red-400 hover:text-red-300 disabled:opacity-50"
                      >
                        <Trash2 size={15} />
                        {busyId === article.id ? "Please wait..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ARTICLE PREVIEW */}
        {preview && (
          <div
            className="fixed inset-0 z-50 bg-black/80 p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setPreview(null)}
          >
            <div
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#080b14] p-6 sm:p-10"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                onClick={() => setPreview(null)}
                className="absolute right-5 top-5 rounded-lg border border-white/10 p-2 text-gray-300 hover:text-white"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>

              <p className="text-xs uppercase tracking-widest text-cyan-400 mb-4">
                Article preview · {preview.status}
              </p>

              {preview.coverImage && (
                <img
                  src={preview.coverImage}
                  alt={preview.title}
                  className="w-full max-h-72 object-cover rounded-xl mb-7"
                />
              )}

              <p className="text-sm text-gray-500 mb-3">
                {preview.category} · {preview.author} · {formatDate(preview.updatedAt)}
              </p>

              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {preview.title}
              </h2>

              <p className="text-gray-400 text-lg mb-8">
                {preview.excerpt}
              </p>

              <div
                className="prose prose-invert max-w-none prose-img:rounded-xl prose-a:text-cyan-400"
                dangerouslySetInnerHTML={{
                  __html: preview.content || "<p>No article content available.</p>",
                }}
              />

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/admin/journal/new?id=${encodeURIComponent(preview.id)}`}
                  className="rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-black"
                >
                  Edit Article
                </Link>

                <button
                  onClick={() => setPreview(null)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-gray-300"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
