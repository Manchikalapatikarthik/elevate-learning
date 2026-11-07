
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  Settings,
  LogOut,
  BookOpen,
  ArrowRight,
} from "lucide-react";

import { auth } from "../../firebase";
import { ADMIN_UID } from "../../lib/admin";

type RecentArticle = {
  id: string;
  title: string;
  status: "draft" | "published";
  updatedAt?: string | null;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [journalLoading, setJournalLoading] = useState(true);

  const [journalStats, setJournalStats] = useState({
    total: 0,
    drafts: 0,
    published: 0,
    recent: [] as RecentArticle[],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser || currentUser.uid !== ADMIN_UID) {
        setUnauthorized(true);
        setLoading(false);
        router.replace("/admin/login");
        return;
      }

      try {
        const response = await fetch("/api/admin/session", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          await signOut(auth);
          setUnauthorized(true);
          router.replace("/admin/login");
          return;
        }

        setUser(currentUser);

        try {
          const articlesResponse = await fetch("/api/admin/articles", {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          });

          if (articlesResponse.ok) {
            const articlesData = await articlesResponse.json();
            const articles: RecentArticle[] = articlesData.articles || [];

            setJournalStats({
              total: articles.length,
              drafts: articles.filter(
                (article) => article.status === "draft"
              ).length,
              published: articles.filter(
                (article) => article.status === "published"
              ).length,
              recent: [...articles]
                .sort(
                  (a, b) =>
                    new Date(b.updatedAt || 0).getTime() -
                    new Date(a.updatedAt || 0).getTime()
                )
                .slice(0, 5),
            });
          }
        } catch (error) {
          console.error("Journal analytics error:", error);
        } finally {
          setJournalLoading(false);
        }
      } catch (error) {
        console.error("Session verification error:", error);
        setUnauthorized(true);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/session", {
        method: "DELETE",
      });

      await signOut(auth);
      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070B16] text-white">
        <p className="text-[#94A9C5]">
          Verifying administrator access...
        </p>
      </main>
    );
  }

  if (unauthorized || !user) {
    return null;
  }

  const dashboardCards = [
    {
      title: "Journal Manager",
      description: "Create, edit, preview and publish ELEVIT articles.",
      icon: BookOpen,
      href: "/admin/journal",
      accent: "text-[#38DDF2]",
    },
    {
      title: "Notes",
      description: "Manage subjects, notes and study resources.",
      icon: FileText,
      href: "/admin/notes",
      accent: "text-white",
    },
    {
      title: "Uploads",
      description: "Manage resources contributed by students.",
      icon: Upload,
      href: "/admin/uploads",
      accent: "text-white",
    },
    {
      title: "Contributions",
      description: "Review suggestions and community contributions.",
      icon: MessageSquare,
      href: "/admin/contributions",
      accent: "text-white",
    },
    {
      title: "Settings",
      description: "Manage platform settings and administration options.",
      icon: Settings,
      href: "/admin/settings",
      accent: "text-white",
    },
  ];

  return (
    <main className="min-h-screen bg-[#070B16] text-[#F8FAFC]">
      <header className="border-b border-white/[0.08] bg-[#070B16]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-extrabold tracking-wide">
              ELEVIT
            </h1>

            <p className="text-xs text-[#8292AC]">
              Elevate Orbit Administration
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-white/[0.1] px-4 py-2 text-sm text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-[#38DDF2]">
            Admin Portal
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Welcome to Elevate Orbit
          </h2>

          <p className="mt-3 text-[#94A9C5]">
            Signed in as {user.email}
          </p>
        </div>

        {/* JOURNAL HIGHLIGHT */}
        <button
          onClick={() => router.push("/admin/journal")}
          className="mb-8 flex w-full items-center justify-between rounded-3xl border border-[#38DDF2]/20 bg-gradient-to-r from-[#38DDF2]/10 to-[#9B7BFF]/10 p-7 text-left transition hover:border-[#38DDF2]/50"
        >
          <div>
            <div className="flex items-center gap-3">
              <BookOpen className="text-[#38DDF2]" size={28} />

              <h3 className="text-2xl font-bold">
                ELEVIT Journal Manager
              </h3>
            </div>

            <p className="mt-3 text-sm text-[#94A9C5]">
              Your workspace for creating and publishing engineering articles.
            </p>
          </div>

          <ArrowRight className="text-[#38DDF2]" size={24} />
        </button>

        {/* JOURNAL ANALYTICS */}
        <section className="mb-10">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.25em] text-[#38DDF2]">
              CONTENT OVERVIEW
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              Journal Analytics
            </h3>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { label: "Total Articles", value: journalStats.total },
              { label: "Published", value: journalStats.published },
              { label: "Drafts", value: journalStats.drafts },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/[0.08] bg-[#111827]/80 p-6"
              >
                <p className="text-sm text-[#94A9C5]">
                  {item.label}
                </p>

                <p className="mt-3 text-3xl font-bold text-[#38DDF2]">
                  {journalLoading ? "—" : item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl border border-white/[0.08] bg-[#111827]/80 p-6">
            <h4 className="text-lg font-bold mb-5">
              Recently Updated Articles
            </h4>

            {journalLoading ? (
              <p className="text-sm text-[#94A9C5]">
                Loading journal activity...
              </p>
            ) : journalStats.recent.length === 0 ? (
              <p className="text-sm text-[#94A9C5]">
                No articles available yet.
              </p>
            ) : (
              <div className="space-y-4">
                {journalStats.recent.map((article) => (
                  <div
                    key={article.id}
                    className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">
                        {article.title}
                      </p>

                      <p className="text-xs text-[#8292AC] mt-1">
                        {article.updatedAt
                          ? new Date(article.updatedAt).toLocaleDateString("en-IN")
                          : "Date unavailable"}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        article.status === "published"
                          ? "bg-green-400/10 text-green-400"
                          : "bg-amber-400/10 text-amber-400"
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => router.push("/admin/journal")}
              className="mt-5 text-sm text-[#38DDF2] hover:text-white"
            >
              Manage all articles →
            </button>
          </div>
        </section>

        {/* DASHBOARD CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.title}
                onClick={() => router.push(card.href)}
                className="rounded-3xl border border-white/[0.08] bg-[#111827]/80 p-7 text-left transition hover:-translate-y-1 hover:border-[#38DDF2]/30 hover:bg-[#141F32]"
              >
                <Icon
                  size={30}
                  className={`mb-5 ${card.accent}`}
                />

                <h3 className="text-xl font-bold">
                  {card.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#94A9C5]">
                  {card.description}
                </p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#38DDF2]">
                  Open section <ArrowRight size={15} />
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl border border-white/[0.08] bg-[#111827]/70 p-8">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="text-[#38DDF2]" size={24} />

            <h3 className="text-xl font-bold">
              ELEVIT Administration
            </h3>
          </div>

          <p className="mt-3 text-sm leading-7 text-[#94A9C5]">
            Manage your learning platform, educational resources
            and engineering journal from one workspace.
          </p>
        </div>
      </div>
    </main>
  );
}
