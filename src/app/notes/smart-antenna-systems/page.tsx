
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  RadioTower,
  FileText,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Antenna Systems Notes | ELEVIT",
  description:
    "Access 100 pages of handwritten Smart Antenna Systems notes across five units, covering antenna fundamentals, arrays, transmission lines, waveguides and microwave measurements.",
  alternates: {
    canonical: "https://elevateorbit.in/notes/smart-antenna-systems",
  },
  openGraph: {
    title: "Smart Antenna Systems Notes | ELEVIT",
    description:
      "Explore all five units and 100 pages of Smart Antenna Systems handwritten notes.",
    url: "https://elevateorbit.in/notes/smart-antenna-systems",
    siteName: "ELEVIT – Elevate Orbit",
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
    topic: "Antenna Fundamentals and Wire Antennas",
    description:
      "Radiation mechanism, antenna parameters, dipole antennas, monopole antennas, radiation resistance, and antenna fields.",
    pages: 23,
    href: "/notes/smart-antenna-systems/unit-1",
  },
  {
    number: "02",
    title: "Unit 2",
    topic: "Antenna Arrays",
    description:
      "Broadside arrays, end fire arrays, Hansen-Woodyard arrays, pattern multiplication, and binomial arrays.",
    pages: 14,
    href: "/notes/smart-antenna-systems/unit-2",
  },
  {
    number: "03",
    title: "Unit 3",
    topic: "Travelling Wave and Broadband Antennas",
    description:
      "Yagi-Uda arrays, reflector antennas, horn antennas, microstrip antennas, broadband antennas, and smart antennas.",
    pages: 22,
    href: "/notes/smart-antenna-systems/unit-3",
  },
  {
    number: "04",
    title: "Unit 4",
    topic: "Transmission Line Theory",
    description:
      "Transmission lines, reflection coefficient, standing wave ratio, line losses, impedance matching, and quarter-wave transformers.",
    pages: 27,
    href: "/notes/smart-antenna-systems/unit-4",
  },
  {
    number: "05",
    title: "Unit 5",
    topic: "Measurements and Waveguides",
    description:
      "Waveguides, resonators, microwave measurements, cavity resonators, impedance measurements, and microwave components.",
    pages: 14,
    href: "/notes/smart-antenna-systems/unit-5",
  },
];

const totalPages = units.reduce((total, unit) => total + unit.pages, 0);

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Smart Antenna Systems",
  description:
    "Five units of handwritten engineering notes covering antenna theory, antenna arrays, transmission lines, measurements and waveguides.",
  provider: {
    "@type": "Organization",
    name: "ELEVIT – Elevate Orbit",
    url: "https://elevateorbit.in",
  },
  educationalLevel: "Undergraduate",
  inLanguage: "en",
  isAccessibleForFree: true,
  numberOfCredits: 0,
  hasCourseInstance: units.map((unit) => ({
    "@type": "CourseInstance",
    name: `${unit.title} – ${unit.topic}`,
    url: `https://elevateorbit.in${unit.href}`,
    courseMode: "online",
  })),
};

export default function SmartAntennaPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* BACKGROUND ATMOSPHERE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />

        <div className="absolute right-[-200px] top-[850px] h-[450px] w-[450px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
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

          <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <RadioTower size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="max-w-5xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Smart Antenna Systems
          </h1>

          <p className="mt-6 max-w-4xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Explore comprehensive handwritten notes covering antenna theory,
            radiation patterns, wave propagation, antenna arrays, transmission
            lines, smart antennas, and microwave engineering concepts.
            Organized into five units for structured learning and revision.
          </p>

          {/* SUBJECT STATISTICS */}
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 text-[#38DDF2]">
                <BookOpen size={18} />
                <span className="text-xs text-[#94A9C5]">Units</span>
              </div>
              <p className="mt-3 text-3xl font-bold text-white">05</p>
              <p className="mt-1 text-xs text-[#8292AC]">Complete units</p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 text-[#38DDF2]">
                <FileText size={18} />
                <span className="text-xs text-[#94A9C5]">Study Material</span>
              </div>
              <p className="mt-3 text-3xl font-bold text-white">
                {totalPages}
              </p>
              <p className="mt-1 text-xs text-[#8292AC]">
                Handwritten pages
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.05] p-4 sm:col-span-1">
              <div className="flex items-center gap-2 text-[#38DDF2]">
                <CheckCircle2 size={18} />
                <span className="text-xs text-[#94A9C5]">Course Status</span>
              </div>
              <p className="mt-3 text-2xl font-bold text-white">
                Completed
              </p>
              <p className="mt-1 text-xs text-[#8292AC]">
                All five units available
              </p>
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
              <BookOpen size={17} />

              <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                COURSE CONTENT
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore Units
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#8292AC] sm:text-base">
              Choose a unit to access its handwritten notes and interactive
              study reader.
            </p>

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
                      <RadioTower
                        size={23}
                        className="text-[#38DDF2]"
                      />
                    </div>

                    <ArrowRight
                      size={20}
                      className="text-[#64748B] transition duration-300 group-hover:translate-x-1 group-hover:text-[#38DDF2]"
                    />

                  </div>

                  {/* UNIT NUMBER */}
                  <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-[#38DDF2]">
                    UNIT {unit.number}
                  </p>

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

                  {/* PAGE COUNT */}
                  <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-5">

                    <div className="flex items-center gap-2 text-xs text-[#8292AC]">
                      <FileText size={15} className="text-[#38DDF2]" />
                      {unit.pages} handwritten pages
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-medium text-[#38DDF2]">
                      <CheckCircle2 size={14} />
                      Available
                    </span>

                  </div>

                  {/* EXPLORE */}
                  <div className="mt-7 flex items-center gap-2 text-sm font-medium text-[#38DDF2]">
                    Explore Unit
                    <ArrowRight size={16} />
                  </div>

                </div>
              </Link>
            ))}

          </div>

          {/* COMPLETION SECTION */}
          <div className="mt-14 rounded-3xl border border-[#38DDF2]/15 bg-gradient-to-br from-[#141F32] to-[#111827] px-6 py-9 sm:px-10">

            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">

              <div>
                <div className="mb-3 flex items-center gap-2 text-[#38DDF2]">
                  <CheckCircle2 size={19} />
                  <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Complete Study Collection
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  All 5 Units. One Learning Space.
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-7 text-[#94A9C5]">
                  Your complete Smart Antenna Systems study collection
                  is ready. Access all {totalPages} pages through the
                  interactive ELEVIT notes readers.
                </p>
              </div>

              <div className="shrink-0 text-left sm:text-right">
                <p className="text-4xl font-bold text-[#38DDF2]">
                  {totalPages}
                </p>
                <p className="mt-1 text-xs text-[#8292AC]">
                  Total pages
                </p>
              </div>

            </div>

            <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div className="h-full w-full rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5]" />
            </div>

            <p className="mt-3 text-right text-xs font-medium text-[#38DDF2]">
              100% of units available
            </p>

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
