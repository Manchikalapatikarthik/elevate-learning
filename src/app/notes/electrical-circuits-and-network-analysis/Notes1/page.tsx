
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CircuitBoard,
  FileText,
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const title =
  "Electrical Circuits and Network Analysis – Notes Set 1 | ELEVIT";

const description =
  "Access 45 pages of handwritten Electrical Circuits and Network Analysis notes. Read, zoom, navigate, save your progress, and print your notes on ELEVIT.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical:
      "https://elevateorbit.in/notes/electrical-circuits-and-network-analysis/Notes1",
  },
  openGraph: {
    title,
    description,
    url: "https://elevateorbit.in/notes/electrical-circuits-and-network-analysis/Notes1",
    siteName: "ELEVIT",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Electrical Circuits and Network Analysis – Notes Set 1",
  description,
  educationalLevel: "Undergraduate",
  learningResourceType: "Handwritten Engineering Notes",
  inLanguage: "en",
  provider: {
    "@type": "Organization",
    name: "ELEVIT",
    url: "https://elevateorbit.in",
  },
};

export default function ElectricalCircuitsAndNetworkAnalysisNotes1() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />

        <div className="absolute right-[-180px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* SUBJECT HEADER */}

      <section className="relative px-4 pb-12 pt-32 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/notes"
            className="mb-9 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Notes
          </Link>

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <CircuitBoard size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="max-w-5xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Electrical Circuits and Network Analysis
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-8 text-[#94A9C5] sm:text-lg">
            Explore your handwritten study material for Electrical
            Circuits and Network Analysis. Navigate through all 45
            pages with an interactive reader designed for focused
            learning and revision.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              <BookOpen size={16} className="text-[#38DDF2]" />
              Notes Set 1
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              <FileText size={16} className="text-[#9B7BFF]" />
              45 Handwritten Pages
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* INTERACTIVE NOTES READER */}

      <section className="relative px-3 pb-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-7">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#38DDF2]">
              STUDY MATERIAL
            </p>

            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Notes Set 1
            </h2>

            <p className="mt-2 text-sm text-[#8292AC]">
              45 pages · Interactive handwritten notes reader
            </p>
          </div>

          <NotesViewer />

          {/* END OF NOTES */}

          <div className="mt-12 rounded-3xl border border-[#38DDF2]/15 bg-gradient-to-br from-[#141F32] to-[#111827] px-6 py-9 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]">
              <BookOpen size={25} className="text-[#38DDF2]" />
            </div>

            <h3 className="text-2xl font-bold text-white">
              Keep learning with ELEVIT
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#94A9C5]">
              Complete your revision, revisit important pages, and
              continue building your understanding of Electrical
              Circuits and Network Analysis.
            </p>

            <Link
              href="/notes"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3 text-sm font-semibold text-[#07111F] transition hover:brightness-110"
            >
              <ArrowLeft size={16} />
              Back to All Notes
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
        </div>
      </footer>
    </main>
  );
}
