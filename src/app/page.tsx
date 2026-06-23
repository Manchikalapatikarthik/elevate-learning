"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
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
  

  useEffect(() => {
  const introPlayed = localStorage.getItem("introPlayed");

  if (introPlayed === "true") {
    setPhase(4);
    return;
  }

  const timer1 = setTimeout(() => {
    setPhase(2);
  }, 2000);

  const timer2 = setTimeout(() => {
    setPhase(3);
  }, 4500);

  const timer3 = setTimeout(() => {
    setPhase(4);
    localStorage.setItem("introPlayed", "true");
  }, 7000);

  return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
  };
}, []);

  return (
  <>
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
        >
          <div className="absolute w-[700px] h-[700px] bg-white/10 blur-3xl rounded-full" />

          {phase === 1 && (
            <div className="flex gap-24">

              <motion.h1
                initial={{ x: -400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="text-4xl md:text-6xl font-extrabold text-white"
              >
                ELEVATE
              </motion.h1>

              <motion.h1
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="text-4xl md:text-6xl font-extrabold text-white"
              >
                ORBIT
              </motion.h1>

            </div>
          )}

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
              className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent"
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
              transition={{
                duration: 2,
                ease: "easeInOut",
              }}
              className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent"
            >
              ELEVIT
            </motion.h1>
          )}

        </motion.div>
      )}
    </AnimatePresence>

    {/* MAIN WEBSITE */}
    <main
      className={`min-h-screen bg-black text-white overflow-hidden transition-opacity duration-1000 ${
        phase < 4 ? "opacity-0" : "opacity-100"
      }`}
    >
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center h-[85vh] text-center px-6 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-white/10 blur-3xl rounded-full"></div>

          <h1 className="relative text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            ELEVATE ORBIT
          </h1>

          <p className="relative text-xl text-gray-300 max-w-4xl mb-10 leading-9">
            Where Notes, Projects, Research, Innovation,
            Careers, AI Tools and Technology
            Orbit Around Students.
          </p>

          <div className="relative flex gap-6">
            <a
              href="/notes"
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 hover:bg-gray-200 transition duration-300 shadow-2xl shadow-white/20"
            >
              Explore Notes
            </a>

            <a
              href="/blog"
              className="border border-gray-600 px-8 py-4 rounded-full hover:bg-zinc-900 hover:scale-105 transition duration-300"
            >
              Explore Insights
            </a>
          </div>
        </section>

        {/* ECOSYSTEM SECTION */}
        <section className="pb-32 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                The ELEVIT Ecosystem
              </h2>

              <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-8">
                A complete student-centered ecosystem where learning,
                innovation, research, projects, career development,
                and technology resources come together.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* NOTES */}
              <a
                href="/notes"
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
              >
                <BookOpen size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  ELEVIT Notes
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Semester-wise engineering notes,
                  handwritten resources and exam preparation.
                </p>
              </a>

              {/* INSIGHTS */}
              <a
                href="/blog"
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
              >
                <Newspaper size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  ELEVIT Insights
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Engineering blogs, research articles,
                  technology trends and innovation insights.
                </p>
              </a>

              {/* LABS */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">
                <Cpu size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  ELEVIT Labs
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  IoT systems, embedded projects,
                  FPGA research, AI hardware and innovation.
                </p>
              </div>

              {/* MEDIA */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">
                <Video size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  ELEVIT Media
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Video explanations, tutorials,
                  visual learning and AI-powered education.
                </p>
              </div>

              {/* CAREERS */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">
                <Briefcase size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  ELEVIT Careers
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Placement preparation,
                  interview guidance and career roadmaps.
                </p>
              </div>

              {/* RESOURCES */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">
                <FolderOpen size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  ELEVIT Resources
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
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