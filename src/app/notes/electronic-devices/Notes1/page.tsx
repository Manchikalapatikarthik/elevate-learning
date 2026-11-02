
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Cpu,
} from "lucide-react";
import Navbar from "../../../components/Navbar";

export default function ElectronicDevicesNotes1() {
  const images = Array.from({ length: 47 }, (_, i) => i + 1);

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]"
    >
      {/* BACKGROUND ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />
        <div className="absolute right-[-180px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* SUBJECT HEADER */}
      <section className="relative px-6 pb-14 pt-40 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/notes"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <Cpu size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Electronic Devices
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Explore your Electronic Devices handwritten notes,
            organized page by page for focused learning,
            understanding electronic components, and exam preparation.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              <BookOpen size={16} className="text-[#38DDF2]" />
              Notes Set 1
            </div>

            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              47 Pages
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* NOTES PAGES */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#38DDF2]">
                STUDY MATERIAL
              </p>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Notes Set 1
              </h2>
            </div>

            <p className="text-sm text-[#8292AC]">
              47 handwritten pages
            </p>
          </div>

          <div className="space-y-8">
            {images.map((page) => (
              <article
                key={page}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111827] p-3 shadow-[0_12px_40px_rgba(0,0,0,0.18)] sm:rounded-3xl sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between px-1">
                  <p className="text-sm font-semibold text-[#CBD5E1]">
                    Page {String(page).padStart(2, "0")}
                  </p>

                  <span className="rounded-full border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06] px-3 py-1 text-xs text-[#38DDF2]">
                    Notes 1
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl bg-white sm:rounded-2xl">
                  <Image
                    src={`/notes/electronic-devices/Notes1/${page}.jpg`}
                    alt={`Electronic Devices notes - Page ${page}`}
                    width={1200}
                    height={1700}
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="h-auto w-full"
                    priority={page === 1}
                  />
                </div>
              </article>
            ))}
          </div>

          {/* END OF NOTES */}
          <div className="mt-16 rounded-3xl border border-[#38DDF2]/15 bg-gradient-to-br from-[#141F32] to-[#111827] px-6 py-10 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]">
              <BookOpen size={25} className="text-[#38DDF2]" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              You’ve reached the end!
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#94A9C5]">
              You have viewed all 47 pages in this notes set.
              Keep learning and revising with ELEVIT.
            </p>

            <Link
              href="/notes"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3 text-sm font-semibold text-[#07111F] transition hover:brightness-110"
            >
              <ArrowLeft size={16} />
              Back to All Notes
            </Link>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-sm text-[#8292AC] transition hover:text-[#38DDF2]"
            >
              <ArrowUp size={16} />
              Back to top
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/[0.06] px-6 py-9">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-[#718096]">
            <span className="font-semibold text-[#38DDF2]">ELEVIT</span>
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
