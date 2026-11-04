
import type { Metadata } from "next";
import Navbar from "../../../components/Navbar";
import NotesViewer from "./NotesViewer";

const title = "Smart Antenna Systems – Unit 5: Measurements and Waveguides";
const description =
  "Study handwritten notes for Smart Antenna Systems Unit 5, covering Measurements and Waveguides. Read, navigate, zoom, save progress, and print all 14 pages.";

const pageUrl =
  "https://elevateorbit.in/notes/smart-antenna-systems/unit-5";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: "ELEVIT – Elevate Orbit",
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
  name: title,
  description,
  educationalLevel: "Undergraduate",
  learningResourceType: "Handwritten Study Notes",
  inLanguage: "en",
  url: pageUrl,
  isAccessibleForFree: true,
  publisher: {
    "@type": "Organization",
    name: "ELEVIT – Elevate Orbit",
    url: "https://elevateorbit.in",
  },
};

export default function Unit5Page() {
  return (
    <main
      id="top"
      className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* BACKGROUND ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />
        <div className="absolute right-[-180px] top-[900px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      <section className="relative px-6 pb-10 pt-40 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <a
            href="/notes/smart-antenna-systems"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <span aria-hidden="true">←</span>
            Back to Smart Antenna Systems
          </a>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            SMART ANTENNA SYSTEMS
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Unit 5
          </h1>

          <h2 className="mt-5 max-w-4xl text-xl font-semibold leading-relaxed text-[#CBD5E1] sm:text-2xl">
            Measurements and Waveguides
          </h2>

          <p className="mt-5 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Explore all 14 pages of handwritten study material using the
            interactive ELEVIT notes reader. Navigate pages, adjust zoom,
            save your reading progress, and print your notes for revision.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              Unit 5 Notes
            </div>
            <div className="rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-[#CBD5E1]">
              14 Handwritten Pages
            </div>
            <div className="rounded-full border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06] px-4 py-2 text-sm text-[#38DDF2]">
              Interactive Reader
            </div>
          </div>

          <div className="mt-9 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <NotesViewer />

          <div className="mt-12 rounded-3xl border border-[#38DDF2]/15 bg-gradient-to-br from-[#141F32] to-[#111827] px-6 py-9 text-center sm:px-10">
            <h2 className="text-2xl font-bold text-white">
              Smart Antenna Systems Completed!
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-[#94A9C5]">
              You have reached the final unit. All five units of Smart Antenna
              Systems are now available for your study and revision.
            </p>

            <a
              href="/notes/smart-antenna-systems"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3 text-sm font-semibold text-[#07111F] transition hover:brightness-110"
            >
              Back to Smart Antenna Systems
            </a>
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
