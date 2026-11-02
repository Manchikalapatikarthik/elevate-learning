
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Cpu,
  Layers,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar";

const units = [
  {
    number: "01",
    title: "Unit 1",
    description: "Introduction to CMOS Technology",
    href: "/notes/cmos-vlsi-design/unit-1",
    available: true,
  },
  {
    number: "02",
    title: "Unit 2",
    description: "MOS Transistor Theory",
    href: "/notes/cmos-vlsi-design/unit-2",
    available: true,
  },
  {
    number: "03",
    title: "Unit 3",
    description: "CMOS Logic Circuits",
    href: "/notes/cmos-vlsi-design/unit-3",
    available: true,
  },
  {
    number: "04",
    title: "Unit 4",
    description: "VLSI Design Methodologies",
    href: "/notes/cmos-vlsi-design/unit-4",
    available: true,
  },
  {
    number: "05",
    title: "Unit 5",
    description: "Notes Coming Soon",
    href: "",
    available: false,
  },
];

export default function CMOSVLSIDesignPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">

      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-250px] h-[550px] w-[750px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.08] blur-[140px]" />

        <div className="absolute right-[-200px] top-[850px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
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
            <Cpu size={31} className="text-[#38DDF2]" />
          </div>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ENGINEERING RESOURCES
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            CMOS VLSI Design
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Unit-wise handwritten notes for CMOS VLSI Design.
            Explore the concepts and study materials organized
            across five units.
          </p>

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
              Select a unit to access its study materials.
            </p>

          </div>

          {/* UNIT CARDS */}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

            {units.map((unit) => {

              const content = (
                <>
                  <div className="relative mb-8 flex items-start justify-between">

                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${
                      unit.available
                        ? "border-[#38DDF2]/20 bg-[#38DDF2]/[0.08]"
                        : "border-white/[0.07] bg-white/[0.03]"
                    }`}>
                      <BookOpen
                        size={23}
                        className={
                          unit.available
                            ? "text-[#38DDF2]"
                            : "text-[#718096]"
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

                  <p className={`mb-3 text-xs font-semibold tracking-[0.15em] ${
                    unit.available
                      ? "text-[#38DDF2]"
                      : "text-[#718096]"
                  }`}>
                    UNIT {unit.number}
                  </p>

                  <h3 className={`text-2xl font-bold ${
                    unit.available
                      ? "text-white transition group-hover:text-[#BCEFFF]"
                      : "text-[#CBD5E1]"
                  }`}>
                    {unit.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#94A9C5]">
                    {unit.description}
                  </p>

                  {unit.available && (
                    <div className="mt-8 flex items-center gap-2 text-sm font-medium text-[#38DDF2]">
                      Explore Unit
                      <ArrowRight size={16} />
                    </div>
                  )}
                </>
              );

              if (unit.available) {
                return (
                  <Link
                    key={unit.number}
                    href={unit.href}
                    className="group relative block overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#141D30] to-[#101521] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/40 hover:shadow-[0_15px_45px_rgba(56,221,242,0.08)]"
                  >
                    <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#38DDF2]/[0.04] blur-3xl transition group-hover:bg-[#38DDF2]/[0.10]" />

                    <div className="relative">
                      {content}
                    </div>
                  </Link>
                );
              }

              return (
                <div
                  key={unit.number}
                  className="relative overflow-hidden rounded-3xl border border-white/[0.05] bg-[#111622]/70 p-7"
                >
                  <div className="relative">
                    {content}
                  </div>
                </div>
              );
            })}

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
