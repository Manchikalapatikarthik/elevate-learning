
import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const pageTitle = "Control Systems Unit 1 – System Concepts Notes";

const pageDescription =
  "Study Control Systems Unit 1: System Concepts with 22 pages of handwritten notes. Read online, navigate pages, zoom, save reading progress, and print or save as PDF.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "https://elevateorbit.in/notes/control-systems/unit-1",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://elevateorbit.in/notes/control-systems/unit-1",
    siteName: "ELEVIT – Elevate Learning",
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
  name: pageTitle,
  description: pageDescription,
  educationalLevel: "Undergraduate",
  learningResourceType: "Lecture Notes",
  inLanguage: "en",
  isAccessibleForFree: true,
  url: "https://elevateorbit.in/notes/control-systems/unit-1",
  publisher: {
    "@type": "Organization",
    name: "ELEVIT – Elevate Learning",
    url: "https://elevateorbit.in",
  },
};

export default function Unit1Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070B16] text-white">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="px-4 pb-16 pt-32 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500"
          >
            <a href="/" className="transition hover:text-cyan-400">
              Home
            </a>
            <span>/</span>
            <a href="/notes" className="transition hover:text-cyan-400">
              Notes
            </a>
            <span>/</span>
            <a
              href="/notes/control-systems"
              className="transition hover:text-cyan-400"
            >
              Control Systems
            </a>
            <span>/</span>
            <span className="text-cyan-400">Unit 1</span>
          </nav>

          {/* Page introduction */}
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-300">
              CONTROL SYSTEMS
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
              Unit 1 –{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                System Concepts
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Access all 22 pages of System Concepts handwritten notes in one
              interactive reader. Navigate through pages, adjust the zoom,
              save your reading progress, or print the complete notes.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-xs text-slate-400">
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                22 Pages
              </span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                Handwritten Notes
              </span>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                Free Access
              </span>
            </div>
          </div>

          {/* Notes reader */}
          <NotesViewer />

          {/* Bottom navigation */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <a
              href="/notes/control-systems"
              className="text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              ← All Control Systems Units
            </a>

            <a
              href="/notes"
              className="text-sm text-slate-400 transition hover:text-cyan-300"
            >
              Back to All Notes →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
