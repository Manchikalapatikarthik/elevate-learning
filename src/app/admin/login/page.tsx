
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const idToken = await credential.user.getIdToken();

      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Unable to create admin session.");
      }

      router.replace("/admin");
    } catch (error) {
      console.error("Admin login error:", error);

      setError(
        "Login or admin session failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-3xl" />

      {/* MAIN CONTAINER */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >

          {/* BRAND */}

          <div className="mb-8 text-center">

            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
                <ShieldCheck
                  size={32}
                  className="text-white"
                />
              </div>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight">
              ELEVIT
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Elevate Orbit Administration
            </p>

          </div>

          {/* LOGIN CARD */}

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl shadow-black/50">

            <div className="mb-7">
              <h2 className="text-2xl font-bold">
                Admin Login
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Sign in to access the Elevate Orbit administration portal.
              </p>
            </div>

            {/* LOGIN FORM */}

            <form
              onSubmit={handleLogin}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="Enter admin email"
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
                />
              </div>

              {/* PASSWORD */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter admin password"
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500"
                />
              </div>

              {/* ERROR */}

              {error && (
                <div className="rounded-xl border border-red-900/50 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-white px-4 py-3.5 font-semibold text-black transition duration-300 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Login"}
              </button>

            </form>

            {/* BACK BUTTON */}

            <button
              onClick={() => router.push("/")}
              className="mt-6 w-full text-center text-sm text-zinc-500 transition hover:text-white"
            >
              ← Back to Elevate Orbit
            </button>

          </div>

          <p className="mt-6 text-center text-xs text-zinc-700">
            Authorized access only
          </p>

        </motion.div>

      </div>

    </main>
  );
}
