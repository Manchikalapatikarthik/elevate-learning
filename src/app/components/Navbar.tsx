"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LogOut,
  UserCircle,
} from "lucide-react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "../../firebase";
import {
  signOutStudent,
} from "../../lib/studentAuth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const [profileOpen, setProfileOpen] =
    useState(false);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
        }
      );

    return () => unsubscribe();
  }, []);

  const openContribute = () => {
    window.dispatchEvent(
      new Event("elevate:open-contribute")
    );

    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOutStudent();

      setProfileOpen(false);
      setMobileOpen(false);
    } catch (error) {
      console.error(
        "Could not sign out:",
        error
      );
    }
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-[50] border-b border-zinc-900 bg-black/80 backdrop-blur-xl">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6">

        {/* LOGO */}
        <Link
          href="/home"
          className="group flex items-center"
        >
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent transition duration-300 group-hover:from-white group-hover:to-white">
            ELEVIT
          </span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden items-center gap-6 md:flex">

          <Link
            href="/home"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            About
          </Link>

          <Link
            href="/blog"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Insights
          </Link>

          <Link
            href="/projects"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Projects
          </Link>

          <Link
            href="/notes"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Notes
          </Link>

          <Link
            href="/study-timer"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Study Timer
          </Link>

          {/* CONTRIBUTE */}
          <button
            type="button"
            onClick={openContribute}
            className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
          >
            Contribute
          </button>

          {/* ACCOUNT */}
          {user ? (
            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setProfileOpen(
                    !profileOpen
                  )
                }
                aria-label="Open profile"
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-zinc-700 transition hover:border-white"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-white">
                    {(
                      user.displayName ||
                      user.email ||
                      "U"
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 w-72 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60">

                  {/* USER INFO */}
                  <div className="border-b border-zinc-800 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-800">

                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserCircle
                            size={25}
                            className="text-zinc-500"
                          />
                        )}

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-white">
                          {user.displayName ||
                            "ELEVIT Student"}
                        </p>

                        <p className="truncate text-xs text-zinc-600">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* MENU */}
                  <div className="p-2">

                    <Link
                      href="/dashboard"
                      onClick={() =>
                        setProfileOpen(false)
                      }
                      className="block rounded-xl px-3 py-3 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-white"
                    >
                      My Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
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
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Sign In
            </Link>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-300 transition hover:border-zinc-600 hover:text-white md:hidden"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="border-t border-zinc-900 bg-black/95 px-5 pb-6 pt-4 backdrop-blur-xl md:hidden">

          <div className="flex flex-col gap-2">

            <Link
              href="/home"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Home
            </Link>

            <Link
              href="/about"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              About
            </Link>

            <Link
              href="/blog"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Insights
            </Link>

            <Link
              href="/projects"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Projects
            </Link>

            <Link
              href="/notes"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Notes
            </Link>

            <Link
              href="/study-timer"
              onClick={() =>
                setMobileOpen(false)
              }
              className="rounded-xl px-4 py-3 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
            >
              Study Timer
            </Link>

            <button
              type="button"
              onClick={openContribute}
              className="mt-2 w-full rounded-xl border border-zinc-700 px-4 py-3 text-left text-sm font-medium text-white transition duration-300 hover:border-white hover:bg-white hover:text-black"
            >
              Contribute
            </button>

            {/* MOBILE ACCOUNT */}
            {user ? (
              <div className="mt-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-800">

                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold text-white">
                        {(
                          user.displayName ||
                          user.email ||
                          "U"
                        )
                          .charAt(0)
                          .toUpperCase()}
                      </span>
                    )}

                  </div>

                  <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-white">
                      {user.displayName ||
                        "ELEVIT Student"}
                    </p>

                    <p className="truncate text-xs text-zinc-600">
                      {user.email}
                    </p>

                  </div>

                </div>

                <Link
                  href="/dashboard"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="mt-4 block rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
                >
                  My Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 px-4 py-3 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>

              </div>
            ) : (
              <Link
                href="/login"
                onClick={() =>
                  setMobileOpen(false)
                }
                className="mt-2 rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black"
              >
                Sign In with Google
              </Link>
            )}

          </div>
        </div>
      )}

    </nav>
  );
}