
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Network,
  Layers,
  FileText,
  GraduationCap,
} from "lucide-react";

import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Computer Networks Notes – All 5 Units | ELEVIT",
  description:
    "Access free handwritten Computer Networks notes covering all five units: Network Fundamentals, Data Link Layer, Network Layer, Transport Layer, and Application Layer.",
  alternates: {
    canonical: "https://elevateorbit.in/notes/computer-networks",
  },
  openGraph: {
    title: "Computer Networks Notes – ELEVIT",
    description:
      "Explore free unit-wise Computer Networks handwritten notes with 96 pages of study material.",
    url: "https://elevateorbit.in/notes/computer-networks",
    siteName: "ELEVIT – Elevate Learning",
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
    description: "Network Fundamentals",
    pages: 16,
    href: "/notes/computer-networks/unit-1",
  },
  {
    number: "02",
    title: "Unit 2",
    description: "Data Link Layer",
    pages: 29,
    href: "/notes/computer-networks/unit-2",
  },
  {
    number: "03",
    title: "Unit 3",
    description: "Network Layer",
    pages: 24,
    href: "/notes/computer-networks/unit-3",
  },
  {
    number: "04",
    title: "Unit 4",
    description: "Transport Layer",
    pages: 14,
    href: "/notes/computer-networks/unit-4",
  },
  {
    number: "05",
    title: "Unit 5",
    description: "Application Layer",
    pages: 13,
    href: "/notes/computer-networks/unit-5",
  },
];

const totalPages = units.reduce((total, unit) => total + unit.pages, 0);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Computer Networks",
  description:
    "Free unit-wise handwritten Computer Networks notes covering five units.",
  provider: {
    "@type": "Organization",
    name: "ELEVIT – Elevate Learning",
    url: "https://elevateorbit.in",
  },
  educationalLevel: "Undergraduate",
  inLanguage: "en",
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "online",
  },
  numberOfCredits: 0,
  url: "https://elevateorbit.in/notes/computer-networks",
};

export default function ComputerNetworksPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />

        <div className="absolute right-[-200px] top-[850px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Subject header */}
      <section className="relative px-6 pb-16 pt-40 sm:pt-44">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/notes"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <Network size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Computer Networks
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Explore unit-wise handwritten notes for Computer Networks.
            Study networking concepts through organized learning materials
            covering all five units of the subject.
          </p>

          {/* Course statistics */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#38DDF2]">
                <Layers size={17} />
              </div>
              <p className="text-2xl font-bold text-white">05</p>
              <p className="mt-1 text-xs text-[#8292AC]">Units</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#38DDF2]">
                <FileText size={17} />
              </div>
              <p className="text-2xl font-bold text-white">{totalPages}</p>
              <p className="mt-1 text-xs text-[#8292AC]">Pages</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center gap-2 text-[#38DDF2]">
                <GraduationCap size={17} />
              </div>
              <p className="text-2xl font-bold text-white">Free</p>
              <p className="mt-1 text-xs text-[#8292AC]">Access</p>
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* Unit directory */}
      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-6xl">
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
              Select a unit to access its handwritten study materials.
            </p>
          </div>

          {/* Unit cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <Link
                key={unit.number}
                href={unit.href}
                aria-label={`Explore ${unit.title}: ${unit.description}, ${unit.pages} pages`}
                className="group relative block overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#141D30] to-[#101521] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/40 hover:shadow-[0_15px_45px_rgba(56,221,242,0.08)]"
              >
                {/* Card glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#38DDF2]/[0.04] blur-3xl transition group-hover:bg-[#38DDF2]/[0.10]" />

                <div className="relative">
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]">
                      <BookOpen size={23} className="text-[#38DDF2]" />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-[#64748B] transition duration-300 group-hover:translate-x-1 group-hover:text-[#38DDF2]"
                    />
                  </div>

                  <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-[#38DDF2]">
                    UNIT {unit.number}
                  </p>

                  <h3 className="text-2xl font-bold text-white transition group-hover:text-[#BCEFFF]">
                    {unit.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#94A9C5]">
                    {unit.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5">
                    <div className="flex items-center gap-2 text-xs text-[#8292AC]">
                      <FileText size={15} />
                      {unit.pages} pages
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-[#38DDF2]">
                      Explore Unit
                      <ArrowRight
                        size={16}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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
