
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

import Navbar from "../../../components/Navbar";

export default function AnalogIntegratedCircuitsNotes1() {
  const images = Array.from({ length: 64 }, (_, i) => i + 1);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">

      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />
        <div className="absolute right-[-200px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* SUBJECT HEADER */}

      <section className="relative px-6 pb-12 pt-36 sm:pt-40">
        <div className="mx-auto max-w-5xl">

          <Link
            href="/notes"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <BookOpen size={27} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Analog Integrated Circuits
          </h1>

          <p className="mt-5 text-base leading-7 text-[#94A9C5] sm:text-lg">
            Study materials and handwritten notes for
            Analog Integrated Circuits.
          </p>

          <div className="mt-9 inline-flex items-center gap-3 rounded-xl border border-[#38DDF2]/15 bg-[#141D30]/80 px-5 py-3">
            <span className="h-2 w-2 rounded-full bg-[#38DDF2]" />
            <span className="text-sm font-medium text-[#BCEFFF]">
              Notes Set 1
            </span>
            <span className="text-xs text-[#718096]">
              64 Pages
            </span>
          </div>

          <div className="mt-12 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />

        </div>
      </section>

      {/* NOTES PAGES */}

      <section className="relative px-4 pb-28 sm:px-6">
        <div className="mx-auto max-w-5xl">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Notes 1
              </h2>
              <p className="mt-2 text-sm text-[#718096]">
                Scroll through the pages below.
              </p>
            </div>
          </div>

          <div className="space-y-12">

            {images.map((page) => (
              <div
                key={page}
                className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111827]/70 p-3 shadow-[0_15px_50px_rgba(0,0,0,0.2)] sm:rounded-3xl sm:p-5"
              >

                <div className="mb-4 flex items-center justify-between px-1">
                  <span className="text-sm font-medium text-[#BCEFFF]">
                    Page {String(page).padStart(2, "0")}
                  </span>

                  <span className="text-xs text-[#718096]">
                    {page} / 64
                  </span>
                </div>

                <Image
                  src={`/notes/anolog-integrated-circuit/Notes1/${page}.jpg`}
                  alt={`Analog Integrated Circuits Notes 1 - Page ${page}`}
                  width={1200}
                  height={1700}
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="h-auto w-full rounded-xl border border-white/[0.06] bg-white object-contain"
                  priority={page === 1}
                />

              </div>
            ))}

          </div>

          {/* END OF NOTES */}

          <div className="mt-16 border-t border-white/[0.08] pt-10 text-center">
            <p className="text-sm text-[#8292AC]">
              You've reached the end of Notes Set 1.
            </p>

            <Link
              href="/notes"
              className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-5 py-3 text-sm font-medium text-[#38DDF2] transition hover:bg-[#38DDF2]/[0.12]"
            >
              <ArrowLeft size={16} />
              Back to All Subjects
            </Link>
          </div>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative border-t border-white/[0.06] px-6 py-9">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm text-[#718096]">
            <span className="font-semibold text-[#38DDF2]">
              ELEVIT
            </span>
            {" "}· By Elevate Orbit
          </p>
        </div>
      </footer>

    </main>
  );
}
