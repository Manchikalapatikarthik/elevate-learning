"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Mail,
  LogIn,
  BookOpen,
  Upload,
  FileText,
} from "lucide-react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { signInWithGoogle } from "../../lib/studentAuth";

const EMAIL = "elevateorbit.contribute@gmail.com";

export default function ContributeWidget() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showContribution, setShowContribution] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState("");

  /*
   * =====================================================
   * AUTH STATE
   * =====================================================
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      /*
       * Nothing else is required here.
       * auth.currentUser is used whenever Contribute is clicked.
       */
    });

    return () => unsubscribe();
  }, []);

  /*
   * =====================================================
   * OPEN CONTRIBUTION FLOW
   * =====================================================
   */
  const openContributionFlow = useCallback(() => {
    setError("");

    /*
     * Already signed in
     * → open contribution directly
     */
    if (auth.currentUser) {
      setShowSignIn(false);
      setShowContribution(true);
      return;
    }

    /*
     * Not signed in
     * → show sign-in first
     */
    setShowContribution(false);
    setShowSignIn(true);
  }, []);

  /*
   * =====================================================
   * NAVBAR → CONTRIBUTION
   * =====================================================
   */
  useEffect(() => {
    window.addEventListener(
      "elevate:open-contribute",
      openContributionFlow
    );

    return () => {
      window.removeEventListener(
        "elevate:open-contribute",
        openContributionFlow
      );
    };
  }, [openContributionFlow]);

  /*
   * =====================================================
   * INTRO → CONTRIBUTION
   * =====================================================
   */
  useEffect(() => {
    window.addEventListener(
      "elevate:transition-complete",
      openContributionFlow
    );

    return () => {
      window.removeEventListener(
        "elevate:transition-complete",
        openContributionFlow
      );
    };
  }, [openContributionFlow]);

  /*
   * =====================================================
   * GOOGLE SIGN IN
   * =====================================================
   */
  const handleGoogleSignIn = async () => {
    try {
      setSigningIn(true);
      setError("");

      await signInWithGoogle();

      /*
       * Close sign-in popup
       */
      setShowSignIn(false);

      /*
       * Open contribution popup
       */
      setShowContribution(true);
    } catch (err) {
      console.error("Google sign-in error:", err);

      setError(
        "Google sign-in could not be completed. Please try again."
      );
    } finally {
      setSigningIn(false);
    }
  };

  /*
   * =====================================================
   * CLOSE
   * =====================================================
   */
  const closePopups = () => {
    setShowSignIn(false);
    setShowContribution(false);
    setError("");
  };

  return (
    <>
      {/* =====================================================
          SIGN IN POPUP
      ===================================================== */}
      <AnimatePresence>
        {showSignIn && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-white shadow-2xl"
            >
              {/* CLOSE */}
              <button
                type="button"
                onClick={closePopups}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* ICON */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-800 bg-black">
                <LogIn size={24} />
              </div>

              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-600">
                ELEVIT
              </p>

              <h2 className="text-2xl font-bold">
                Sign in to contribute
              </h2>

              <p className="mt-3 text-sm leading-6 text-zinc-500">
                Sign in with your Google account before
                submitting study resources to ELEVIT.
              </p>

              {/* GOOGLE */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={signingIn}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {signingIn ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Signing in...
                  </>
                ) : (
                  <>
                    {/* Google G */}
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.7 2.92-4.2 2.92-7.4Z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 21.6c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.6Z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.53 13.7A5.85 5.85 0 0 1 6.22 12c0-.59.11-1.16.31-1.7V7.78H3.29A9.6 9.6 0 0 0 2.4 12c0 1.52.36 2.95.89 4.22l3.24-2.52Z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 6.27c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.83 3.33 14.63 2.4 12 2.4a9.74 9.74 0 0 0-8.71 5.38l3.24 2.52C7.3 7.99 9.46 6.27 12 6.27Z"
                        fill="#EA4335"
                      />
                    </svg>

                    Continue with Google
                  </>
                )}
              </button>

              {error && (
                <p className="mt-4 text-center text-sm text-red-400">
                  {error}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          CONTRIBUTION POPUP
      ===================================================== */}
      <AnimatePresence>
        {showContribution && (
          <motion.div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-white shadow-2xl"
            >
              {/* CLOSE */}
              <button
                type="button"
                onClick={closePopups}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-900 hover:text-white"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* ICON */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-black">
                <BookOpen size={28} />
              </div>

              <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-600">
                ELEVIT Contribution
              </p>

              <h2 className="text-3xl font-bold">
                Help students learn
              </h2>

              <p className="mt-4 leading-7 text-zinc-500">
                Share useful notes, study material,
                question papers and other academic resources
                with the ELEVIT community.
              </p>

              {/* NOTES */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-black p-4">
                  <FileText
                    size={20}
                    className="text-zinc-400"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Notes & Study Material
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      PDFs, handwritten notes and resources
                    </p>
                  </div>
                </div>

                {/* QUESTION PAPERS */}
                <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-black p-4">
                  <Upload
                    size={20}
                    className="text-zinc-400"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Question Papers
                    </p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Previous papers and practice material
                    </p>
                  </div>
                </div>
              </div>

              {/* SEND EMAIL */}
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                  EMAIL
                )}&su=${encodeURIComponent(
                  "Contribution to Elevate Orbit"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 font-semibold text-black transition hover:bg-zinc-200"
              >
                <Mail size={19} />
                Send Contribution
              </a>

              <p className="mt-4 text-center text-xs text-zinc-600">
                Signed in as{" "}
                {auth.currentUser?.email ?? "your Google account"}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}