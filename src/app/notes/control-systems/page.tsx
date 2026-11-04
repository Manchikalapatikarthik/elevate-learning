
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Activity,
  Layers,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Control Systems Notes – All 5 Units | ELEVIT",
  description:
    "Access 94 pages of handwritten Control Systems notes covering system concepts, time response, stability, frequency response, compensation and controllers.",
  alternates: {
    canonical: "https://elevateorbit.in/notes/control-systems",
  },
  openGraph: {
    title: "Control Systems Notes | ELEVIT",
    description:
      "Explore all five units of Control Systems with 94 pages of handwritten engineering notes.",
    url: "https://elevateorbit.in/notes/control-systems",
    siteName: "ELEVIT",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const units = [
  {
    number: "01",
    title: "Unit 1",
    topic: "System Concepts",
    pages: 22,
    description:
      "Open loop systems, closed loop systems, transfer functions, block diagrams, signal flow graphs, Mason’s gain formula, and mathematical modeling techniques.",
    href: "/notes/control-systems/unit-1",
  },
  {
    number: "02",
    title: "Unit 2",
    topic: "Time Response Analysis",
    pages: 21,
    description:
      "Standard test signals, first and second order systems, steady state error, dynamic error constants, and time domain specifications.",
    href: "/notes/control-systems/unit-2",
  },
  {
    number: "03",
    title: "Unit 3",
    topic: "Stability of Control Systems",
    pages: 20,
    description:
      "Routh Hurwitz criterion, root locus analysis, Nyquist stability criterion, pole-zero effects, and stability concepts.",
    href: "/notes/control-systems/unit-3",
  },
  {
    number: "04",
    title: "Unit 4",
    topic: "Frequency Response Analysis",
    pages: 14,
    description:
      "Frequency response, bode plots, Nyquist plots, gain margin, phase margin, and time-frequency correlation.",
    href: "/notes/control-systems/unit-4",
  },
  {
    number: "05",
    title: "Unit 5",
    topic: "Compensation and Controllers",
    pages: 17,
    description:
      "Lag compensation, lead compensation, lag-lead networks, P, PI, PID controllers, and bode plot-based controller design.",
    href: "/notes/control-systems/unit-5",
  },
];

const totalPages = units.reduce((total, unit) => total + unit.pages, 0);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Control Systems",
  description:
    "Five-unit undergraduate Control Systems study resource containing 94 pages of handwritten engineering notes.",
  provider: {
    "@type": "Organization",
    name: "ELEVIT",
    url: "https://elevateorbit.in",
  },
  educationalLevel: "Undergraduate",
  inLanguage: "en",
  numberOfCredits: 5,
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
  },
};

export default function ControlSystemsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />

        <div className="absolute right-[-200px] top-[850px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />

        <div className="absolute bottom-[300px] left-[-200px] h-[350px] w-[350px] rounded-full bg-[#38DDF2]/[0.04] blur-[140px]" />
      </div>

      <Navbar />

      {/* SUBJECT HEADER */}

      <section className="relative px-6 pb-16 pt-40 sm:pt-44">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/notes"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07] shadow-[0_0_35px_rgba(56,221,242,0.06)]">
            <Activity size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
            <span className="h-1 w-1 rounded-full bg-[#9B7BFF]" />
            ECE
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Control Systems
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Build a strong understanding of control system principles
            through unit-wise handwritten notes. Explore mathematical
            modeling, time response, stability analysis, frequency
            response, compensation networks, and controller design.
          </p>

          {/* COURSE STATISTICS */}

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-[#141722]/80 p-5">
              <div className="mb-3 flex items-center gap-2 text-[#38DDF2]">
                <Layers size={18} />
                <span className="text-xs text-[#94A9C5]">Course Units</span>
              </div>
              <p className="text-3xl font-bold text-white">05</p>
              <p className="mt-1 text-xs text-[#718096]">Complete units</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-[#141722]/80 p-5">
              <div className="mb-3 flex items-center gap-2 text-[#9B7BFF]">
                <FileText size={18} />
                <span className="text-xs text-[#94A9C5]">Study Material</span>
              </div>
              <p className="text-3xl font-bold text-white">{totalPages}</p>
              <p className="mt-1 text-xs text-[#718096]">Handwritten pages</p>
            </div>

            <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-[#141722]/80 p-5 sm:col-span-1">
              <div className="mb-3 flex items-center gap-2 text-[#4D9BF5]">
                <GraduationCap size={18} />
                <span className="text-xs text-[#94A9C5]">Learning</span>
              </div>
              <p className="text-3xl font-bold text-white">100%</p>
              <p className="mt-1 text-xs text-[#718096]">Self-paced access</p>
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* UNIT DIRECTORY */}

      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-6xl">
          {/* SECTION HEADER */}

          <div className="mb-10">
            <div className="mb-4 flex items-center gap-2 text-[#38DDF2]">
              <Layers size={17} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                COURSE CONTENT
              </span>
            </div>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Explore Units
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#8292AC] sm:text-base">
                  Select a unit to access its handwritten notes and
                  interactive reading experience.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#94A9C5]">
                <Sparkles size={15} className="text-[#9B7BFF]" />
                5 units · {totalPages} pages
              </div>
            </div>
          </div>

          {/* UNIT CARDS */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <Link
                key={unit.number}
                href={unit.href}
                className="group relative block overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#141D30] to-[#101521] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/40 hover:shadow-[0_15px_45px_rgba(56,221,242,0.08)]"
              >
                {/* CARD GLOW */}

                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#38DDF2]/[0.04] blur-3xl transition group-hover:bg-[#38DDF2]/[0.10]" />

                <div className="relative">
                  {/* TOP ROW */}

                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]">
                      <BookOpen
                        size={23}
                        className="text-[#38DDF2]"
                      />
                    </div>

                    <div className="flex h-9 items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 text-xs text-[#94A9C5]">
                      {unit.pages} pages
                    </div>
                  </div>

                  {/* UNIT NUMBER */}

                  <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-[#38DDF2]">
                    UNIT {unit.number}
                  </p>

                  {/* UNIT TITLE */}

                  <h3 className="text-2xl font-bold text-white transition group-hover:text-[#BCEFFF]">
                    {unit.title}
                  </h3>

                  {/* TOPIC */}

                  <h4 className="mt-4 text-lg font-semibold leading-snug text-[#CBD5E1]">
                    {unit.topic}
                  </h4>

                  {/* DESCRIPTION */}

                  <p className="mt-4 min-h-[112px] text-sm leading-7 text-[#94A9C5]">
                    {unit.description}
                  </p>

                  {/* EXPLORE */}

                  <div className="mt-7 flex items-center justify-between border-t border-white/[0.07] pt-5">
                    <div className="flex items-center gap-2 text-sm font-medium text-[#38DDF2]">
                      Explore Unit
                      <ArrowRight
                        size={16}
                        className="transition duration-300 group-hover:translate-x-1"
                      />
                    </div>

                    <span className="text-xs text-[#64748B]">
                      {unit.number}/05
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* STUDY TIP */}

          <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-[#9B7BFF]/15 bg-gradient-to-r from-[#9B7BFF]/[0.07] to-[#4D9BF5]/[0.04] p-6 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#9B7BFF]/10">
              <BookOpen size={21} className="text-[#9B7BFF]" />
            </div>

            <div>
              <h3 className="font-semibold text-white">
                Make the most of your notes
              </h3>
              <p className="mt-1 text-sm leading-7 text-[#94A9C5]">
                Use the reader controls to zoom into handwritten
                explanations, navigate between pages, save your reading
                progress, and print the complete unit for offline study.
              </p>
            </div>
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
