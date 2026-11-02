
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Navbar from "../../components/Navbar";

type Params = Promise<{ slug: string }>;

export default async function PostPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;

  const fullPath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">

      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[850px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.09] blur-[150px]" />

        <div className="absolute right-[-200px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* ARTICLE HEADER */}

      <section className="relative px-6 pb-14 pt-40 sm:pt-48">
        <div className="mx-auto max-w-4xl">

          {/* JOURNAL LABEL */}

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-4 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38DDF2] shadow-[0_0_10px_#38DDF2]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8DEBFA]">
              THE ELEVIT JOURNAL
            </span>
          </div>

          {/* TITLE */}

          <h1 className="text-4xl font-bold leading-[1.2] tracking-tight text-white sm:text-5xl md:text-6xl">
            {matterResult.data.title}
          </h1>

          {/* PUBLICATION DATE */}

          {matterResult.data.date && (
            <div className="mt-9 flex items-center gap-3">
              <div className="h-px w-8 bg-[#38DDF2]/60" />

              <p className="text-sm tracking-wide text-[#8292AC]">
                {matterResult.data.date}
              </p>
            </div>
          )}

          {/* DIVIDER */}

          <div className="mt-12 h-px w-full bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />

        </div>
      </section>

      {/* ARTICLE CONTENT */}

      <article className="relative px-6 pb-28">
        <div className="mx-auto max-w-4xl">

          <div
            className="
              article-content

              [&_h1]:mb-7
              [&_h1]:mt-14
              [&_h1]:text-3xl
              [&_h1]:font-bold
              [&_h1]:tracking-tight
              [&_h1]:text-white

              [&_h2]:mb-6
              [&_h2]:mt-14
              [&_h2]:border-l-2
              [&_h2]:border-[#38DDF2]
              [&_h2]:pl-5
              [&_h2]:text-2xl
              [&_h2]:font-bold
              [&_h2]:tracking-tight
              [&_h2]:text-white
              sm:[&_h2]:text-3xl

              [&_h3]:mb-4
              [&_h3]:mt-10
              [&_h3]:text-xl
              [&_h3]:font-semibold
              [&_h3]:text-[#BCEFFF]

              [&_p]:mb-7
              [&_p]:text-base
              [&_p]:leading-[2]
              [&_p]:text-[#A9B8CC]
              sm:[&_p]:text-[17px]

              [&_strong]:font-semibold
              [&_strong]:text-white

              [&_em]:text-[#C4B5FD]

              [&_a]:font-medium
              [&_a]:text-[#38DDF2]
              [&_a]:underline
              [&_a]:decoration-[#38DDF2]/30
              [&_a]:underline-offset-4
              hover:[&_a]:text-[#9B7BFF]

              [&_ul]:mb-8
              [&_ul]:list-disc
              [&_ul]:space-y-3
              [&_ul]:pl-7
              [&_ul]:text-[#A9B8CC]

              [&_ol]:mb-8
              [&_ol]:list-decimal
              [&_ol]:space-y-3
              [&_ol]:pl-7
              [&_ol]:text-[#A9B8CC]

              [&_li]:pl-2
              [&_li]:leading-8
              [&_li::marker]:text-[#38DDF2]

              [&_blockquote]:my-10
              [&_blockquote]:border-l-2
              [&_blockquote]:border-[#9B7BFF]
              [&_blockquote]:rounded-r-2xl
              [&_blockquote]:bg-[#9B7BFF]/[0.06]
              [&_blockquote]:px-7
              [&_blockquote]:py-6

              [&_blockquote_p]:mb-0
              [&_blockquote_p]:text-[#C4B5FD]

              [&_hr]:my-12
              [&_hr]:border-white/[0.08]

              [&_pre]:my-9
              [&_pre]:overflow-x-auto
              [&_pre]:rounded-2xl
              [&_pre]:border
              [&_pre]:border-white/[0.08]
              [&_pre]:bg-[#111827]
              [&_pre]:p-6
              [&_pre]:text-sm
              [&_pre]:leading-7
              [&_pre]:text-[#BCEFFF]

              [&_code]:rounded-md
              [&_code]:bg-white/[0.06]
              [&_code]:px-1.5
              [&_code]:py-1
              [&_code]:font-mono
              [&_code]:text-sm
              [&_code]:text-[#38DDF2]

              [&_pre_code]:bg-transparent
              [&_pre_code]:p-0
              [&_pre_code]:text-inherit

              [&_img]:my-10
              [&_img]:h-auto
              [&_img]:w-full
              [&_img]:rounded-2xl
              [&_img]:border
              [&_img]:border-white/[0.08]
            "
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* ARTICLE END */}

          <div className="mt-16 border-t border-white/[0.08] pt-10">

            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#38DDF2] shadow-[0_0_12px_#38DDF2]" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8292AC]">
                End of article
              </p>
            </div>

            <p className="mt-4 text-sm leading-7 text-[#718096]">
              Keep exploring. Keep questioning. Keep building.
            </p>

            <LinkBack />

          </div>

        </div>
      </article>

      {/* FOOTER */}

      <footer className="relative border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm text-[#718096]">
            <span className="font-semibold text-[#38DDF2]">
              ELEVIT
            </span>
            {" "}· By Elevate Orbit
          </p>

          <p className="mt-2 text-xs text-[#526078]">
            Learn. Build. Grow.
          </p>

        </div>
      </footer>

    </main>
  );
}

/* =========================================================
   BACK TO JOURNAL
========================================================= */

function LinkBack() {
  return (
    <a
      href="/blog"
      className="mt-7 inline-flex items-center gap-2 rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-5 py-3 text-sm font-medium text-[#38DDF2] transition duration-300 hover:border-[#38DDF2]/40 hover:bg-[#38DDF2]/[0.12]"
    >
      Back to Journal
      <span aria-hidden="true">→</span>
    </a>
  );
}
