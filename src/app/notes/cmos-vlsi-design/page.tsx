import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
  GraduationCap,
} from "lucide-react";

import Navbar from "../../components/Navbar";

const BASE_URL = "https://elevateorbit.in";
const PAGE_URL = `${BASE_URL}/notes/cmos-vlsi-design`;

export const metadata: Metadata = {
  title: "CMOS VLSI Design Notes – All 5 Units | ELEVIT",
  description:
    "Explore unit-wise handwritten CMOS VLSI Design notes for engineering students. Access study material, navigate pages, and revise with ELEVIT.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "CMOS VLSI Design Notes | ELEVIT",
    description:
      "Explore handwritten CMOS VLSI Design notes organized across five units.",
    url: PAGE_URL,
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
    description: "Introduction to CMOS Technology",
    href: "/notes/cmos-vlsi-design/unit-1",
    pages: "41 Pages",
    available: true,
  },
  {
    number: "02",
    title: "Unit 2",
    description: "MOS Transistor Theory",
    href: "/notes/cmos-vlsi-design/unit-2",
    pages: "31 Pages",
    available: true,
  },
  {
    number: "03",
    title: "Unit 3",
    description: "CMOS Logic Circuits",
    href: "/notes/cmos-vlsi-design/unit-3",
    pages: "36 Pages",
    available: true,
  },
  {
    number: "04",
    title: "Unit 4",
    description: "VLSI Design Methodologies",
    href: "/notes/cmos-vlsi-design/unit-4",
    pages: "32 Pages",
    available: true,
  },
  {
    number: "05",
    title: "Unit 5",
    description: "Notes Coming Soon",
    href: "/notes/cmos-vlsi-design/unit-5",
    pages: "In Preparation",
    available: false,
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "CMOS VLSI Design",
  description:
    "Unit-wise CMOS VLSI Design study resources and handwritten engineering notes.",
  url: PAGE_URL,
  provider: {
    "@type": "Organization",
    name: "ELEVIT",
    url: BASE_URL,
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
  },
};

export default function CMOSVLSIDesignPage() {
  const availableUnits = units.filter((unit) => unit.available).length;

  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]"
    >
      {/* STRUCTURED DATA */}
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

        <div className="absolute bottom-[300px] left-[-180px] h-[350px] w-[350px] rounded-full bg-[#38DDF2]/[0.04] blur-[130px]" />
      </div>

      <Navbar />

      {/* SUBJECT HEADER */}
      <section className="relative px-6 pb-16 pt-40 sm:pt-44">
        <div className="mx-auto max-w-6xl">

          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="mb-10 flex items-center gap-2 text-sm text-[#8292AC]"
          >
            <Link
              href="/notes"
              className="transition hover:text-[#38DDF2]"
            >
              Notes
            </Link>

            <span>/</span>

            <span className="text-[#CBD5E1]">
              CMOS VLSI Design
            </span>
          </nav>

          <Link
            href="/notes"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          {/* SUBJECT ICON */}
          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <Cpu size={31} className="text-[#38DDF2]" />
          </div>

          {/* EYEBROW */}
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          {/* TITLE */}
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            CMOS VLSI Design
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Explore unit-wise handwritten notes for CMOS VLSI Design.
            Access organized study materials, navigate through individual
            pages, and revise concepts at your own pace.
          </p>

          {/* COURSE STATS */}
          <div className="mt-9 flex flex-wrap gap-3">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-[#CBD5E1]">
              <BookOpen size={16} className="text-[#38DDF2]" />
              5 Units
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-[#CBD5E1]">
              <GraduationCap size={17} className="text-[#9B7BFF]" />
              Engineering
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-sm text-[#CBD5E1]">
              <Sparkles size={16} className="text-[#38DDF2]" />
              {availableUnits} Units Available
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

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Units
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#8292AC] sm:text-base">
              Choose a unit to access its handwritten study materials.
            </p>

          </div>

          {/* UNIT CARDS */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {units.map((unit) => (
              <Link
                key={unit.number}
                href={unit.href}
                aria-label={`${unit.title}: ${unit.description}`}
                className={`group relative block overflow-hidden rounded-3xl border p-7 transition duration-300 ${
                  unit.available
                    ? "border-white/[0.08] bg-gradient-to-br from-[#141D30] to-[#101521] hover:-translate-y-1 hover:border-[#38DDF2]/40 hover:shadow-[0_15px_45px_rgba(56,221,242,0.08)]"
                    : "border-[#9B7BFF]/10 bg-gradient-to-br from-[#151727] to-[#101521] hover:-translate-y-1 hover:border-[#9B7BFF]/30"
                }`}
              >

                {/* CARD BACKGROUND GLOW */}
                <div
                  className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition ${
                    unit.available
                      ? "bg-[#38DDF2]/[0.04] group-hover:bg-[#38DDF2]/[0.10]"
                      : "bg-[#9B7BFF]/[0.03] group-hover:bg-[#9B7BFF]/[0.08]"
                  }`}
                />

                <div className="relative">

                  {/* ICON AND STATUS */}
                  <div className="mb-8 flex items-start justify-between">

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                        unit.available
                          ? "border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]"
                          : "border-[#9B7BFF]/20 bg-[#9B7BFF]/[0.06]"
                      }`}
                    >
                      <BookOpen
                        size={23}
                        className={
                          unit.available
                            ? "text-[#38DDF2]"
                            : "text-[#B5A2FF]"
                        }
                      />
                    </div>

                    {unit.available ? (
                      <ArrowRight
                        size={20}
                        className="text-[#64748B] transition duration-300 group-hover:translate-x-1 group-hover:text-[#38DDF2]"
                      />
                    ) : (
                      <span className="rounded-full border border-[#9B7BFF]/20 bg-[#9B7BFF]/[0.05] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#B5A2FF]">
                        Coming Soon
                      </span>
                    )}

                  </div>

                  {/* UNIT NUMBER */}
                  <p
                    className={`mb-3 text-xs font-semibold tracking-[0.15em] ${
                      unit.available
                        ? "text-[#38DDF2]"
                        : "text-[#B5A2FF]"
                    }`}
                  >
                    UNIT {unit.number}
                  </p>

                  {/* TITLE */}
                  <h3
                    className={`text-2xl font-bold ${
                      unit.available
                        ? "text-white transition group-hover:text-[#BCEFFF]"
                        : "text-[#CBD5E1]"
                    }`}
                  >
                    {unit.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 min-h-[3.5rem] text-sm leading-7 text-[#94A9C5]">
                    {unit.description}
                  </p>

                  {/* CARD FOOTER */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/[0.07] pt-5">

                    <span className="text-xs text-[#8292AC]">
                      {unit.pages}
                    </span>

                    <span
                      className={`inline-flex items-center gap-2 text-sm font-medium ${
                        unit.available
                          ? "text-[#38DDF2]"
                          : "text-[#B5A2FF]"
                      }`}
                    >
                      {unit.available ? "Explore Unit" : "View Status"}

                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </span>

                  </div>

                </div>
              </Link>
            ))}

          </div>

          {/* BOTTOM INFORMATION */}
          <div className="mt-12 flex flex-col gap-5 rounded-3xl border border-[#38DDF2]/10 bg-[#111B2B]/70 p-6 sm:flex-row sm:items-center sm:p-8">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
              <Sparkles size={22} className="text-[#38DDF2]" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">
                Your learning journey, organized.
              </h3>

              <p className="mt-2 text-sm leading-7 text-[#94A9C5]">
                Each available unit has its own interactive notes reader
                with page navigation, zoom, reading progress, fullscreen,
                and print options.
              </p>
            </div>

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

          <p className="mt-2 text-xs text-[#526078]">
            Learn. Build. Grow.
          </p>

        </div>
      </footer>

    </main>
  );
}