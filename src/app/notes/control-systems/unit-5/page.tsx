
import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const title = "Control Systems Unit 5 – Compensation and Controllers | ELEVIT";
const description =
  "Study Control Systems Unit 5: Compensation and Controllers with 17 pages of handwritten engineering notes. Read, zoom, navigate, and print your notes on ELEVIT.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://elevateorbit.in/notes/control-systems/unit-5",
  },
  openGraph: {
    title,
    description,
    url: "https://elevateorbit.in/notes/control-systems/unit-5",
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
  name: "Control Systems Unit 5 – Compensation and Controllers",
  description,
  educationalLevel: "Undergraduate",
  learningResourceType: "Handwritten Engineering Notes",
  inLanguage: "en",
  isPartOf: {
    "@type": "Course",
    name: "Control Systems",
    url: "https://elevateorbit.in/notes/control-systems",
  },
  provider: {
    "@type": "Organization",
    name: "ELEVIT",
    url: "https://elevateorbit.in",
  },
};

export default function Unit5Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <Navbar />

      <section className="px-4 pb-20 pt-32 sm:px-6 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-[#94A9C5]">
              <a
                href="/notes"
                className="transition hover:text-[#38DDF2]"
              >
                Notes
              </a>
              <span>/</span>
              <a
                href="/notes/control-systems"
                className="transition hover:text-[#38DDF2]"
              >
                Control Systems
              </a>
              <span>/</span>
              <span className="text-[#38DDF2]">Unit 5</span>
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/10 px-4 py-2 text-xs font-semibold tracking-wide text-[#38DDF2]">
              CONTROL SYSTEMS
              <span className="h-1 w-1 rounded-full bg-[#38DDF2]" />
              UNIT 05
            </div>

            <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-5xl">
              Compensation and{" "}
              <span className="bg-gradient-to-r from-[#38DDF2] to-[#9B7BFF] bg-clip-text text-transparent">
                Controllers
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#94A9C5] sm:text-base">
              Explore the fifth unit of Control Systems through handwritten
              notes. Navigate all 17 pages, track your reading progress, and
              save a copy for offline study.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/10 bg-[#141722] px-4 py-3">
                <p className="text-xl font-bold text-[#38DDF2]">17</p>
                <p className="text-xs text-[#94A9C5]">Pages</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#141722] px-4 py-3">
                <p className="text-xl font-bold text-[#9B7BFF]">Unit 05</p>
                <p className="text-xs text-[#94A9C5]">Control Systems</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-[#141722] px-4 py-3">
                <p className="text-xl font-bold text-white">100%</p>
                <p className="text-xs text-[#94A9C5]">Self-paced</p>
              </div>
            </div>
          </div>

          <NotesViewer />

          <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
            <a
              href="/notes/control-systems/unit-4"
              className="text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
            >
              ← Previous: Frequency Response Analysis
            </a>

            <a
              href="/notes/control-systems"
              className="text-sm font-semibold text-[#38DDF2] transition hover:text-white"
            >
              Back to Control Systems →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
