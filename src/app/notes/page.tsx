
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  ArrowRight,
  Search,
  X,
  Sparkles,
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
        <div className="absolute -top-40 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/10 blur-[140px]" />

        <div className="absolute left-[-200px] top-[650px] h-[350px] w-[350px] rounded-full bg-[#9B7BFF]/8 blur-[130px]" />

        <div className="absolute right-[-200px] top-[1000px] h-[400px] w-[400px] rounded-full bg-[#38DDF2]/6 blur-[140px]" />
      </div>

      {/* NAVBAR */}

      <Navbar />

      {/* HERO */}

      <section className="relative px-6 pb-12 pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl text-center">

          {/* ICON */}

          <div className="mb-7 flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-[#38DDF2]/20 bg-gradient-to-br from-[#38DDF2]/15 via-[#4D9BF5]/10 to-[#9B7BFF]/15 shadow-[0_0_55px_rgba(56,221,242,0.10)]">
              <BookOpen size={38} className="text-[#38DDF2]" />

              <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[#9B7BFF] shadow-[0_0_15px_#9B7BFF]" />
            </div>
          </div>

          {/* LABEL */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/15 bg-[#38DDF2]/5 px-4 py-2 text-xs font-medium tracking-[0.18em] text-[#38DDF2]">
            <Sparkles size={13} />
            YOUR LEARNING LIBRARY
          </div>

          {/* TITLE */}

          <h1 className="bg-gradient-to-r from-white via-[#BCEFFF] to-[#9B7BFF] bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            ELEVIT Notes
          </h1>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Everything you need to learn, understand and
            prepare. Explore engineering notes and study
            resources, all in one place.
          </p>

        </div>
      </section>

      {/* SEARCH */}

      <section className="relative px-6 pb-16">
        <div className="mx-auto max-w-3xl">

          <div className="group flex items-center rounded-2xl border border-white/10 bg-[#141722]/90 px-5 py-3 shadow-[0_15px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl transition duration-300 focus-within:border-[#38DDF2]/50 focus-within:shadow-[0_0_35px_rgba(56,221,242,0.08)]">

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
              placeholder="Search subjects..."
              aria-label="Search subjects"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-[#64748B]"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="ml-3 flex items-center gap-1 rounded-xl px-3 py-2 text-sm text-[#94A9C5] transition hover:bg-white/5 hover:text-white"
              >
                <X size={15} />
                Clear
              </button>
            )}

          </div>

          {/* SEARCH STATUS */}

          {searchQuery && (
            <div className="mt-5 text-center">
              <p className="text-sm text-[#64748B]">
                Search results for
              </p>

              <p className="mt-1 text-lg font-medium text-[#BCEFFF]">
                &quot;{searchQuery}&quot;
              </p>

              <p className="mt-1 text-xs text-[#64748B]">
                {filteredSubjects.length} subject
                {filteredSubjects.length !== 1 ? "s" : ""} found
              </p>
            </div>
          )}

        </div>
      </section>

      {/* SUBJECT DIRECTORY */}

      <section className="relative px-6 pb-28">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}

          <div className="mb-10">

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#38DDF2]">
              ECE STUDY RESOURCES
            </p>

            <div className="flex flex-wrap items-end justify-between gap-4">

              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Engineering Subjects
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#94A9C5] sm:text-base">
                  Explore your curriculum and find the
                  learning resources you need.
                </p>
              </div>

              <p className="text-sm text-[#64748B]">
                {filteredSubjects.length} subjects
              </p>

            </div>
          </div>

          {/* NO SEARCH RESULTS */}

          {filteredSubjects.length === 0 && (
            <div className="rounded-3xl border border-white/10 bg-[#141722]/70 px-8 py-16 text-center backdrop-blur-xl">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/5">
                <Search size={30} className="text-[#38DDF2]" />
              </div>

              <h2 className="text-2xl font-semibold text-white">
                No subject found
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#94A9C5]">
                We couldn&apos;t find a subject matching
                &quot;{searchQuery}&quot;. Try another search.
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-7 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3 text-sm font-semibold text-[#070B16] transition hover:brightness-110"
              >
                View All Subjects
              </button>

            </div>
          )}

          {/* SUBJECT GRID */}

          {filteredSubjects.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredSubjects.map((subject) => {
                const route = availableSubjects[subject];

                /* SUBJECT WITH DEDICATED PAGE */

                if (route) {
                  return (
                    <Link
                      key={subject}
                      href={route}
                      className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#141D30] to-[#101521] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/40 hover:shadow-[0_15px_45px_rgba(56,221,242,0.08)]"
                    >

                      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#38DDF2]/5 blur-3xl transition group-hover:bg-[#38DDF2]/10" />

                      <div className="relative mb-6 flex items-start justify-between">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/10 transition group-hover:bg-[#38DDF2]/15">
                          <BookOpen
                            size={23}
                            className="text-[#38DDF2]"
                          />
                        </div>

                        <ArrowRight
                          size={20}
                          className="text-[#64748B] transition duration-300 group-hover:translate-x-1 group-hover:text-[#38DDF2]"
                        />

                      </div>

                      <h3 className="relative text-xl font-semibold leading-7 text-white transition group-hover:text-[#BCEFFF]">
                        {subject}
                      </h3>

                      <div className="relative mt-4 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#38DDF2] shadow-[0_0_8px_#38DDF2]" />

                        <p className="text-sm text-[#94A9C5]">
                          Notes available
                        </p>
                      </div>

                    </Link>
                  );
                }

                /* SUBJECT WITHOUT DEDICATED PAGE */

                return (
                  <div
                    key={subject}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.05] bg-[#111622]/70 p-6 transition duration-300 hover:border-[#9B7BFF]/25 hover:bg-[#141A29]"
                  >

                    <div className="mb-6 flex items-start justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.03]">
                        <FileText
                          size={23}
                          className="text-[#8292AC]"
                        />
                      </div>

                      <span className="rounded-full border border-[#9B7BFF]/20 bg-[#9B7BFF]/5 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[#B5A2FF]">
                        Coming Soon
                      </span>

                    </div>

                    <h3 className="text-xl font-semibold leading-7 text-[#CBD5E1]">
                      {subject}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#718096]">
                      Notes and learning resources for this
                      subject are being prepared.
                    </p>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* SEO SECTION */}

      <section className="relative border-t border-white/[0.06] px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            ECE Notes and Study Materials
          </h2>

          <p className="mt-5 text-base leading-8 text-[#8292AC]">
            ELEVIT provides engineering study resources
            covering subjects such as Matrices and Calculus,
            Physics, Electrical Technology, Electronic Devices,
            Chemistry, Electrical Circuits and Network Analysis,
            Digital Logic Circuits, Signals and Systems,
            Electromagnetic Field Theory, Analog Integrated
            Circuits, Digital Signal Processing, Smart Antenna
            Systems, CMOS VLSI Design, Control Systems,
            Microprocessor and Microcontroller, Computer
            Networks, Embedded Systems and other ECE subjects.
          </p>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative border-t border-white/[0.06] px-6 py-10">
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
