
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LogOut,
  UserCircle,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "../../firebase";
import { signOutStudent } from "../../lib/studentAuth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const openContribute = () => {
    window.dispatchEvent(new Event("elevate:open-contribute"));
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOutStudent();
      setProfileOpen(false);
      setMobileOpen(false);
    } catch (error) {
      console.error("Could not sign out:", error);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
    { label: "Projects", href: "/projects" },
    { label: "Notes", href: "/notes" },
    { label: "Study Timer", href: "/study-timer" },
  ];

  return (
    <nav className="fixed left-0 right-0 top-0 z-[50] border-b border-white/[0.07] bg-[#070B16]/85 backdrop-blur-2xl">

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-10">

        {/* LOGO */}
        <Link
          href="/"
          className="group flex items-center"
          onClick={() => {
            setMobileOpen(false);
            setProfileOpen(false);
          }}
        >
          <span className="bg-gradient-to-r from-white via-[#C8D8ED] to-[#38DDF2] bg-clip-text text-2xl font-extrabold tracking-[0.14em] text-transparent transition duration-300 group-hover:from-[#38DDF2] group-hover:to-[#9B7BFF]">
            ELEVIT
            <span className="text-[#38DDF2]">.</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#94A9C5] transition duration-200 hover:text-[#38DDF2]"
            >
              {link.label}
            </Link>
          ))}

          {/* CONTRIBUTE */}
          <button
            type="button"
            onClick={openContribute}
            className="rounded-full border border-white/15 px-5 py-2.5 text-[13px] font-medium text-[#E2E8F0] transition duration-300 hover:border-[#38DDF2]/60 hover:bg-[#38DDF2]/[0.07] hover:text-[#38DDF2]"
          >
            Contribute
          </button>

          {/* ACCOUNT */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="Open profile"
                aria-expanded={profileOpen}
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#141722] transition hover:border-[#38DDF2]"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#38DDF2]">
                    {(user.displayName || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-white/10 bg-[#101725] shadow-2xl shadow-black/50">

                  <div className="border-b border-white/[0.07] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[#141722]">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserCircle
                            size={25}
                            className="text-[#38DDF2]"
                          />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">
                          {user.displayName || "ELEVIT Student"}
                        </p>
                        <p className="truncate text-xs text-[#94A9C5]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm text-[#94A9C5] transition hover:bg-white/[0.05] hover:text-[#38DDF2]"
                    >
                      My Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm text-[#94A9C5] transition hover:bg-white/[0.05] hover:text-[#38DDF2]"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-5 py-2.5 text-[13px] font-semibold text-[#070B16] transition duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#B4C5DC] transition hover:border-[#38DDF2]/50 hover:text-[#38DDF2] lg:hidden"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <div className="border-t border-white/[0.07] bg-[#070B16]/[0.98] px-5 pb-6 pt-4 backdrop-blur-2xl lg:hidden">

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-[#B4C5DC] transition hover:bg-[#141722] hover:text-[#38DDF2]"
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={openContribute}
              className="mt-2 rounded-xl border border-[#38DDF2]/25 px-4 py-3 text-left text-sm font-medium text-[#38DDF2] transition hover:bg-[#38DDF2]/[0.07]"
            >
              Contribute
            </button>

            {/* MOBILE ACCOUNT */}
            {user ? (
              <div className="mt-3 rounded-2xl border border-white/10 bg-[#141722] p-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-[#38DDF2]">
                        {(user.displayName || user.email || "U")
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {user.displayName || "ELEVIT Student"}
                    </p>
                    <p className="truncate text-xs text-[#94A9C5]">
                      {user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 block rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-4 py-3 text-center text-sm font-semibold text-[#070B16]"
                >
                  My Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2]"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="mt-3 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-4 py-3 text-center text-sm font-semibold text-[#070B16]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
