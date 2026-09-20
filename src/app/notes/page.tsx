"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  FileText,
  ArrowRight,
  Search,
} from "lucide-react";

import Navbar from "../components/Navbar";

/* =========================================================
   SUBJECTS WITH DEDICATED NOTE PAGES
========================================================= */

const availableSubjects: Record<string, string> = {
  "Electrical Technology":
    "/notes/electrical-technology",

  "Electronic Devices":
    "/notes/electronic-devices",

  Chemistry:
    "/notes/chemistry",

  "Electrical Circuits and Network Analysis":
    "/notes/electrical-circuits-and-network-analysis",

  "Signals and Systems":
    "/notes/signals-and-systems",

  "Electromagnetic Field Theory":
    "/notes/electromagnetic-field-theory",

  "Analog Integrated Circuits":
    "/notes/analog-integrated-circuits",

  "Smart Antenna Systems":
    "/notes/smart-antenna-systems",

  "CMOS VLSI Design":
    "/notes/cmos-vlsi-design",

  "Control Systems":
    "/notes/control-systems",

  "Microprocessor and Microcontroller":
    "/notes/microprocessor-and-microcontroller",

  "Computer Networks":
    "/notes/computer-networks",
};

/* =========================================================
   ALL SUBJECTS
   No semester sections
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
   SUBJECT SEARCH NORMALIZATION
========================================================= */

const normalizeText = (value: string) => {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

/* =========================================================
   PAGE
========================================================= */

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  /* =======================================================
     READ SEARCH FROM URL
  ======================================================= */

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search
    );

    const search = params.get("search");

    if (search) {
      setSearchQuery(search);
    }
  }, []);

  /* =======================================================
     SEARCH SUBJECTS
  ======================================================= */

  const filteredSubjects = useMemo(() => {
    const query = normalizeText(searchQuery);

    if (!query) {
      return subjects;
    }

    return subjects.filter((subject) =>
      normalizeText(subject).includes(query)
    );
  }, [searchQuery]);

  /* =======================================================
     SEARCH URL
  ======================================================= */

  const handleSearchChange = (
    value: string
  ) => {
    setSearchQuery(value);

    const trimmedValue = value.trim();

    if (trimmedValue) {
      window.history.replaceState(
        {},
        "",
        `/notes?search=${encodeURIComponent(
          trimmedValue
        )}`
      );
    } else {
      window.history.replaceState(
        {},
        "",
        "/notes"
      );
    }
  };

  /* =======================================================
     CLEAR SEARCH
  ======================================================= */

  const clearSearch = () => {
    setSearchQuery("");

    window.history.replaceState(
      {},
      "",
      "/notes"
    );
  };

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <main className="min-h-screen bg-black text-white">

      {/* ===================================================
          NAVBAR
      =================================================== */}

      <Navbar />

      {/* ===================================================
          HERO
      =================================================== */}

      <section className="px-6 pb-14 pt-32">
        <div className="mx-auto max-w-7xl text-center">

          {/* ICON */}

          <div className="mb-7 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-950">
              <BookOpen
                size={42}
                className="text-white"
              />
            </div>
          </div>

          {/* MAIN TITLE */}

          <h1 className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            ELEVIT Notes
          </h1>

          {/* DESCRIPTION */}

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-gray-400 sm:text-lg">
            Engineering notes, study materials,
            handwritten resources and exam preparation
            for ECE students.
          </p>

        </div>
      </section>

      {/* ===================================================
          SEARCH
      =================================================== */}

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">

          <div className="flex items-center rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 shadow-2xl">

            {/* SEARCH ICON */}

            <Search
              size={21}
              className="mr-3 shrink-0 text-zinc-500"
            />

            {/* SEARCH INPUT */}

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                handleSearchChange(
                  event.target.value
                )
              }
              placeholder="Search subjects..."
              aria-label="Search subjects"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-zinc-600"
            />

            {/* CLEAR */}

            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="ml-3 rounded-full px-3 py-1.5 text-sm text-zinc-400 transition duration-200 hover:bg-zinc-900 hover:text-white"
              >
                Clear
              </button>
            )}

          </div>

          {/* SEARCH STATUS */}

          {searchQuery && (
            <div className="mt-5 text-center">

              <p className="text-sm text-zinc-600">
                Search results for
              </p>

              <p className="mt-1 text-lg font-medium text-zinc-300">
                "{searchQuery}"
              </p>

            </div>
          )}

        </div>
      </section>

      {/* ===================================================
          SUBJECT DIRECTORY
      =================================================== */}

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-7xl">

          {/* SECTION HEADER */}

          <div className="mb-10">

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-zinc-600">
              ECE Study Resources
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Engineering Subjects
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">
              Explore notes and learning resources
              across the ECE curriculum.
            </p>

          </div>

          {/* =================================================
              NO SEARCH RESULTS
          ================================================= */}

          {filteredSubjects.length === 0 && (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-16 text-center">

              <Search
                size={42}
                className="mx-auto mb-5 text-zinc-700"
              />

              <h2 className="text-2xl font-semibold text-white">
                No subject found
              </h2>

              <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-zinc-500">
                We couldn't find a subject matching
                "{searchQuery}".
              </p>

              <button
                type="button"
                onClick={clearSearch}
                className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                View All Subjects
              </button>

            </div>
          )}

          {/* =================================================
              SUBJECT GRID
          ================================================= */}

          {filteredSubjects.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {filteredSubjects.map(
                (subject) => {

                  const route =
                    availableSubjects[
                      subject
                    ];

                  /* =========================================
                     SUBJECT WITH DEDICATED PAGE
                  ========================================= */

                  if (route) {
                    return (
                      <Link
                        key={subject}
                        href={route}
                        className="group block rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition duration-300 hover:-translate-y-2 hover:border-white hover:shadow-2xl hover:shadow-white/10"
                      >

                        {/* ICON + ARROW */}

                        <div className="mb-6 flex items-start justify-between">

                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-800 bg-black">
                            <BookOpen
                              size={23}
                              className="text-white"
                            />
                          </div>

                          <ArrowRight
                            size={20}
                            className="text-zinc-700 transition duration-300 group-hover:translate-x-1 group-hover:text-white"
                          />

                        </div>

                        {/* SUBJECT NAME */}

                        <h3 className="text-xl font-semibold leading-7 text-white">
                          {subject}
                        </h3>

                        {/* AVAILABLE */}

                        <p className="mt-3 text-sm text-zinc-500">
                          Notes available
                        </p>

                      </Link>
                    );
                  }

                  /* =========================================
                     SUBJECT WITHOUT PAGE
                  ========================================= */

                  return (
                    <div
                      key={subject}
                      className="rounded-3xl border border-zinc-900 bg-zinc-950/70 p-6"
                    >

                      {/* ICON + STATUS */}

                      <div className="mb-6 flex items-start justify-between">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-900 bg-black">
                          <FileText
                            size={23}
                            className="text-zinc-500"
                          />
                        </div>

                        <span className="rounded-full border border-zinc-800 px-3 py-1 text-[10px] uppercase tracking-wider text-zinc-600">
                          Coming Soon
                        </span>

                      </div>

                      {/* SUBJECT NAME */}

                      <h3 className="text-xl font-semibold leading-7 text-zinc-300">
                        {subject}
                      </h3>

                      {/* DESCRIPTION */}

                      <p className="mt-3 text-sm leading-6 text-zinc-600">
                        Notes for this subject
                        will be added soon.
                      </p>

                    </div>
                  );
                }
              )}

            </div>
          )}

        </div>
      </section>

      {/* ===================================================
          SEO SUBJECT DIRECTORY TEXT
      =================================================== */}

      <section className="border-t border-zinc-900 px-6 py-20">
        <div className="mx-auto max-w-5xl">

          <h2 className="text-2xl font-bold sm:text-3xl">
            ECE Notes and Study Materials
          </h2>

          <p className="mt-5 text-base leading-8 text-zinc-500">
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

      {/* ===================================================
          FOOTER
      =================================================== */}

      <footer className="border-t border-zinc-900 px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm text-zinc-600">
            ELEVIT · By Elevate Orbit
          </p>

        </div>
      </footer>

    </main>
  );
}