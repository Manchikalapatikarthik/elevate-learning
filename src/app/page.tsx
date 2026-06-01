"use client";

import { useEffect, useState } from "react";
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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* INTRO SCREEN */}
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50 transition-opacity duration-1000 ${
          loading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >

        {/* Glow */}
        <div className="absolute w-[600px] h-[600px] bg-white/10 blur-3xl rounded-full animate-pulse"></div>

        {/* Logo */}
        <div className="relative text-center">

          <h1 className="text-7xl md:text-9xl font-extrabold tracking-wide bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent animate-logoZoom">
            Elevate
          </h1>

          <p className="text-gray-400 mt-6 text-xl tracking-[0.5em] uppercase animate-fadeUp">
            Learning Platform
          </p>

        </div>

      </div>

      {/* MAIN WEBSITE */}
      <main
        className={`min-h-screen bg-black text-white overflow-hidden transition-opacity duration-1000 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >

        <Navbar />

        {/* HERO SECTION */}
        <section className="relative flex flex-col items-center justify-center h-[85vh] text-center px-6 overflow-hidden">

          {/* Glow */}
          <div className="absolute w-[500px] h-[500px] bg-white/10 blur-3xl rounded-full"></div>

          <h1 className="relative text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Elevate Learning
          </h1>

          <p className="relative text-xl text-gray-300 max-w-3xl mb-10 leading-8">
            Empowering engineering students through AI, innovation,
            structured learning, and technical education.
          </p>

          <div className="relative flex gap-6">

            <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 hover:bg-gray-200 transition duration-300 shadow-2xl shadow-white/20">
              Explore Blog
            </button>

            <button className="border border-gray-600 px-8 py-4 rounded-full hover:bg-zinc-900 hover:scale-105 transition duration-300">
              Learn More
            </button>

          </div>

        </section>

        {/* ECOSYSTEM SECTION */}
        <section className="pb-32 px-6 bg-black">

          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">

              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Our Ecosystem
              </h2>

              <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-8">
                Elevate Learning is building a complete technology-driven
                educational ecosystem for engineering students.
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-8">

              {/* CARD 1 */}
              <a
                href="/notes"
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
              >
                <BookOpen size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  Elevate Notes
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Comprehensive engineering notes and exam-focused learning.
                </p>
              </a>

              {/* CARD 2 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">

                <Newspaper size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  Elevate Insights
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Technical blogs, engineering articles, and innovation insights.
                </p>
              </div>

              {/* CARD 3 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">

                <Cpu size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  Elevate Labs
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  IoT systems, ESP32 projects, robotics, and AI hardware.
                </p>
              </div>

              {/* CARD 4 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">

                <Video size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  Elevate Media
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  AI-powered video explanations and engineering tutorials.
                </p>
              </div>

              {/* CARD 5 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">

                <Briefcase size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  Elevate Careers
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  Placement preparation and interview guidance.
                </p>
              </div>

              {/* CARD 6 */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 transition duration-300">

                <FolderOpen size={42} className="mb-4 text-white" />

                <h3 className="text-3xl font-bold mb-4">
                  Elevate Resources
                </h3>

                <p className="text-gray-400 leading-8 text-lg">
                  PDFs, study materials, cheat sheets, and learning resources.
                </p>
              </div>

            </div>

          </div>

        </section>

      </main>
    </>
  );
}