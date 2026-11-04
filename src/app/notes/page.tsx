
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  Search,
  X,
  Sparkles,
  GraduationCap,
  Layers3,
  ArrowUpRight,
} from "lucide-react";

import Navbar from "../components/Navbar";

/* =========================================================
   SUBJECTS WITH DEDICATED NOTE PAGES
========================================================= */

const availableSubjects: Record<string, string> = {
  "Electrical Technology": "/notes/electrical-technology",
  "Electronic Devices": "/notes/electronic-devices",
  Chemistry: "/notes/chemistry",
  "Electrical Circuits and Network Analysis":
    "/notes/electrical-circuits-and-network-analysis",
  "Signals and Systems": "/notes/signals-and-systems",
  "Electromagnetic Field Theory": "/notes/electromagnetic-field-theory",
  "Analog Integrated Circuits": "/notes/analog-integrated-circuits",
  "Smart Antenna Systems": "/notes/smart-antenna-systems",
  "CMOS VLSI Design": "/notes/cmos-vlsi-design",
  "Control Systems": "/notes/control-systems",
  "Microprocessor and Microcontroller":
    "/notes/microprocessor-and-microcontroller",
  "Computer Networks": "/notes/computer-networks",
};

/* =========================================================
   ALL SUBJECTS
========================================================= */

const subjects = [
  "Matrices and Calculus",
  "Physics",
  "Engineering Drawing and Design",
  "Electrical Technology",
  "Problem Solving Techniques using C",
  "Electronic Devices",
  "Technical English",
  "Advanced Calculus and Statistics",
  "Chemistry",
  "Electrical Circuits and Network Analysis",
  "Python Programming",
  "Digital Logic Circuits",
  "Transform Techniques and Complex Analysis",
  "Electronic Circuits",
  "Signals and Systems",
  "Electromagnetic Field Theory",
  "Data Structures using C",
  "Universal Human Values",
  "Fourier Series and Numerical Methods",
  "Probability and Random Process",
  "Analog Integrated Circuits",
  "Analog and Digital Communication",
  "Digital Signal Processing",
  "Design Thinking and Innovations",
  "Smart Antenna Systems",
  "CMOS VLSI Design",
  "Control Systems",
  "Microprocessor and Microcontroller",
  "Industry 5.0 for Electronics Engineers",
  "Computer Networks",
  "HDL Digital Design",
  "Embedded Systems",
  "Microwave and Optical Communication",
  "Cognitive IoT",
  "Project Work Phase I",
  "Professional Elective 5",
  "Professional Elective 6",
  "Project Work Phase II",
];

/* =========================================================
   SEO SUBJECT LINKS
========================================================= */

const seoSubjectLinks = [
  {
    name: "Electrical Technology Notes",
    href: "/notes/electrical-technology",
  },
  {
    name: "Electronic Devices Notes",
    href: "/notes/electronic-devices",
  },
  {
    name: "Chemistry Notes",
    href: "/notes/chemistry",
  },
  {
    name: "Electrical Circuits and Network Analysis Notes",
    href: "/notes/electrical-circuits-and-network-analysis",
  },
  {
    name: "Signals and Systems Notes",
    href: "/notes/signals-and-systems",
  },
  {
    name: "Electromagnetic Field Theory Notes",
    href: "/notes/electromagnetic-field-theory",
  },
  {
    name: "Analog Integrated Circuits Notes",
    href: "/notes/analog-integrated-circuits",
  },
  {
    name: "Smart Antenna Systems Notes",
    href: "/notes/smart-antenna-systems",
  },
  {
    name: "CMOS VLSI Design Notes",
    href: "/notes/cmos-vlsi-design",
  },
  {
    name: "Control Systems Notes",
    href: "/notes/control-systems",
  },
  {
    name: "Microprocessor and Microcontroller Notes",
    href: "/notes/microprocessor-and-microcontroller",
  },
  {
    name: "Computer Networks Notes",
    href: "/notes/computer-networks",
  },
];

/* =========================================================
   SEARCH NORMALIZATION
========================================================= */

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* =========================================================
   PAGE
========================================================= */

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  /* READ SEARCH FROM URL */

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");

    if (search) {
      setSearchQuery(search);
    }
  }, []);

  /* SEARCH SUBJECTS */

  const filteredSubjects = useMemo(() => {
    const query = normalizeText(searchQuery);

    if (!query) return subjects;

    return subjects.filter((subject) =>
      normalizeText(subject).includes(query)
    );
  }, [searchQuery]);

  /* UPDATE SEARCH URL */

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    const trimmedValue = value.trim();

    if (trimmedValue) {
      window.history.replaceState(
        {},
        "",
        `/notes?search=${encodeURIComponent(trimmedValue)}`
      );
    } else {
      window.history.replaceState({}, "", "/notes");
    }
  };

  /* CLEAR SEARCH */

  const clearSearch = () => {
    setSearchQuery("");
    window.history.replaceState({}, "", "/notes");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      {/* BACKGROUND ATMOSPHERE */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/10 blur-[150px]" />

        <div className="absolute left-[-220px] top-[850px] h-[450px] w-[450px] rounded-full bg-[#9B7BFF]/[0.07] blur-[150px]" />

        <div className="absolute right-[-220px] top-[1450px] h-[450px] w-[450px] rounded-full bg-[#38DDF2]/[0.05] blur-[150px]" />
      </div>

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section className="relative px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06] px-4 py-2">
              <Sparkles size={13} className="text-[#38DDF2]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8EDFED]">
                The ELEVIT Learning Library
              </span>
            </div>

            <h1 className="text-5xl font-bold tracking-[-0.055em] text-white sm:text-6xl md:text-7xl">
              Your knowledge.
              <br />

              <span className="bg-gradient-to-r from-[#38DDF2] via-[#70B8FF] to-[#9B7BFF] bg-clip-text text-transparent">
                Your next breakthrough.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
              Explore your engineering curriculum, access handwritten
              study notes, and build a stronger understanding of every
              subject. Everything starts here.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-[#8292AC]">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-[#38DDF2]" />
                <span>Engineering Notes</span>
              </div>

              <div className="hidden h-1 w-1 rounded-full bg-[#526078] sm:block" />

              <div className="flex items-center gap-2">
                <GraduationCap size={17} className="text-[#9B7BFF]" />
                <span>ECE Curriculum</span>
              </div>

              <div className="hidden h-1 w-1 rounded-full bg-[#526078] sm:block" />

              <div className="flex items-center gap-2">
                <Layers3 size={16} className="text-[#4D9BF5]" />
                <span>Organised Resources</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="relative px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="group relative">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-[#38DDF2]/30 via-[#4D9BF5]/20 to-[#9B7BFF]/30 opacity-60 blur-sm transition duration-300 group-focus-within:opacity-100" />

            <div className="relative flex items-center rounded-2xl border border-white/[0.10] bg-[#111827]/95 px-5 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl transition duration-300 group-focus-within:border-[#38DDF2]/40">
              <Search
                size={21}
                className="mr-4 shrink-0 text-[#38DDF2]"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Find a subject..."
                aria-label="Search subjects"
                className="min-w-0 flex-1 bg-transparent py-3 text-base text-white outline-none placeholder:text-[#64748B]"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="ml-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-[#94A9C5] transition hover:bg-white/[0.06] hover:text-white"
                >
                  <X size={15} />
                  Clear
                </button>
              )}

              <span className="ml-3 hidden rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-[10px] text-[#64748B] sm:inline-block">
                SEARCH
              </span>
            </div>
          </div>

          {/* SEARCH RESULTS */}

          {searchQuery && (
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-[#718096]">Results for</span>

              <span className="rounded-lg border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06] px-3 py-1 font-medium text-[#BCEFFF]">
                &quot;{searchQuery}&quot;
              </span>

              <span className="text-[#64748B]">
                {filteredSubjects.length} found
              </span>
            </div>
          )}
        </div>
      </section>

      {/* SUBJECT DIRECTORY */}

      <section className="relative px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* SECTION HEADER */}

          <div className="mb-9 border-b border-white/[0.07] pb-7">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38DDF2]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#38DDF2]">
                Explore your curriculum
              </p>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Engineering Subjects
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#8292AC] sm:text-base">
              Find your subject and access the resources designed
              to support your learning.
            </p>
          </div>

          {/* NO SEARCH RESULTS */}

          {filteredSubjects.length === 0 && (
            <div className="rounded-3xl border border-white/[0.08] bg-[#111827]/80 px-8 py-20 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06]">
                <Search size={28} className="text-[#38DDF2]" />
              </div>

              <h3 className="text-2xl font-semibold text-white">
                No subjects found
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#8292AC]">
                We couldn&apos;t find a subject matching
                &quot;{searchQuery}&quot;. Try a different keyword.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-7 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3 text-sm font-semibold text-[#070B16] transition hover:brightness-110"
              >
                Browse all subjects
              </button>
            </div>
          )}

          {/* SUBJECT GRID */}

          {filteredSubjects.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredSubjects.map((subject) => {
                const route = availableSubjects[subject];

                /* AVAILABLE SUBJECT */

                if (route) {
                  return (
                    <Link
                      key={subject}
                      href={route}
                      className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-[#38DDF2]/[0.13] bg-gradient-to-br from-[#141F32] via-[#111A2A] to-[#101522] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/40 hover:shadow-[0_18px_50px_rgba(56,221,242,0.08)]"
                    >
                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#38DDF2]/[0.06] blur-3xl transition duration-500 group-hover:bg-[#38DDF2]/[0.12]" />

                      <div className="relative flex items-start justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08] transition group-hover:bg-[#38DDF2]/[0.15]">
                          <BookOpen
                            size={21}
                            className="text-[#38DDF2]"
                          />
                        </div>

                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-[#718096] transition group-hover:border-[#38DDF2]/20 group-hover:text-[#38DDF2]">
                          <ArrowUpRight size={17} />
                        </div>
                      </div>

                      <div className="relative mt-7">
                        <h3 className="text-lg font-semibold leading-7 text-white transition group-hover:text-[#BCEFFF]">
                          {subject}
                        </h3>

                        <div className="mt-4 flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#38DDF2] shadow-[0_0_8px_#38DDF2]" />

                          <span className="text-xs font-medium text-[#8CA6BD]">
                            Study materials available
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                }

                /* COMING SOON SUBJECT */

                return (
                  <div
                    key={subject}
                    className="group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-white/[0.055] bg-[#101521]/75 p-6 transition duration-300 hover:border-[#9B7BFF]/20 hover:bg-[#141A29]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.035]">
                        <FileText
                          size={21}
                          className="text-[#8292AC]"
                        />
                      </div>

                      <span className="rounded-full border border-[#9B7BFF]/20 bg-[#9B7BFF]/[0.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#B5A2FF]">
                        Coming Soon
                      </span>
                    </div>

                    <div className="mt-7">
                      <h3 className="text-lg font-medium leading-7 text-[#CBD5E1]">
                        {subject}
                      </h3>

                      <p className="mt-3 text-xs leading-6 text-[#64748B]">
                        Learning materials for this subject are
                        currently being prepared.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SEO CONTENT */}

      <section className="relative border-t border-white/[0.06] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-[#111A2A] to-[#0D1320] p-7 sm:p-10">
            <div className="mb-5 flex items-center gap-2">
              <BookOpen size={17} className="text-[#38DDF2]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
                ELEVIT Study Resources
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Engineering Notes and Study Materials
            </h2>

            <p className="mt-5 text-sm leading-8 text-[#94A9C5] sm:text-base">
              ELEVIT is a learning platform offering engineering
              notes and study materials for students. Explore
              handwritten notes, organised subject resources and
              academic learning materials designed to support your
              engineering studies and exam preparation.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-white">
              Electronics and Communication Engineering Notes
            </h3>

            <p className="mt-3 text-sm leading-8 text-[#94A9C5] sm:text-base">
              Find study resources covering Electrical Technology,
              Electronic Devices, Electrical Circuits and Network
              Analysis, Signals and Systems, Electromagnetic Field
              Theory, Analog Integrated Circuits, Smart Antenna
              Systems, CMOS VLSI Design, Control Systems,
              Microprocessor and Microcontroller, and Computer Networks.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-white">
              Browse Available Subject Notes
            </h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {seoSubjectLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-[#A8B8CE] transition hover:border-[#38DDF2]/25 hover:bg-[#38DDF2]/[0.04] hover:text-[#BCEFFF]"
                >
                  <span>{item.name}</span>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-[#64748B] transition group-hover:text-[#38DDF2]"
                  />
                </Link>
              ))}
            </div>

            <p className="mt-8 border-t border-white/[0.06] pt-6 text-xs leading-6 text-[#718096]">
              Explore ELEVIT to access engineering learning
              resources, subject notes and study materials in one place.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative border-t border-white/[0.06] px-6 py-9">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-sm font-semibold tracking-[0.12em] text-white">
              ELEVIT
              <span className="ml-2 font-normal tracking-normal text-[#64748B]">
                by Elevate Orbit
              </span>
            </p>

            <p className="mt-1 text-xs text-[#526078]">
              Learn. Build. Grow.
            </p>
          </div>

          <p className="text-xs text-[#64748B]">
            Learning resources for curious minds.
          </p>
        </div>
      </footer>
    </main>
  );
}
