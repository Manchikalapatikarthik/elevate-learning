"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  /* =====================================================
     OPEN CONTRIBUTE POPUP
  ===================================================== */

  const openContribute = () => {
    window.dispatchEvent(
      new Event("elevate:open-contribute")
    );

    setMobileOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-[50] border-b border-zinc-900 bg-black/80 backdrop-blur-xl">

      {/* =================================================
          MAIN NAVBAR
      ================================================= */}

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          href="/home"
          className="group flex items-center"
        >
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent transition duration-300 group-hover:from-white group-hover:to-white">
            ELEVIT
          </span>
        </Link>

        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <div className="hidden items-center gap-7 md:flex">

          {/* HOME */}

          <Link
            href="/home"
            className="text-sm text-zinc-400 transition duration-200 hover:text-white"
          >
            Home
          </Link>

          {/* ABOUT */}

          <Link
            href="/about"
            className="text-sm text-zinc-400 transition duration-200 hover:text-white"
          >
            About
          </Link>

          {/* INSIGHTS */}

          <Link
            href="/blog"
            className="text-sm text-zinc-400 transition duration-200 hover:text-white"
          >
            Insights
          </Link>

          {/* PROJECTS */}

          <Link
            href="/projects"
            className="text-sm text-zinc-400 transition duration-200 hover:text-white"
          >
            Projects
          </Link>

          {/* NOTES */}

          <Link
            href="/notes"
            className="text-sm text-zinc-400 transition duration-200 hover:text-white"
          >
            Notes
          </Link>

          {/* =================================================
              CONTRIBUTE
          ================================================== */}

          <button
            type="button"
            onClick={
              openContribute
            }
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Contribute
          </button>

        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          aria-label="Toggle menu"
          aria-expanded={
            mobileOpen
          }
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-zinc-600 hover:text-white md:hidden"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      {mobileOpen && (
        <div className="border-t border-zinc-900 bg-black/95 px-5 pb-6 pt-4 backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-2">

            {/* HOME */}

            <Link
              href="/home"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Home
            </Link>

            {/* ABOUT */}

            <Link
              href="/about"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              About
            </Link>

            {/* INSIGHTS */}

            <Link
              href="/blog"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Insights
            </Link>

            {/* PROJECTS */}

            <Link
              href="/projects"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Projects
            </Link>

            {/* NOTES */}

            <Link
              href="/notes"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Notes
            </Link>

            {/* =================================================
                CONTRIBUTE
            ================================================== */}

            <button
              type="button"
              onClick={
                openContribute
              }
              className="mt-2 w-full rounded-xl border border-zinc-700 px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Contribute
            </button>

          </div>

        </div>
      )}

    </nav>
  );
}