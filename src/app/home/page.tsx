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
  Sparkles,
} from "lucide-react";

import Link from "next/link";
import { notesCatalog } from "../../lib/notesCatalog";

const INTRO_SESSION_KEY = "elevateOrbitIntroPlayedThisSession";

export default function Home() {
  // INTRO
  const [introChecked, setIntroChecked] = useState(false);
  const [firstVisitIntro, setFirstVisitIntro] = useState(false);
  const [phase, setPhase] = useState(1);
  const introInitialized = useRef(false);

  // SEARCH
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // INTRO INITIALIZATION
  useEffect(() => {
    if (introInitialized.current) return;

    introInitialized.current = true;

    const alreadyPlayed =
      sessionStorage.getItem(INTRO_SESSION_KEY) === "true";

    if (alreadyPlayed) {
      setPhase(4);
      setIntroChecked(true);
      setFirstVisitIntro(false);
      return;
    }

    setFirstVisitIntro(true);
    setIntroChecked(true);

    const timer1 = setTimeout(() => setPhase(2), 2000);
    const timer2 = setTimeout(() => setPhase(3), 4500);

    const timer3 = setTimeout(() => {
      setPhase(4);
      sessionStorage.setItem(INTRO_SESSION_KEY, "true");
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // CONTRIBUTION POPUP AFTER INTRO
  useEffect(() => {
    if (!firstVisitIntro || phase !== 4) return;

    const contributionTimer = setTimeout(() => {
      window.dispatchEvent(
        new Event("elevate:transition-complete")
      );
    }, 1000);

    return () => clearTimeout(contributionTimer);
  }, [firstVisitIntro, phase]);

  // CLOSE SEARCH
  const closeSearch = () => {
    setSearchActive(false);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  // ESCAPE KEY
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchActive) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [searchActive]);

  // LOCK BACKGROUND SCROLL WHEN SEARCH IS OPEN
  useEffect(() => {
    document.body.style.overflow = searchActive ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchActive]);

  // NORMALIZE SEARCH TEXT
  const normalizeText = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // SEARCH SUGGESTIONS
  const searchSuggestions = useMemo(() => {
    const query = normalizeText(searchQuery);

    if (!query) {
      return notesCatalog.slice(0, 10);
    }

    const queryWords = query.split(" ");

    return notesCatalog
      .map((item) => {
        const name = normalizeText(item.name);
        const aliases = (item.aliases ?? []).map(normalizeText);
        const semester = normalizeText(item.semester);

        let score = 0;

        if (name === query) score = 100;
        else if (aliases.includes(query)) score = 95;
        else if (name.startsWith(query)) score = 90;
        else if (aliases.some((alias) => alias.startsWith(query))) score = 85;
        else if (
          queryWords.some((queryWord) =>
            name.split(" ").some((word) => word.startsWith(queryWord))
          )
        ) {
          score = 80;
        } else if (name.includes(query)) score = 70;
        else if (aliases.some((alias) => alias.includes(query))) score = 65;
        else if (semester.includes(query)) score = 40;

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }, [searchQuery]);

  // FIND BEST MATCH
  const findBestMatch = (query: string) => {
    const normalizedQuery = normalizeText(query);

    return notesCatalog
      .map((item) => {
        const name = normalizeText(item.name);
        const aliases = (item.aliases ?? []).map(normalizeText);

        let score = 0;

        if (name === normalizedQuery) score = 100;
        else if (aliases.includes(normalizedQuery)) score = 95;
        else if (name.startsWith(normalizedQuery)) score = 90;
        else if (aliases.some((alias) => alias.startsWith(normalizedQuery))) {
          score = 85;
        } else if (name.includes(normalizedQuery)) score = 70;
        else if (aliases.some((alias) => alias.includes(normalizedQuery))) {
          score = 65;
        }

        return { item, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)[0];
  };

  // HANDLE SEARCH
  const handleSearch = (value?: string) => {
    const query = (value ?? searchQuery).trim();

    if (!query) {
      setSearchActive(true);
      setShowSuggestions(true);
      return;
    }

    const bestMatch = findBestMatch(query);

    setSearchActive(false);
    setShowSuggestions(false);

    if (bestMatch?.item.route) {
      window.location.assign(bestMatch.item.route);
      return;
    }

    window.location.assign(
      `/notes?search=${encodeURIComponent(query)}`
    );
  };

  // HANDLE SUGGESTION CLICK
  const handleSuggestionClick = (name: string) => {
    const item = notesCatalog.find(
      (subject) => subject.name === name
    );

    if (!item) {
      handleSearch(name);
      return;
    }

    setSearchQuery("");
    setSearchActive(false);
    setShowSuggestions(false);

    if (item.route) {
      window.location.assign(item.route);
      return;
    }

    window.location.assign(
      `/notes?search=${encodeURIComponent(item.name)}`
    );
  };

  // OPEN SEARCH
  const openSearch = () => {
    setSearchActive(true);
    setShowSuggestions(true);
  };

  // NAVIGATION
  const goToNotes = () => {
    setSearchActive(false);
    setShowSuggestions(false);
    setSearchQuery("");
    window.location.assign("/notes");
  };

  if (!introChecked) {
    return <main className="min-h-screen bg-[#070B16]" />;
  }

  return (
    <>
      {/* INTRO ANIMATION */}
      <AnimatePresence>
        {phase < 4 && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#070B16]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute h-[600px] w-[600px] rounded-full bg-[#2563EB]/15 blur-[130px]" />

            {phase === 1 && (
              <div className="relative flex gap-8 px-6 md:gap-24">
                <motion.h1
                  initial={{ x: -400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="text-4xl font-extrabold text-white md:text-6xl"
                >
                  ELEVATE
                </motion.h1>

                <motion.h1
                  initial={{ x: 400, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                  className="text-4xl font-extrabold text-[#38DDF2] md:text-6xl"
                >
                  ORBIT
                </motion.h1>
              </div>
            )}

            {phase === 2 && (
              <motion.h1
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.02, 1], opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="relative bg-gradient-to-r from-white via-[#38DDF2] to-[#9B7BFF] bg-clip-text text-6xl font-extrabold text-transparent md:text-8xl"
              >
                ELEVIT
              </motion.h1>
            )}

            {phase === 3 && (
              <motion.h1
                animate={{
                  scale: 0.18,
                  x: -520,
                  y: -235,
                  opacity: 0.9,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="relative bg-gradient-to-r from-white via-[#38DDF2] to-[#9B7BFF] bg-clip-text text-6xl font-extrabold text-transparent md:text-8xl"
              >
                ELEVIT
              </motion.h1>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEARCH BACKDROP */}
      <AnimatePresence>
        {searchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeSearch}
            className="fixed inset-0 z-[60] bg-[#030712]/75 backdrop-blur-lg"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* MAIN WEBSITE */}
      <main
        className={`min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC] transition-opacity duration-1000 ${
          phase < 4 ? "opacity-0" : "opacity-100"
        }`}
      >
        <Navbar />

        {/* HERO */}
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 pb-20 pt-32 text-center sm:px-6 sm:pt-36">
          {/* BACKGROUND GLOWS */}
          <div className="pointer-events-none absolute left-1/2 top-[42%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/15 blur-[130px] sm:h-[650px] sm:w-[650px]" />

          <div className="pointer-events-none absolute left-[10%] top-[25%] h-48 w-48 rounded-full bg-[#38DDF2]/[0.07] blur-[100px]" />

          <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-56 w-56 rounded-full bg-[#9B7BFF]/[0.08] blur-[110px]" />

          {/* EYEBROW */}
          <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-5 py-2.5 text-[11px] font-medium tracking-[0.22em] text-[#38DDF2] sm:text-xs">
            <Sparkles size={14} />
            YOUR WORLD OF LEARNING
          </div>

          {/* MAIN TITLE */}
          <h1 className="relative mb-6 bg-gradient-to-r from-[#F8FAFC] via-[#C8D8ED] to-[#38DDF2] bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl md:text-8xl">
            ELEVATE ORBIT
          </h1>

          {/* DESCRIPTION */}
          <p className="relative mb-9 max-w-4xl px-2 text-base leading-8 text-[#B4C5DC] sm:text-lg md:text-xl md:leading-9">
            Where Notes, Projects, Research, Innovation, Careers, AI Tools
            and Technology Orbit Around Students.
          </p>

          {/* HERO BUTTONS */}
          <div className="relative z-10 flex w-full flex-wrap justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={goToNotes}
              className="cursor-pointer rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-6 py-3.5 text-sm font-semibold text-[#070B16] shadow-lg shadow-[#38DDF2]/10 transition duration-300 hover:scale-105 hover:brightness-110 sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Notes
            </button>

            <Link
              href="/blog"
              className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-[#E2EAF5] transition duration-300 hover:scale-105 hover:border-[#9B7BFF] hover:bg-[#9B7BFF]/10 sm:px-8 sm:py-4 sm:text-base"
            >
              Explore Insights
            </Link>
          </div>

          {/* SEARCH */}
          <motion.div
            animate={{
              y: searchActive ? -250 : 0,
              scale: searchActive ? 1.02 : 1,
            }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative mt-10 w-full max-w-2xl ${
              searchActive ? "z-[70]" : "z-10"
            }`}
          >
            {/* SEARCH INPUT */}
            <div
              className={`relative flex items-center rounded-2xl border bg-[#101725]/95 p-2 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-300 sm:rounded-full ${
                searchActive
                  ? "border-[#38DDF2]/60 shadow-[#38DDF2]/10"
                  : "border-white/15"
              }`}
            >
              <Search
                size={20}
                className="ml-3 shrink-0 text-[#94A9C5] sm:ml-4"
              />

              <input
                type="text"
                value={searchQuery}
                onFocus={openSearch}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setSearchActive(true);
                  setShowSuggestions(true);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") handleSearch();
                  if (event.key === "Escape") closeSearch();
                }}
                placeholder="Search subjects, notes, units..."
                aria-label="Search ELEVIT"
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#71829C] sm:px-4 sm:text-base"
              />

              {searchActive && (
                <button
                  type="button"
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#94A9C5] transition hover:bg-white/10 hover:text-white"
                >
                  ✕
                </button>
              )}

              <button
                type="button"
                onClick={() => handleSearch()}
                className="rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-4 py-3 text-sm font-semibold text-[#070B16] transition duration-300 hover:brightness-110 sm:rounded-full sm:px-6"
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight size={18} className="sm:hidden" />
              </button>
            </div>

            {/* SUGGESTIONS */}
            <AnimatePresence>
              {searchActive && showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full z-[80] mt-3 max-h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-[#101725]/[0.98] text-left shadow-2xl shadow-black/70 backdrop-blur-xl"
                >
                  <div className="border-b border-white/[0.07] px-5 py-3.5">
                    <p className="text-xs uppercase tracking-[0.22em] text-[#71829C]">
                      {searchQuery.trim()
                        ? "Matching content"
                        : "Explore subjects"}
                    </p>
                  </div>

                  {searchSuggestions.length > 0 ? (
                    searchSuggestions.map((item) => (
                      <button
                        key={`${item.semester}-${item.name}`}
                        type="button"
                        onClick={() =>
                          handleSuggestionClick(item.name)
                        }
                        className="group flex w-full items-center justify-between gap-4 border-b border-white/[0.04] px-5 py-4 text-left transition duration-200 hover:bg-[#141F32]"
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#E2EAF5] transition group-hover:text-[#38DDF2]">
                            {item.name}
                          </p>

                          <p className="mt-1 text-xs text-[#71829C]">
                            {item.semester}
                            {item.route ? "" : " • Notes Coming Soon"}
                          </p>
                        </div>

                        <ArrowRight
                          size={17}
                          className="shrink-0 text-[#71829C] transition group-hover:translate-x-1 group-hover:text-[#38DDF2]"
                        />
                      </button>
                    ))
                  ) : (
                    <div className="px-5 py-7">
                      <div className="flex items-center gap-3">
                        <Search size={18} className="text-[#71829C]" />
                        <p className="text-sm text-[#B4C5DC]">
                          No matching content found.
                        </p>
                      </div>

                      <p className="mt-2 pl-7 text-xs text-[#71829C]">
                        Try a subject name, keyword, abbreviation or
                        semester.
                      </p>
                    </div>
                  )}

                  <div className="border-t border-white/[0.07] px-5 py-2.5">
                    <p className="text-right text-[11px] text-[#71829C]">
                      Press Esc or ✕ to close
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {!searchActive && (
              <p className="mt-3 text-xs tracking-wide text-[#71829C]">
                Search subjects, units, notes and study resources
              </p>
            )}
          </motion.div>

          {/* LEARN BUILD GROW IDENTITY */}
          <div className="relative mt-20">
            <p className="text-xs font-medium tracking-[0.3em] text-[#94A9C5] sm:text-sm">
              ONE PLATFORM. ENDLESS POSSIBILITIES.
            </p>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Learn.
              <span className="text-[#38DDF2]"> Build.</span>
              <span className="bg-gradient-to-r from-[#4D9BF5] to-[#9B7BFF] bg-clip-text text-transparent">
                {" "}Grow.
              </span>
            </h2>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section className="relative bg-[#0A1020] px-5 pb-24 pt-20 sm:px-6 sm:pb-28 sm:pt-24">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#38DDF2]/30 to-transparent" />

          <div className="mx-auto max-w-7xl">
            {/* SECTION HEADING */}
            <div className="mb-14 text-center sm:mb-16">
              <p className="mb-4 text-xs font-semibold tracking-[0.28em] text-[#38DDF2]">
                EXPLORE WHAT'S POSSIBLE
              </p>

              <h2 className="mb-5 text-3xl font-bold tracking-tight text-[#F8FAFC] sm:text-4xl md:text-5xl">
                The ELEVIT Ecosystem
              </h2>

              <p className="mx-auto max-w-3xl text-sm leading-7 text-[#94A9C5] sm:text-base sm:leading-8">
                A student-centered space bringing learning, innovation,
                research, projects and career development together.
              </p>
            </div>

            {/* ECOSYSTEM CARDS */}
            <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* NOTES */}
              <button
                type="button"
                onClick={goToNotes}
                className="group rounded-3xl border border-white/[0.08] bg-[#101725] p-7 text-left transition duration-300 hover:-translate-y-2 hover:border-[#38DDF2]/50 hover:shadow-xl hover:shadow-[#38DDF2]/[0.06] sm:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.08]">
                  <BookOpen size={28} className="text-[#38DDF2]" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC]">
                  ELEVIT Notes
                </h3>

                <p className="text-sm leading-7 text-[#94A9C5] sm:text-base">
                  Semester-wise engineering notes, handwritten resources
                  and exam preparation materials.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#38DDF2]">
                  Explore Notes <ArrowRight size={16} />
                </div>
              </button>

              {/* INSIGHTS */}
              <Link
                href="/blog"
                className="group rounded-3xl border border-white/[0.08] bg-[#101725] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#9B7BFF]/50 hover:shadow-xl hover:shadow-[#9B7BFF]/[0.06] sm:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#9B7BFF]/15 bg-[#9B7BFF]/[0.08]">
                  <Newspaper size={28} className="text-[#9B7BFF]" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC]">
                  ELEVIT Insights
                </h3>

                <p className="text-sm leading-7 text-[#94A9C5] sm:text-base">
                  Engineering blogs, research articles, technology trends
                  and innovation insights.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#9B7BFF]">
                  Explore Insights <ArrowRight size={16} />
                </div>
              </Link>

              {/* LABS */}
              <Link
                href="/projects"
                className="group rounded-3xl border border-white/[0.08] bg-[#101725] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#4D9BF5]/50 hover:shadow-xl hover:shadow-[#4D9BF5]/[0.06] sm:p-8"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4D9BF5]/15 bg-[#4D9BF5]/[0.08]">
                  <Cpu size={28} className="text-[#4D9BF5]" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC]">
                  ELEVIT Labs
                </h3>

                <p className="text-sm leading-7 text-[#94A9C5] sm:text-base">
                  IoT systems, embedded projects, FPGA research, AI
                  hardware and engineering innovation.
                </p>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#4D9BF5]">
                  Explore Projects <ArrowRight size={16} />
                </div>
              </Link>

              {/* MEDIA */}
              <div className="group rounded-3xl border border-white/[0.08] bg-[#101725] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#38DDF2]/40 sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.08]">
                  <Video size={28} className="text-[#38DDF2]" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC]">
                  ELEVIT Media
                </h3>

                <p className="text-sm leading-7 text-[#94A9C5] sm:text-base">
                  Video explanations, tutorials, visual learning and
                  AI-powered education.
                </p>

                <span className="mt-6 inline-block text-xs font-semibold tracking-wider text-[#38DDF2]">
                  IN DEVELOPMENT
                </span>
              </div>

              {/* CAREERS */}
              <div className="group rounded-3xl border border-white/[0.08] bg-[#101725] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#9B7BFF]/40 sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#9B7BFF]/15 bg-[#9B7BFF]/[0.08]">
                  <Briefcase size={28} className="text-[#9B7BFF]" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC]">
                  ELEVIT Careers
                </h3>

                <p className="text-sm leading-7 text-[#94A9C5] sm:text-base">
                  Placement preparation, interview guidance and career
                  roadmaps.
                </p>

                <span className="mt-6 inline-block text-xs font-semibold tracking-wider text-[#9B7BFF]">
                  COMING SOON
                </span>
              </div>

              {/* RESOURCES */}
              <div className="group rounded-3xl border border-white/[0.08] bg-[#101725] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#4D9BF5]/40 sm:p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4D9BF5]/15 bg-[#4D9BF5]/[0.08]">
                  <FolderOpen size={28} className="text-[#4D9BF5]" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-[#F8FAFC]">
                  ELEVIT Resources
                </h3>

                <p className="text-sm leading-7 text-[#94A9C5] sm:text-base">
                  PDFs, cheat sheets, study materials and productivity
                  resources.
                </p>

                <span className="mt-6 inline-block text-xs font-semibold tracking-wider text-[#4D9BF5]">
                  EXPLORE THROUGH NOTES
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.07] bg-[#070B16] px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* BRAND */}
              <div>
                <Link
                  href="/"
                  className="text-2xl font-extrabold tracking-widest text-white"
                >
                  ELEVIT<span className="text-[#38DDF2]">.</span>
                </Link>

                <p className="mt-4 max-w-sm text-sm leading-7 text-[#94A9C5]">
                  A student-centered platform for engineering education,
                  innovation, research and technology.
                </p>

                <p className="mt-4 text-sm font-medium text-[#38DDF2]">
                  Learn. Build. Grow.
                </p>
              </div>

              {/* EXPLORE */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
                  Explore
                </h3>

                <div className="flex flex-col gap-3 text-sm text-[#94A9C5]">
                  <Link href="/about" className="transition hover:text-[#38DDF2]">
                    About ELEVIT
                  </Link>

                  <Link href="/notes" className="transition hover:text-[#38DDF2]">
                    Notes
                  </Link>

                  <Link href="/blog" className="transition hover:text-[#38DDF2]">
                    Insights
                  </Link>

                  <Link
                    href="/study-timer"
                    className="transition hover:text-[#38DDF2]"
                  >
                    Study Timer
                  </Link>
                </div>
              </div>

              {/* LEGAL & SUPPORT */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
                  Legal &amp; Support
                </h3>

                <div className="flex flex-col gap-3 text-sm text-[#94A9C5]">
                  <Link
                    href="/privacy-policy"
                    className="transition hover:text-[#38DDF2]"
                  >
                    Privacy Policy
                  </Link>

                  <Link
                    href="/terms"
                    className="transition hover:text-[#38DDF2]"
                  >
                    Terms &amp; Conditions
                  </Link>

                  <Link
                    href="/disclaimer"
                    className="transition hover:text-[#38DDF2]"
                  >
                    Disclaimer
                  </Link>

                  <Link
                    href="/contact"
                    className="transition hover:text-[#38DDF2]"
                  >
                    Contact Us
                  </Link>

                  <a
                    href="mailto:elevateorbit.contribute@gmail.com"
                    className="transition hover:text-[#38DDF2]"
                  >
                    Contributions
                  </a>

                  <Link
                    href="/admin/login"
                    className="mt-1 inline-flex w-fit items-center gap-2 text-xs text-[#71829C] transition hover:text-[#38DDF2]"
                  >
                    Admin Login
                  </Link>
                </div>
              </div>
            </div>

            {/* COPYRIGHT */}
            <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-6 text-center text-xs text-[#71829C] sm:flex-row">
              <p>
                © {new Date().getFullYear()} ELEVIT – Elevate Orbit.
                All rights reserved.
              </p>

              <p>
                Built for curious minds and future innovators.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}