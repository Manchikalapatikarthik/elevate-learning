
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUp,
  BookOpen,
  RadioTower,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const BASE_URL = "https://elevateorbit.in";
const PAGE_URL = `${BASE_URL}/notes/electromagnetic-field-theory/Notes1`;

export const metadata: Metadata = {
  title:
    "Electromagnetic Field Theory Handwritten Notes – 30 Pages | ELEVIT",
  description:
    "Read 30 pages of Electromagnetic Field Theory handwritten engineering notes on ELEVIT. Navigate pages, zoom into notes, save reading progress, share specific pages and print or save the complete set as PDF.",
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: "Electromagnetic Field Theory Handwritten Notes | ELEVIT",
    description:
      "Explore 30 pages of Electromagnetic Field Theory handwritten study notes with the ELEVIT interactive notes reader.",
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
  name: "Electromagnetic Field Theory Handwritten Notes - Set 1",
  description:
    "A collection of 30 pages of handwritten Electromagnetic Field Theory study material.",
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
  numberOfPages: 30,
};

export default function ElectromagneticFieldTheoryNotes1() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]"
    >
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
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />
        <div className="absolute right-[-180px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
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
              href="/notes/electromagnetic-field-theory"
              className="transition hover:text-[#38DDF2]"
            >
              Electromagnetic Field Theory
            </Link>
            <span>/</span>
            <span className="text-[#BCEFFF]">Notes Set 1</span>
          </nav>

          <Link
            href="/notes/electromagnetic-field-theory"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <ArrowLeft size={17} />
            Back to Electromagnetic Field Theory
          </Link>

          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
              <RadioTower size={28} className="text-[#38DDF2]" />
            </div>

            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#38DDF2]">
                ELEVIT ENGINEERING NOTES
              </p>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
                Electromagnetic Field Theory Handwritten Notes
              </h1>
            </div>
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-7 text-[#94A9C5] sm:text-base">
            Access 30 pages of Electromagnetic Field Theory
            handwritten study material. Use the ELEVIT document
            reader to navigate pages, zoom into handwriting, save
            your reading progress and revisit your notes whenever needed.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07] px-4 py-2 text-xs font-medium text-[#BCEFFF]">
              <BookOpen size={15} />
              Notes Set 1
            </span>

            <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs text-[#94A9C5]">
              30 handwritten pages
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
            Electromagnetic Field Theory – Notes Set 1
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-[#94A9C5]">
            This ELEVIT resource contains 30 pages of handwritten
            Electromagnetic Field Theory study material. Students
            can review the pages using the interactive reader,
            revisit handwritten explanations and study at their
            own pace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/notes/electromagnetic-field-theory"
              className="inline-flex items-center gap-2 rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-4 py-3 text-sm font-medium text-[#38DDF2] transition hover:bg-[#38DDF2]/[0.12]"
            >
              <ArrowLeft size={16} />
              More Electromagnetic Field Theory Notes
            </Link>

            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-[#94A9C5] transition hover:border-white/20 hover:text-white"
            >
              Explore All Subjects
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-sm text-[#8292AC] transition hover:text-[#38DDF2]"
          >
            <ArrowUp size={16} />
            Back to top
          </a>
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
