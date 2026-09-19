"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import {
  BookOpen,
  Newspaper,
  Cpu,
  Video,
  Briefcase,
  FolderOpen,
} from "lucide-react";

export default function Home() {
  const [phase, setPhase] = useState(1);

  /*
   * =========================
   * ELEVATE ORBIT INTRO TIMING
   * =========================
   *
   * Phase 1 → 0 to 2 seconds
   * Phase 2 → 2 to 4.5 seconds
   * Phase 3 → 4.5 to 7 seconds
   * Phase 4 → Homepage appears
   */

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase(2);
    }, 2000);

    const timer2 = setTimeout(() => {
      setPhase(3);
    }, 4500);

    const timer3 = setTimeout(() => {
      setPhase(4);
    }, 7000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  /*
   * =========================
   * OPEN CONTRIBUTION POPUP
   * =========================
   *
   * When phase reaches 4:
   * 1. Intro disappears
   * 2. Homepage fades in for 1 second
   * 3. Contribution popup opens
   */

  useEffect(() => {
    if (phase !== 4) return;

    const contributionTimer = setTimeout(() => {
      window.dispatchEvent(
        new Event("elevate:transition-complete")
      );
    }, 1000);

    return () => {
      clearTimeout(contributionTimer);
    };
  }, [phase]);

  return (
    <>
      {/* ==========================================
          ELEVATE ORBIT INTRO / TRANSITION
      =========================================== */}

      <AnimatePresence>
        {phase < 4 && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
          >
            {/* Background Glow */}
            <div className="absolute h-[700px] w-[700px] rounded-full bg-white/10 blur-3xl" />

            {/* ==================================
                PHASE 1
            =================================== */}

            {phase === 1 && (
              <div className="flex gap-24">
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

            {/* ==================================
                PHASE 2
            =================================== */}

            {phase === 2 && (
              <motion.h1
                initial={{
                  scale: 0.8,
                  opacity: 0,
                }}
                animate={{
                  scale: [0.95, 1.02, 1],
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

            {/* ==================================
                PHASE 3
            =================================== */}

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

      {/* ==========================================
          MAIN WEBSITE
      =========================================== */}

      <main
        className={`min-h-screen overflow-hidden bg-black text-white transition-opacity duration-1000 ${
          phase < 4 ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* NAVBAR */}
        <Navbar />

        {/* ==================================
            HERO SECTION
        =================================== */}

        <section className="relative flex h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
          {/* Glow */}
          <div className="absolute h-[600px] w-[600px] rounded-full bg-white/10 blur-3xl" />

          {/* Heading */}
          <h1 className="relative mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-6xl font-extrabold text-transparent md:text-8xl">
            ELEVATE ORBIT
          </h1>

          {/* Description */}
          <p className="relative mb-10 max-w-4xl text-xl leading-9 text-gray-300">
            Where Notes, Projects, Research, Innovation, Careers, AI Tools and
            Technology Orbit Around Students.
          </p>

          {/* Buttons */}
          <div className="relative flex gap-6">
            <a
              href="/notes"
              className="rounded-full bg-white px-8 py-4 font-semibold text-black shadow-2xl shadow-white/20 transition duration-300 hover:scale-105 hover:bg-gray-200"
            >
              Explore Notes
            </a>

            <a
              href="/blog"
              className="rounded-full border border-gray-600 px-8 py-4 transition duration-300 hover:scale-105 hover:bg-zinc-900"
            >
              Explore Insights
            </a>
          </div>
        </section>

        {/* ==================================
            ECOSYSTEM SECTION
        =================================== */}

        <section className="bg-black px-6 pb-32">
          <div className="mx-auto max-w-7xl">

            {/* Section Heading */}
            <div className="mb-20 text-center">
              <h2 className="mb-6 text-5xl font-bold md:text-6xl">
                The ELEVIT Ecosystem
              </h2>

              <p className="mx-auto max-w-4xl text-lg leading-8 text-gray-400">
                A complete student-centered ecosystem where learning,
                innovation, research, projects, career development, and
                technology resources come together.
              </p>
            </div>

            {/* Ecosystem Cards */}
            <div className="grid gap-8 md:grid-cols-3">

              {/* ================= NOTES ================= */}

              <a
                href="/notes"
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10"
              >
                <BookOpen
                  size={42}
                  className="mb-4 text-white"
                />

                <h3 className="mb-4 text-3xl font-bold">
                  ELEVIT Notes
                </h3>

                <p className="text-lg leading-8 text-gray-400">
                  Semester-wise engineering notes, handwritten resources and
                  exam preparation.
                </p>
              </a>

              {/* ================= INSIGHTS ================= */}

              <a
                href="/blog"
                className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10"
              >
                <Newspaper
                  size={42}
                  className="mb-4 text-white"
                />

                <h3 className="mb-4 text-3xl font-bold">
                  ELEVIT Insights
                </h3>

                <p className="text-lg leading-8 text-gray-400">
                  Engineering blogs, research articles, technology trends and
                  innovation insights.
                </p>
              </a>

              {/* ================= LABS ================= */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10">
                <Cpu
                  size={42}
                  className="mb-4 text-white"
                />

                <h3 className="mb-4 text-3xl font-bold">
                  ELEVIT Labs
                </h3>

                <p className="text-lg leading-8 text-gray-400">
                  IoT systems, embedded projects, FPGA research, AI hardware
                  and innovation.
                </p>
              </div>

              {/* ================= MEDIA ================= */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10">
                <Video
                  size={42}
                  className="mb-4 text-white"
                />

                <h3 className="mb-4 text-3xl font-bold">
                  ELEVIT Media
                </h3>

                <p className="text-lg leading-8 text-gray-400">
                  Video explanations, tutorials, visual learning and AI-powered
                  education.
                </p>
              </div>

              {/* ================= CAREERS ================= */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10">
                <Briefcase
                  size={42}
                  className="mb-4 text-white"
                />

                <h3 className="mb-4 text-3xl font-bold">
                  ELEVIT Careers
                </h3>

                <p className="text-lg leading-8 text-gray-400">
                  Placement preparation, interview guidance and career
                  roadmaps.
                </p>
              </div>

              {/* ================= RESOURCES ================= */}

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 transition duration-300 hover:-translate-y-3 hover:border-white hover:shadow-2xl hover:shadow-white/10">
                <FolderOpen
                  size={42}
                  className="mb-4 text-white"
                />

                <h3 className="mb-4 text-3xl font-bold">
                  ELEVIT Resources
                </h3>

                <p className="text-lg leading-8 text-gray-400">
                  PDFs, cheat sheets, study materials and productivity
                  resources.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}