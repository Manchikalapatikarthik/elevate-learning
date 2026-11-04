import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUp, BookOpen, Cpu } from "lucide-react";
import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const BASE_URL = "https://elevateorbit.in";
const PAGE_URL = `${BASE_URL}/notes/cmos-vlsi-design/unit-2`;

export const metadata: Metadata = {
  title: "CMOS VLSI Design Unit 2 Handwritten Notes – 31 Pages | ELEVIT",
  description:
    "Study CMOS VLSI Design Unit 2 with 31 pages of handwritten engineering notes. Navigate, zoom, save your reading progress, and print the notes as a PDF.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "CMOS VLSI Design – Unit 2 Handwritten Notes | ELEVIT",
    description:
      "Access 31 pages of CMOS VLSI Design Unit 2 handwritten notes for engineering study and exam preparation.",
    url: PAGE_URL,
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
  name: "CMOS VLSI Design – Unit 2 Handwritten Notes",
  description:
    "A collection of 31 pages of handwritten CMOS VLSI Design Unit 2 notes.",
  url: PAGE_URL,
  educationalLevel: "Undergraduate",
  learningResourceType: "Handwritten lecture notes",
  inLanguage: "en",
  numberOfPages: 31,
  publisher: {
    "@type": "Organization",
    name: "ELEVIT",
    url: BASE_URL,
  },
};

export default function Unit2Page() {
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

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />
        <div className="absolute right-[-180px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* HEADER */}
      <section className="relative px-6 pb-12 pt-40 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-[#8292AC]"
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
            <span className="text-[#CBD5E1]">Unit 2</span>
          </nav>

          <Link
            href="/notes/cmos-vlsi-design"
            className="mb-10 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to CMOS VLSI Design
          </Link>

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <Cpu size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            CMOS VLSI Design – Unit 2
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Access 31 pages of CMOS VLSI Design Unit 2 handwritten notes.
            Read page by page, adjust the zoom, save your reading position,
            and use the interactive reader for focused study and revision.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              <BookOpen size={16} className="text-[#38DDF2]" />
              Unit 2
            </div>

            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              31 Pages
            </div>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* NOTES READER */}
      <section className="relative px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#38DDF2]">
              STUDY MATERIAL
            </p>

            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              CMOS VLSI Design – Unit 2 Notes
            </h2>

            <p className="mt-2 text-sm text-[#8292AC]">
              Navigate, zoom, save your reading position, or print all
              31 pages from the interactive reader.
            </p>
          </div>

          <NotesViewer />

          <div className="mt-14 rounded-3xl border border-[#38DDF2]/15 bg-gradient-to-br from-[#141F32] to-[#111827] px-6 py-9 text-center sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]">
              <BookOpen size={25} className="text-[#38DDF2]" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              Finished Unit 2?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#94A9C5]">
              You have reached the end of all 31 pages in this unit.
              Keep learning and revising with ELEVIT.
            </p>

            <Link
              href="/notes/cmos-vlsi-design"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3 text-sm font-semibold text-[#07111F] transition hover:brightness-110"
            >
              <ArrowLeft size={16} />
              Back to CMOS VLSI Design
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