
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

import Navbar from "../components/Navbar";
import { getAllPosts } from "../../lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">

      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-280px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/10 blur-[150px]" />

        <div className="absolute right-[-200px] top-[800px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.06] blur-[140px]" />
      </div>

      <Navbar />

      {/* HERO */}

      <section className="relative px-6 pb-24 pt-40 sm:pb-28 sm:pt-48">
        <div className="mx-auto max-w-5xl text-center">

          {/* EYEBROW */}

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38DDF2] shadow-[0_0_10px_#38DDF2]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8DEBFA]">
              THE ELEVIT JOURNAL
            </span>
          </div>

          {/* HEADING */}

          <h1 className="text-5xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-6xl md:text-[76px]">
            Knowledge that
            <br />
            <span className="bg-gradient-to-r from-[#38DDF2] via-[#65B6F8] to-[#A58AFF] bg-clip-text text-transparent">
              moves you forward.
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            A space for ideas, discoveries and perspectives
            across engineering, technology and innovation.
            Learn something new. See things differently.
          </p>

          {/* DECORATIVE DIVIDER */}

          <div className="mx-auto mt-12 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#38DDF2]/60" />

            <div className="h-1.5 w-1.5 rounded-full bg-[#38DDF2]" />

            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#9B7BFF]/60" />
          </div>

        </div>
      </section>

      {/* ARTICLES */}

      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-7xl">

          {/* SECTION INTRO */}

          <div className="mb-12 border-b border-white/[0.08] pb-8">

            <div className="mb-4 flex items-center gap-2 text-[#38DDF2]">
              <BookOpen size={16} />

              <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
                Explore & Discover
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From the journal
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#8292AC] sm:text-base">
              Thoughtful reads on the technologies,
              ideas and innovations shaping tomorrow.
            </p>

          </div>

          {/* EMPTY STATE */}

          {posts.length === 0 && (
            <div className="rounded-3xl border border-white/[0.08] bg-[#111827]/70 px-8 py-20 text-center">

              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06]">
                <Sparkles size={28} className="text-[#38DDF2]" />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                Something worth reading is on its way.
              </h3>

              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#94A9C5]">
                We're preparing new ideas, discoveries and
                technical insights for the ELEVIT Journal.
                Stay tuned.
              </p>

            </div>
          )}

          {/* ARTICLE GRID */}

          {posts.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">

              {posts.map((post, index) => (

                <Link
                  href={`/blog/${post.slug}`}
                  key={post.slug}
                  className="group relative flex min-h-[290px] flex-col overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#111827]/75 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/30 hover:bg-[#141F32] sm:p-9"
                >

                  {/* CARD GLOW */}

                  <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#38DDF2]/[0.035] blur-[70px] transition duration-500 group-hover:bg-[#38DDF2]/[0.09]" />

                  {/* TOP ROW */}

                  <div className="relative mb-9 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-[0.12em] text-[#38DDF2]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="h-1 w-1 rounded-full bg-[#526078]" />

                      <span className="text-xs text-[#718096]">
                        {post.date}
                      </span>
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.025] transition duration-300 group-hover:border-[#38DDF2]/30 group-hover:bg-[#38DDF2]/10">
                      <MoveUpRight
                        size={17}
                        className="text-[#8292AC] transition group-hover:text-[#38DDF2]"
                      />
                    </div>

                  </div>

                  {/* ARTICLE TITLE */}

                  <h3 className="relative max-w-xl text-2xl font-semibold leading-snug tracking-tight text-white transition duration-300 group-hover:text-[#BCEFFF] sm:text-[28px]">
                    {post.title}
                  </h3>

                  {/* EXCERPT */}

                  <p className="relative mt-5 line-clamp-3 text-sm leading-7 text-[#94A9C5] sm:text-base">
                    {post.excerpt}
                  </p>

                  {/* BOTTOM */}

                  <div className="relative mt-auto flex items-center justify-between pt-9">

                    <span className="text-sm font-medium text-[#38DDF2]">
                      Read article
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-[#38DDF2] transition duration-300 group-hover:translate-x-1"
                    />

                  </div>

                </Link>

              ))}

            </div>
          )}

        </div>
      </section>

      {/* BOTTOM BRAND SECTION */}

      <section className="relative border-t border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm font-medium tracking-wide text-[#94A9C5]">
            Curiosity creates possibilities.
          </p>

          <p className="mt-3 text-xs tracking-[0.16em] text-[#526078]">
            ELEVIT · BY ELEVATE ORBIT
          </p>

        </div>
      </section>

    </main>
  );
}
