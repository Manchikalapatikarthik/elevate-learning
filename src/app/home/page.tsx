"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";

import {
  BookOpen,
  Newspaper,
  Cpu,
  Video,
  Briefcase,
  FolderOpen,
  Search,
  ArrowRight,
} from "lucide-react";

import { notesCatalog } from "../../lib/notesCatalog";

/*
 * IMPORTANT:
 * sessionStorage means:
 *
 * - Intro plays once per browser tab/session
 * - Going Home → Notes → Home will NOT replay it
 * - Closing the tab and opening the site again WILL replay it
 */

const INTRO_SESSION_KEY =
  "elevateOrbitIntroPlayedThisSession";

export default function Home() {

  /* =====================================================
     INTRO
  ===================================================== */

  const [introChecked, setIntroChecked] =
    useState(false);

  const [firstVisitIntro, setFirstVisitIntro] =
    useState(false);

  const [phase, setPhase] =
    useState(1);

  const introInitialized =
    useRef(false);

  /* =====================================================
     SEARCH
  ===================================================== */

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchActive, setSearchActive] =
    useState(false);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  /* =====================================================
     NOTES NAVIGATION
  ===================================================== */

  const goToNotes = () => {

    setSearchActive(false);

    setShowSuggestions(false);

    setSearchQuery("");

    window.location.assign("/notes");
  };

  /* =====================================================
     INTRO INITIALIZATION
  ===================================================== */

  useEffect(() => {

    if (introInitialized.current) {
      return;
    }

    introInitialized.current = true;

    /*
     * Check sessionStorage.
     *
     * This is intentionally NOT localStorage.
     */
    const alreadyPlayed =
      sessionStorage.getItem(
        INTRO_SESSION_KEY
      ) === "true";

    /*
     * Returning to Home in the same tab
     */
    if (alreadyPlayed) {

      setPhase(4);

      setIntroChecked(true);

      setFirstVisitIntro(false);

      return;
    }

    /*
     * First opening in this tab/session
     */
    setFirstVisitIntro(true);

    setIntroChecked(true);

    /* ==========================================
       PHASE 1
       0 → 2 seconds
    ========================================== */

    const timer1 = setTimeout(() => {

      setPhase(2);

    }, 2000);

    /* ==========================================
       PHASE 2
       2 → 4.5 seconds
    ========================================== */

    const timer2 = setTimeout(() => {

      setPhase(3);

    }, 4500);

    /* ==========================================
       PHASE 3
       4.5 → 7 seconds
    ========================================== */

    const timer3 = setTimeout(() => {

      setPhase(4);

      /*
       * Mark intro completed for this
       * browser tab/session.
       */
      sessionStorage.setItem(
        INTRO_SESSION_KEY,
        "true"
      );

    }, 7000);

    return () => {

      clearTimeout(timer1);

      clearTimeout(timer2);

      clearTimeout(timer3);

    };

  }, []);

  /* =====================================================
     CONTRIBUTION POPUP
     ONLY AFTER THE INTRO
  ===================================================== */

  useEffect(() => {

    if (
      !firstVisitIntro ||
      phase !== 4
    ) {
      return;
    }

    /*
     * Give the homepage one second
     * to appear before opening popup.
     */
    const contributionTimer =
      setTimeout(() => {

        window.dispatchEvent(
          new Event(
            "elevate:transition-complete"
          )
        );

      }, 1000);

    return () => {

      clearTimeout(
        contributionTimer
      );

    };

  }, [
    firstVisitIntro,
    phase,
  ]);

  /* =====================================================
     ESC KEY
  ===================================================== */

  useEffect(() => {

    const handleEscape =
      (event: KeyboardEvent) => {

        if (
          event.key === "Escape" &&
          searchActive
        ) {

          closeSearch();

        }

      };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [searchActive]);

  /* =====================================================
     LOCK SCROLL WHILE SEARCH IS OPEN
  ===================================================== */

  useEffect(() => {

    if (searchActive) {

      document.body.style.overflow =
        "hidden";

    } else {

      document.body.style.overflow =
        "";

    }

    return () => {

      document.body.style.overflow =
        "";

    };

  }, [searchActive]);

  /* =====================================================
     NORMALIZE SEARCH
  ===================================================== */

  const normalizeText = (
    value: string
  ) => {

    return value

      .toLowerCase()

      .replace(
        /[^a-z0-9\s]/g,
        " "
      )

      .replace(
        /\s+/g,
        " "
      )

      .trim();

  };

  /* =====================================================
     REAL SEARCH SUGGESTIONS
  ===================================================== */

  const searchSuggestions =
    useMemo(() => {

      const query =
        normalizeText(
          searchQuery
        );

      /*
       * Nothing typed
       */
      if (!query) {

        return notesCatalog.slice(
          0,
          10
        );

      }

      const queryWords =
        query.split(" ");

      const results =
        notesCatalog

          .map((item) => {

            const name =
              normalizeText(
                item.name
              );

            const aliases =
              (
                item.aliases ??
                []
              ).map(
                normalizeText
              );

            const semester =
              normalizeText(
                item.semester
              );

            let score = 0;

            /*
             * Exact subject
             */
            if (
              name === query
            ) {

              score = 100;

            }

            /*
             * Exact alias
             */
            else if (
              aliases.includes(
                query
              )
            ) {

              score = 95;

            }

            /*
             * Subject begins with query
             */
            else if (
              name.startsWith(
                query
              )
            ) {

              score = 90;

            }

            /*
             * Alias begins with query
             */
            else if (
              aliases.some(
                (alias) =>
                  alias.startsWith(
                    query
                  )
              )
            ) {

              score = 85;

            }

            /*
             * Subject word begins with query
             */
            else if (
              queryWords.some(
                (queryWord) =>
                  name
                    .split(" ")
                    .some(
                      (word) =>
                        word.startsWith(
                          queryWord
                        )
                    )
              )
            ) {

              score = 80;

            }

            /*
             * Subject contains query
             */
            else if (
              name.includes(
                query
              )
            ) {

              score = 70;

            }

            /*
             * Alias contains query
             */
            else if (
              aliases.some(
                (alias) =>
                  alias.includes(
                    query
                  )
              )
            ) {

              score = 65;

            }

            /*
             * Semester match
             */
            else if (
              semester.includes(
                query
              )
            ) {

              score = 40;

            }

            return {
              ...item,
              score,
            };

          })

          .filter(
            (item) =>
              item.score > 0
          )

          .sort(
            (a, b) =>
              b.score - a.score
          );

      return results.slice(
        0,
        10
      );

    }, [searchQuery]);

  /* =====================================================
     OPEN SEARCH
  ===================================================== */

  const openSearch = () => {

    setSearchActive(true);

    setShowSuggestions(true);

  };

  /* =====================================================
     CLOSE SEARCH
  ===================================================== */

  const closeSearch = () => {

    setSearchActive(false);

    setShowSuggestions(false);

    setSearchQuery("");

  };

  /* =====================================================
     FIND SEARCH MATCH
  ===================================================== */

  const findBestMatch = (
    query: string
  ) => {

    const normalizedQuery =
      normalizeText(query);

    return notesCatalog

      .map((item) => {

        const name =
          normalizeText(
            item.name
          );

        const aliases =
          (
            item.aliases ??
            []
          ).map(
            normalizeText
          );

        let score = 0;

        if (
          name === normalizedQuery
        ) {

          score = 100;

        }

        else if (
          aliases.includes(
            normalizedQuery
          )
        ) {

          score = 95;

        }

        else if (
          name.startsWith(
            normalizedQuery
          )
        ) {

          score = 90;

        }

        else if (
          aliases.some(
            (alias) =>
              alias.startsWith(
                normalizedQuery
              )
          )
        ) {

          score = 85;

        }

        else if (
          name.includes(
            normalizedQuery
          )
        ) {

          score = 70;

        }

        else if (
          aliases.some(
            (alias) =>
              alias.includes(
                normalizedQuery
              )
          )
        ) {

          score = 65;

        }

        return {
          item,
          score,
        };

      })

      .filter(
        (result) =>
          result.score > 0
      )

      .sort(
        (a, b) =>
          b.score - a.score
      )[0];

  };

  /* =====================================================
     HANDLE SEARCH
  ===================================================== */

  const handleSearch = (
    value?: string
  ) => {

    const query =
      (
        value ??
        searchQuery
      ).trim();

    if (!query) {

      openSearch();

      return;

    }

    const bestMatch =
      findBestMatch(
        query
      );

    setSearchActive(false);

    setShowSuggestions(false);

    /*
     * Dedicated subject page
     */
    if (
      bestMatch &&
      bestMatch.item.route
    ) {

      window.location.assign(
        bestMatch.item.route
      );

      return;

    }

    /*
     * Subject without dedicated
     * page OR unknown query.
     */
    window.location.assign(
      `/notes?search=${encodeURIComponent(
        query
      )}`
    );

  };

  /* =====================================================
     SUGGESTION CLICK
  ===================================================== */

  const handleSuggestionClick = (
    name: string
  ) => {

    const item =
      notesCatalog.find(
        (subject) =>
          subject.name === name
      );

    if (!item) {

      handleSearch(name);

      return;

    }

    setSearchQuery("");

    setSearchActive(false);

    setShowSuggestions(false);

    /*
     * Dedicated subject page
     */
    if (item.route) {

      window.location.assign(
        item.route
      );

      return;

    }

    /*
     * No dedicated page yet
     */
    window.location.assign(
      `/notes?search=${encodeURIComponent(
        item.name
      )}`
    );

  };

  /* =====================================================
     WAIT FOR INTRO CHECK
  ===================================================== */

  if (!introChecked) {

    return (
      <main className="min-h-screen bg-black" />
    );

  }

  return (
    <>
      {/* =================================================
          INTRO / TRANSITION
      ================================================== */}

      <AnimatePresence>

        {phase < 4 && (

          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >

            {/* GLOW */}

            <div className="absolute h-[700px] w-[700px] rounded-full bg-white/10 blur-3xl" />

            {/* =========================================
                PHASE 1
            ========================================== */}

            {phase === 1 && (

              <div className="flex gap-8 px-6 md:gap-24">

                {/* ELEVATE */}

                <motion.h1
                  initial={{
                    x: -400,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="text-4xl font-extrabold text-white md:text-6xl"
                >
                  ELEVATE
                </motion.h1>

                {/* ORBIT */}

                <motion.h1
                  initial={{
                    x: 400,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                  }}
                  className="text-4xl font-extrabold text-white md:text-6xl"
                >
                  ORBIT
                </motion.h1>

              </div>

            )}

            {/* =========================================
                PHASE 2
            ========================================== */}

            {phase === 2 && (

              <motion.h1
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: [
                    0.95,
                    1.02,
                    1,
                  ],
                  opacity: 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-6xl font-extrabold text-transparent md:text-8xl"
              >
                ELEVIT
              </motion.h1>

            )}

            {/* =========================================
                PHASE 3
            ========================================== */}

            {phase === 3 && (

              <motion.h1
                animate={{
                  scale: 0.18,
                  x: -520,
                  y: -235,
                  opacity: 0.9,
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                }}
                className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-6xl font-extrabold text-transparent md:text-8xl"
              >
                ELEVIT
              </motion.h1>

            )}

          </motion.div>

        )}

      </AnimatePresence>

      {/* =================================================
          SEARCH BACKDROP
      ================================================== */}

      <AnimatePresence>

        {searchActive && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={
              closeSearch
            }
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-lg"
            aria-hidden="true"
          />

        )}

      </AnimatePresence>

      {/* =================================================
          MAIN WEBSITE
      ================================================== */}

      <main
        className={`min-h-screen overflow-hidden bg-black text-white transition-opacity duration-1000 ${
          phase < 4
            ? "opacity-0"
            : "opacity-100"
        }`}
      >

        <Navbar />

        {/* =================================================
            HERO
        ================================================== */}

        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 pt-28 text-center sm:px-6 sm:pt-32">

          {/* GLOW */}

          <div className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-white/10 blur-3xl sm:h-[600px] sm:w-[600px]" />

          {/* TITLE */}

          <h1 className="relative mb-5 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-5xl font-extrabold leading-tight text-transparent sm:text-6xl md:text-8xl">
            ELEVATE ORBIT
          </h1>

          {/* DESCRIPTION */}

          <p className="relative mb-9 max-w-4xl px-2 text-base leading-7 text-gray-300 sm:text-lg md:text-xl md:leading-9">
            Where Notes, Projects, Research,
            Innovation, Careers, AI Tools and
            Technology Orbit Around Students.
          </p>

          {/* HERO BUTTONS */}

          <div className="relative z-[10] flex w-full flex-wrap justify-center gap-4 sm:gap-6">

            {/* EXPLORE NOTES */}

            <button
              type="button"
              onClick={
                goToNotes
              }
              className="cursor-pointer rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-2xl shadow-white/20 transition duration-300 hover:scale-105 hover:bg-gray-200 sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Notes
            </button>

            {/* EXPLORE INSIGHTS */}

            <button
              type="button"
              onClick={() => {

                window.location.assign(
                  "/blog"
                );

              }}
              className="cursor-pointer rounded-full border border-gray-600 px-6 py-3.5 text-sm transition duration-300 hover:scale-105 hover:bg-zinc-900 sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Insights
            </button>

          </div>

          {/* =================================================
              SEARCH
          ================================================== */}

          <motion.div
            animate={{
              y: searchActive
                ? -300
                : 0,

              scale: searchActive
                ? 1.03
                : 1,
            }}
            transition={{
              duration: 0.45,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className={`relative mt-8 w-full max-w-2xl ${
              searchActive
                ? "z-[70]"
                : "z-10"
            }`}
          >

            {/* SEARCH BOX */}

            <div
              className={`relative flex items-center rounded-2xl border bg-zinc-950/95 p-2 shadow-2xl backdrop-blur-xl transition duration-300 sm:rounded-full ${
                searchActive
                  ? "border-zinc-400 shadow-white/10"
                  : "border-zinc-700"
              }`}
            >

              {/* SEARCH ICON */}

              <Search
                size={20}
                className="ml-3 shrink-0 text-zinc-500 sm:ml-4"
              />

              {/* INPUT */}

              <input
                type="text"
                value={
                  searchQuery
                }
                onFocus={
                  openSearch
                }
                onChange={(
                  event
                ) => {

                  setSearchQuery(
                    event.target.value
                  );

                  setSearchActive(
                    true
                  );

                  setShowSuggestions(
                    true
                  );

                }}
                onKeyDown={(
                  event
                ) => {

                  if (
                    event.key ===
                    "Enter"
                  ) {

                    handleSearch();

                  }

                  if (
                    event.key ===
                    "Escape"
                  ) {

                    closeSearch();

                  }

                }}
                placeholder="Search subjects, notes, units..."
                aria-label="Search Elevate Orbit"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-zinc-600 sm:px-4 sm:text-base"
              />

              {/* CLOSE */}

              {searchActive && (

                <button
                  type="button"
                  onClick={
                    closeSearch
                  }
                  aria-label="Close search"
                  className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-400 transition duration-200 hover:bg-zinc-900 hover:text-white"
                >
                  ✕
                </button>

              )}

              {/* SEARCH BUTTON */}

              <button
                type="button"
                onClick={() =>
                  handleSearch()
                }
                className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black transition duration-300 hover:bg-zinc-200 sm:rounded-full sm:px-6"
              >

                <span className="hidden sm:inline">
                  Search
                </span>

                <ArrowRight
                  size={18}
                  className="sm:hidden"
                />

              </button>

            </div>

            {/* =================================================
                SUGGESTIONS
            ================================================== */}

            <AnimatePresence>

              {searchActive &&
                showSuggestions && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="absolute left-0 right-0 top-full z-[80] mt-3 max-h-[460px] overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-950/98 text-left shadow-2xl shadow-black/70 backdrop-blur-xl"
                  >

                    {/* HEADER */}

                    <div className="border-b border-zinc-800 px-5 py-3.5">

                      <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">

                        {searchQuery.trim()
                          ? "Matching content"
                          : "Explore subjects"}

                      </p>

                    </div>

                    {/* RESULTS */}

                    {searchSuggestions.length >
                    0 ? (

                      searchSuggestions.map(
                        (item) => (

                          <button
                            key={`${item.semester}-${item.name}`}
                            type="button"
                            onMouseDown={(
                              event
                            ) => {

                              event.preventDefault();

                            }}
                            onClick={() =>
                              handleSuggestionClick(
                                item.name
                              )
                            }
                            className="group flex w-full items-center justify-between gap-4 border-b border-zinc-900 px-5 py-4 text-left transition duration-200 hover:bg-zinc-900"
                          >

                            <div className="min-w-0">

                              <p className="truncate text-sm font-medium text-zinc-200 transition group-hover:text-white">
                                {item.name}
                              </p>

                              <p className="mt-1 text-xs text-zinc-600">
                                {item.semester}

                                {item.route
                                  ? ""
                                  : " • Notes Coming Soon"}
                              </p>

                            </div>

                            <ArrowRight
                              size={17}
                              className="shrink-0 text-zinc-700 transition group-hover:translate-x-1 group-hover:text-zinc-300"
                            />

                          </button>

                        )
                      )

                    ) : (

                      <div className="px-5 py-7">

                        <div className="flex items-center gap-3">

                          <Search
                            size={18}
                            className="text-zinc-700"
                          />

                          <p className="text-sm text-zinc-400">
                            No matching content found.
                          </p>

                        </div>

                        <p className="mt-2 pl-7 text-xs text-zinc-700">
                          Try a subject name,
                          keyword, abbreviation
                          or semester.
                        </p>

                      </div>

                    )}

                    {/* FOOTER */}

                    <div className="border-t border-zinc-800 px-5 py-2.5">

                      <p className="text-right text-[11px] text-zinc-600">
                        Press Esc or ✕ to close
                      </p>

                    </div>

                  </motion.div>

                )}

            </AnimatePresence>

            {/* HELPER */}

            {!searchActive && (

              <p className="mt-3 text-xs tracking-wide text-zinc-600">
                Search subjects, units, notes and study resources
              </p>

            )}

          </motion.div>

        </section>

        {/* =================================================
            ECOSYSTEM
        ================================================== */}

        <section className="bg-black px-5 pb-28 sm:px-6 sm:pb-32">

          <div className="mx-auto max-w-7xl">

            {/* HEADING */}

            <div className="mb-14 text-center sm:mb-20">

              <h2 className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl">
                The ELEVIT Ecosystem
              </h2>

              <p className="mx-auto max-w-4xl text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                A complete student-centered ecosystem
                where learning, innovation, research,
                projects, career development, and
                technology resources come together.
              </p>

            </div>

            {/* CARDS */}

            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">

              {/* NOTES */}

              <button
                type="button"
                onClick={
                  goToNotes
                }
                className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-950 p-7 text-left transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10 sm:p-8"
              >

                <BookOpen
                  size={40}
                  className="mb-4 text-white transition duration-300 group-hover:scale-110"
                />

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  ELEVIT Notes
                </h3>

                <p className="text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  Semester-wise engineering notes,
                  handwritten resources and exam
                  preparation.
                </p>

              </button>

              {/* INSIGHTS */}

              <button
                type="button"
                onClick={() => {

                  window.location.assign(
                    "/blog"
                  );

                }}
                className="group cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-950 p-7 text-left transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10 sm:p-8"
              >

                <Newspaper
                  size={40}
                  className="mb-4 text-white transition duration-300 group-hover:scale-110"
                />

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  ELEVIT Insights
                </h3>

                <p className="text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  Engineering blogs, research
                  articles, technology trends and
                  innovation insights.
                </p>

              </button>

              {/* LABS */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10 sm:p-8">

                <Cpu
                  size={40}
                  className="mb-4 text-white"
                />

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  ELEVIT Labs
                </h3>

                <p className="text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  IoT systems, embedded projects,
                  FPGA research, AI hardware and
                  innovation.
                </p>

              </div>

              {/* MEDIA */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10 sm:p-8">

                <Video
                  size={40}
                  className="mb-4 text-white"
                />

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  ELEVIT Media
                </h3>

                <p className="text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  Video explanations, tutorials,
                  visual learning and AI-powered
                  education.
                </p>

              </div>

              {/* CAREERS */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10 sm:p-8">

                <Briefcase
                  size={40}
                  className="mb-4 text-white"
                />

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  ELEVIT Careers
                </h3>

                <p className="text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  Placement preparation, interview
                  guidance and career roadmaps.
                </p>

              </div>

              {/* RESOURCES */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10 sm:p-8">

                <FolderOpen
                  size={40}
                  className="mb-4 text-white"
                />

                <h3 className="mb-3 text-2xl font-bold sm:text-3xl">
                  ELEVIT Resources
                </h3>

                <p className="text-base leading-7 text-gray-400 sm:text-lg sm:leading-8">
                  PDFs, cheat sheets, study materials
                  and productivity resources.
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}