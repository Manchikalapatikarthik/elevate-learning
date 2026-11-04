import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUp, BookOpen, Clock3, Cpu, Sparkles } from "lucide-react";
import Navbar from "../../../components/Navbar";

const BASE_URL = "https://elevateorbit.in";
const PAGE_URL = `${BASE_URL}/notes/cmos-vlsi-design/unit-5`;

export const metadata: Metadata = {
  title: "CMOS VLSI Design Unit 5 Notes – Coming Soon | ELEVIT",
  description:
    "CMOS VLSI Design Unit 5 handwritten notes will be available soon on ELEVIT.",
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function Unit5Page() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]"
    >
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-200px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />

        <div className="absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.07] blur-[140px]" />

        <div className="absolute left-[-150px] top-[600px] h-[350px] w-[350px] rounded-full bg-[#38DDF2]/[0.04] blur-[130px]" />
      </div>

      <Navbar />

      <section className="relative flex min-h-[85vh] items-center px-6 pb-20 pt-36">
        <div className="mx-auto w-full max-w-5xl">

          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="mb-12 flex flex-wrap items-center gap-2 text-sm text-[#8292AC]"
          >
            <Link href="/notes" className="transition hover:text-[#38DDF2]">
              Notes
            </Link>

            <span>/</span>

            <Link
              href="/notes/cmos-vlsi-design"
              className="transition hover:text-[#38DDF2]"
            >
              CMOS VLSI Design
            </Link>

            <span>/</span>

            <span className="text-[#CBD5E1]">Unit 5</span>
          </nav>

          {/* UNIT ICON */}
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <Cpu size={31} className="text-[#38DDF2]" />
          </div>

          {/* LABEL */}
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#38DDF2]">
            CMOS VLSI DESIGN · UNIT 05
          </p>

          {/* TITLE */}
          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
            Something
            <span className="block bg-gradient-to-r from-[#38DDF2] via-[#4D9BF5] to-[#9B7BFF] bg-clip-text text-transparent">
              is coming.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            We're preparing the handwritten notes for CMOS VLSI Design
            Unit 5. This section will be updated as soon as the study
            material is ready.
          </p>

          {/* COMING SOON CARD */}
          <div className="mt-12 max-w-2xl overflow-hidden rounded-3xl border border-[#38DDF2]/15 bg-gradient-to-br from-[#141F32] to-[#0D1422] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] sm:p-9">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]">
                <Clock3 size={21} className="text-[#38DDF2]" />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Notes Coming Soon
                </h2>

                <p className="mt-1 text-xs text-[#8292AC]">
                  Unit 5 study material is being prepared
                </p>
              </div>
            </div>

            <div className="my-7 h-px bg-white/[0.07]" />

            <div className="flex items-start gap-3">
              <Sparkles
                size={19}
                className="mt-1 shrink-0 text-[#9B7BFF]"
              />

              <p className="text-sm leading-7 text-[#94A9C5]">
                The complete notes reader will include page navigation,
                zoom controls, saved reading progress, fullscreen mode,
                and PDF printing once the notes are uploaded.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38DDF2]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#38DDF2]" />
              Content in preparation
            </div>
          </div>

          {/* BACK BUTTON */}
          <div className="mt-10">
            <Link
              href="/notes/cmos-vlsi-design"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3.5 text-sm font-semibold text-[#07111F] transition hover:brightness-110"
            >
              <ArrowLeft size={17} />
              Explore Other Units
            </Link>
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

          <a
            href="#top"
            className="mt-5 inline-flex items-center gap-2 text-xs text-[#8292AC] transition hover:text-[#38DDF2]"
          >
            <ArrowUp size={14} />
            Back to top
          </a>
        </div>
      </footer>
    </main>
  );
}