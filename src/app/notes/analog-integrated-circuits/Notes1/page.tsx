
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const BASE_URL = "https://elevateorbit.in";
const PAGE_URL =
  `${BASE_URL}/notes/analog-integrated-circuits/notes-1`;

export const metadata: Metadata = {
  title:
    "Analog Integrated Circuits Handwritten Notes PDF | ELEVIT",
  description:
    "Read 64 pages of Analog Integrated Circuits handwritten engineering notes on ELEVIT. Browse pages, zoom into diagrams, save reading progress and print or save the notes as PDF.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Analog Integrated Circuits Handwritten Notes | ELEVIT",
    description:
      "Explore 64 pages of Analog Integrated Circuits handwritten notes and study materials for engineering students.",
    url: PAGE_URL,
    siteName: "ELEVIT",
    type: "article",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Analog Integrated Circuits Handwritten Notes - Set 1",
  description:
    "A collection of 64 pages of handwritten Analog Integrated Circuits engineering study notes.",
  learningResourceType: "Handwritten study notes",
  educationalLevel: "Higher Education",
  inLanguage: "en",
  isAccessibleForFree: true,
  provider: {
    "@type": "Organization",
    name: "ELEVIT",
    url: BASE_URL,
  },
  url: PAGE_URL,
  numberOfPages: 64,
};

export default function AnalogIntegratedCircuitsNotes1() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />
        <div className="absolute right-[-200px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      <section className="relative px-5 pb-8 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-9 flex flex-wrap items-center gap-2 text-xs text-[#8292AC]"
          >
            <Link href="/" className="transition hover:text-[#38DDF2]">
              Home
            </Link>
            <span>/</span>
            <Link href="/notes" className="transition hover:text-[#38DDF2]">
              Notes
            </Link>
            <span>/</span>
            <Link
              href="/notes/analog-integrated-circuits"
              className="transition hover:text-[#38DDF2]"
            >
              Analog Integrated Circuits
            </Link>
            <span>/</span>
            <span className="text-[#BCEFFF]">Notes Set 1</span>
          </nav>

          <Link
            href="/notes/analog-integrated-circuits"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Analog Integrated Circuits
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
              <BookOpen size={24} className="text-[#38DDF2]" />
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#38DDF2]">
                ELEVIT ENGINEERING NOTES
              </p>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Analog Integrated Circuits Handwritten Notes
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-7 text-[#94A9C5] sm:text-base">
            Access the first set of Analog Integrated Circuits
            handwritten study notes. Read all 64 pages using the
            interactive ELEVIT document reader, navigate between
            pages, zoom into the handwriting and save your reading
            progress.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07] px-4 py-2 text-xs font-medium text-[#BCEFFF]">
              Notes Set 1
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#94A9C5]">
              64 handwritten pages
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#94A9C5]">
              Free study resource
            </span>
          </div>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      <NotesViewer />

      <section className="relative px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.07] bg-[#101827]/70 p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#38DDF2]">
            ABOUT THIS RESOURCE
          </p>

          <h2 className="mt-3 text-xl font-bold text-white">
            Analog Integrated Circuits – Notes Set 1
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#94A9C5]">
            This ELEVIT resource contains 64 pages of handwritten
            Analog Integrated Circuits study material. Students can
            use the page-by-page reader to review their notes,
            revisit handwritten explanations and study at their
            preferred pace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/notes/analog-integrated-circuits"
              className="inline-flex items-center gap-2 rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-4 py-3 text-sm font-medium text-[#38DDF2] transition hover:bg-[#38DDF2]/[0.12]"
            >
              <ArrowLeft size={16} />
              More Analog Integrated Circuits Notes
            </Link>

            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-[#94A9C5] transition hover:border-white/20 hover:text-white"
            >
              Explore All Subjects
            </Link>
          </div>
        </div>
      </section>

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
