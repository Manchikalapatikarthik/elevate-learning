"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [showContribute, setShowContribute] = useState(false);

  useEffect(() => {
    // Show "Contribute" in the navbar after the popup is closed
    const handleContributeClosed = () => {
      setShowContribute(true);
    };

    window.addEventListener(
      "elevate:contribute-closed",
      handleContributeClosed
    );

    return () => {
      window.removeEventListener(
        "elevate:contribute-closed",
        handleContributeClosed
      );
    };
  }, []);

  const openContribution = () => {
    // Remove the navbar button while popup is open
    setShowContribute(false);

    // Tell the contribution widget to open
    window.dispatchEvent(
      new Event("elevate:open-contribute")
    );
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* ================= LOGO ================= */}
        <Link
          href="/"
          className="flex flex-col"
        >
          <span className="text-3xl font-extrabold text-white tracking-wider">
            ELEVIT
          </span>

          <span className="text-xs text-gray-400 tracking-wide">
            by Elevate Orbit
          </span>
        </Link>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex items-center gap-8 text-sm md:text-base">

          <Link
            href="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            About
          </Link>

          <Link
            href="/blog"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Insights
          </Link>

          <Link
            href="/projects"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Projects
          </Link>

          <Link
            href="/notes"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Notes
          </Link>

          <Link
            href="/upload"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Upload
          </Link>

          <Link
            href="/contact"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Contact
          </Link>

          {/* ================= CONTRIBUTE ================= */}
          {showContribute && (
            <button
              onClick={openContribution}
              className="text-gray-300 hover:text-white transition duration-300"
            >
              Contribute
            </button>
          )}

        </nav>
      </div>
    </header>
  );
}