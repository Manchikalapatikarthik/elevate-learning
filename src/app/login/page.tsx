
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  LogOut,
  Loader2,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import { auth } from "../../firebase";
import {
  signInWithGoogle,
  signOutStudent,
} from "../../lib/studentAuth";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setCheckingAuth(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError("");

      const signedInUser = await signInWithGoogle();

      setUser(signedInUser);
      router.replace("/home");
    } catch (err: unknown) {
      console.error("Google sign-in error:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err
      ) {
        const code = String(
          (err as { code: unknown }).code
        );

        if (code === "auth/popup-closed-by-user") {
          setError("The Google sign-in window was closed.");
        } else if (code === "auth/popup-blocked") {
          setError(
            "Your browser blocked the Google sign-in popup. Please allow popups for ELEVIT."
          );
        } else if (code === "auth/unauthorized-domain") {
          setError(
            "This website domain is not authorized in Firebase."
          );
        } else if (
          code === "auth/account-exists-with-different-credential"
        ) {
          setError(
            "An account already exists with this email using a different sign-in method."
          );
        } else {
          setError(
            "Google sign-in could not be completed. Please try again."
          );
        }
      } else {
        setError(
          "Google sign-in could not be completed. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      setError("");

      await signOutStudent();
      setUser(null);
    } catch (err) {
      console.error("Sign out error:", err);
      setError("Could not sign out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070B16]">
        <Loader2
          size={30}
          className="animate-spin text-[#38DDF2]"
        />
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070B16] px-5 py-12 text-[#F8FAFC]">

      {/* BACKGROUND GLOWS */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/15 blur-[140px]" />

      <div className="pointer-events-none absolute left-[10%] top-[15%] h-48 w-48 rounded-full bg-[#38DDF2]/[0.07] blur-[100px]" />

      <div className="pointer-events-none absolute bottom-[10%] right-[10%] h-52 w-52 rounded-full bg-[#9B7BFF]/[0.08] blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">

        {/* BRAND */}
        <div className="mb-9 text-center">

          <button
            type="button"
            onClick={() => router.push("/")}
            className="mx-auto mb-7 flex items-center justify-center"
          >
            <span className="bg-gradient-to-r from-white via-[#C8D8ED] to-[#38DDF2] bg-clip-text text-3xl font-extrabold tracking-[0.16em] text-transparent">
              ELEVIT<span className="text-[#38DDF2]">.</span>
            </span>
          </button>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/[0.06] px-4 py-2 text-[11px] font-medium tracking-[0.2em] text-[#38DDF2]">
            <Sparkles size={13} />
            YOUR LEARNING JOURNEY
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome to your
            <span className="block mt-2 bg-gradient-to-r from-[#38DDF2] via-[#4D9BF5] to-[#9B7BFF] bg-clip-text text-transparent">
              ELEVIT Orbit.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#94A9C5]">
            Sign in to connect your learning journey and
            keep your study experience associated with
            your personal account.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded-[28px] border border-white/[0.09] bg-[#101725]/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">

          {user ? (
            <>
              {/* ALREADY SIGNED IN */}
              <div className="text-center">

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#38DDF2]/30 bg-[#141F32] shadow-lg shadow-[#38DDF2]/10">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-[#38DDF2]">
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

                <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#38DDF2]">
                  <ShieldCheck size={15} />
                  Already signed in
                </div>

                <h2 className="text-xl font-semibold text-white">
                  {user.displayName || "ELEVIT Student"}
                </h2>

                <p className="mt-2 break-all text-sm text-[#94A9C5]">
                  {user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => router.push("/home")}
                className="mt-8 w-full rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-5 py-4 text-sm font-semibold text-[#070B16] shadow-lg shadow-[#38DDF2]/10 transition hover:scale-[1.02] hover:brightness-110"
              >
                Continue to ELEVIT →
              </button>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-5 py-4 text-sm text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <LogOut size={17} />
                )}

                Sign out and use another account
              </button>
            </>
          ) : (
            <>
              {/* LOGIN HEADING */}
              <div className="mb-7">
                <h2 className="text-xl font-semibold text-white">
                  Sign in to continue
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#94A9C5]">
                  Use your Google account to access ELEVIT.
                </p>
              </div>

              {/* GOOGLE SIGN IN */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#F8FAFC] px-5 py-4 text-sm font-semibold text-[#070B16] shadow-lg transition duration-300 hover:scale-[1.02] hover:bg-[#E2EAF5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.26 5.64c4.24-3.91 6.5-9.67 6.5-17.29z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.9-5.79l-7.26-5.64c-2.02 1.35-4.6 2.15-8.64 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                  </svg>
                )}

                {loading
                  ? "Signing in..."
                  : "Continue with Google"}
              </button>

              {/* ACCOUNT INFORMATION */}
              <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#070B16]/70 p-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-[#38DDF2]"
                  />

                  <p className="text-xs leading-6 text-[#94A9C5]">
                    Your ELEVIT account is associated with
                    your Google account. Your future study
                    progress and learning activity can be
                    connected to your personal account.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ERROR */}
          {error && (
            <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3">
              <p className="text-sm leading-6 text-red-300">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* BACK TO HOME */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mx-auto mt-8 flex items-center gap-2 text-sm text-[#71829C] transition hover:text-[#38DDF2]"
        >
          <ArrowLeft size={16} />
          Back to ELEVIT
        </button>

        <p className="mt-8 text-center text-xs tracking-wide text-[#64748B]">
          LEARN. BUILD. GROW.
        </p>
      </div>
    </main>
  );
}
