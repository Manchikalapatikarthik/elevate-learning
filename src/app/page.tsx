"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ShieldCheck, Orbit } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />

      {/* Orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-800"
      />

      {/* Second orbit ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-900"
      />

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl text-center">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <Orbit size={28} className="text-zinc-300" />

              <span className="text-sm uppercase tracking-[0.4em] text-zinc-500">
                Elevate Orbit
              </span>
            </div>

            <h1 className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent md:text-8xl">
              ELEVIT
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
              Where Notes, Projects, Research, Innovation, Careers,
              AI Tools and Technology Orbit Around Students.
            </p>
          </motion.div>

          {/* Selection heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
            }}
            className="mt-14"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
              Choose how you want to enter
            </p>
          </motion.div>

          {/* User + Admin */}
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 md:grid-cols-2">

            {/* USER */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <Link
                href="/home"
                className="group block rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-left transition duration-300 hover:-translate-y-2 hover:border-white hover:bg-zinc-900 hover:shadow-2xl hover:shadow-white/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-black">
                  <GraduationCap
                    size={28}
                    className="text-zinc-300 transition group-hover:text-white"
                  />
                </div>

                <h2 className="text-2xl font-bold">
                  Continue as User
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Explore notes, insights, projects, resources,
                  careers and the complete ELEVIT ecosystem.
                </p>

                <div className="mt-7 text-sm font-semibold text-white">
                  Enter ELEVIT
                  <span className="ml-2 transition-all duration-300 group-hover:ml-4">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* ADMIN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
              }}
            >
              <Link
                href="/admin/login"
                className="group block rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-left transition duration-300 hover:-translate-y-2 hover:border-white hover:bg-zinc-900 hover:shadow-2xl hover:shadow-white/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-black">
                  <ShieldCheck
                    size={28}
                    className="text-zinc-300 transition group-hover:text-white"
                  />
                </div>

                <h2 className="text-2xl font-bold">
                  Admin Login
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Access the secure Elevate Orbit administration
                  area and manage platform content.
                </p>

                <div className="mt-7 text-sm font-semibold text-white">
                  Admin Portal
                  <span className="ml-2 transition-all duration-300 group-hover:ml-4">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>

          </div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.9,
            }}
            className="mt-12 text-xs tracking-wide text-zinc-600"
          >
            © {new Date().getFullYear()} Elevate Orbit
          </motion.p>
        </div>
      </div>
    </main>
  );
}