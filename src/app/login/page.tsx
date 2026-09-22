"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  LogOut,
  Loader2,
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
      console.error(
        "Google sign-in error:",
        err
      );

      if (
        typeof err === "object" &&
        err !== null &&
        "code" in err
      ) {
        const code = String(
          (err as { code: unknown }).code
        );

        if (
          code ===
          "auth/popup-closed-by-user"
        ) {
          setError(
            "The Google sign-in window was closed."
          );
        } else if (
          code === "auth/popup-blocked"
        ) {
          setError(
            "Your browser blocked the Google sign-in popup. Please allow popups for ELEVIT."
          );
        } else if (
          code === "auth/unauthorized-domain"
        ) {
          setError(
            "This website domain is not authorized in Firebase."
          );
        } else if (
          code ===
          "auth/account-exists-with-different-credential"
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
      console.error(
        "Sign out error:",
        err
      );

      setError(
        "Could not sign out. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2
          size={28}
          className="animate-spin text-zinc-500"
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          {/* BRAND */}
          <div className="mb-10 text-center">

            <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
              <span className="text-2xl font-extrabold">
                E
              </span>
            </div>

            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
              Welcome to
            </p>

            <h1 className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent">
              ELEVIT
            </h1>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-zinc-500">
              Sign in to save your study progress,
              test results and future ELEVIT AI
              activity to your personal account.
            </p>

          </div>

          {/* CARD */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-8">

            {user ? (
              <>
                {/* ALREADY SIGNED IN */}
                <div className="text-center">

                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-black">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-xl font-bold">
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

                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                    Already signed in
                  </p>

                  <h2 className="mt-3 text-xl font-semibold text-white">
                    {user.displayName ||
                      "ELEVIT Student"}
                  </h2>

                  <p className="mt-2 break-all text-sm text-zinc-500">
                    {user.email}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/home")
                  }
                  className="mt-8 w-full rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Continue to ELEVIT
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-800 px-5 py-4 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                  ) : (
                    <LogOut size={17} />
                  )}

                  Sign out and use another account
                </button>
              </>
            ) : (
              <>
                {/* GOOGLE BUTTON */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2
                      size={19}
                      className="animate-spin"
                    />
                  ) : (
                    <span className="text-lg font-bold">
                      G
                    </span>
                  )}

                  {loading
                    ? "Signing in..."
                    : "Continue with Google"}
                </button>

                <div className="mt-7 rounded-2xl border border-zinc-800 bg-black p-4">
                  <p className="text-xs leading-5 text-zinc-600">
                    Your ELEVIT account will be
                    associated with your Google
                    account. Your future study
                    progress and learning activity
                    can then be connected to your
                    personal account.
                  </p>
                </div>
              </>
            )}

            {/* ERROR */}
            {error && (
              <div className="mt-4 rounded-2xl border border-red-900/40 bg-red-950/20 px-4 py-3">
                <p className="text-sm leading-6 text-red-300">
                  {error}
                </p>
              </div>
            )}

          </div>

          {/* BACK */}
          <button
            type="button"
            onClick={() =>
              router.push("/home")
            }
            className="mx-auto mt-8 flex items-center gap-2 text-sm text-zinc-600 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to ELEVIT
          </button>

        </div>
      </div>
    </main>
  );
}