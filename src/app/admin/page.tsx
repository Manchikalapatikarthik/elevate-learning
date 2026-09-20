"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { auth } from "../../firebase";
import { ADMIN_UID } from "../../lib/admin";

export default function AdminDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // No user is logged in
      if (!currentUser) {
        router.replace("/admin/login");
        return;
      }

      // User is logged in, but is not the admin
      if (currentUser.uid !== ADMIN_UID) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      // Correct admin user
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-zinc-500">
          Checking administrator access...
        </p>
      </main>
    );
  }

  /* =========================
     UNAUTHORIZED
  ========================= */

  if (unauthorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <ShieldCheck
            size={42}
            className="mx-auto mb-5 text-red-400"
          />

          <h1 className="text-2xl font-bold">
            Access Denied
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-500">
            This account is not authorized to access the
            Elevate Orbit administration portal.
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 w-full rounded-xl bg-white px-4 py-3 font-semibold text-black transition hover:bg-zinc-200"
          >
            Return to Admin Login
          </button>
        </div>
      </main>
    );
  }

  /* =========================
     ADMIN DASHBOARD
  ========================= */

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HEADER */}
      <header className="border-b border-zinc-900 bg-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-extrabold tracking-wide">
              ELEVIT
            </h1>

            <p className="text-xs text-zinc-500">
              Elevate Orbit Administration
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-white hover:text-white"
          >
            <LogOut size={16} />
            Logout
          </button>

        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* WELCOME */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-600">
            Admin Portal
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Welcome to Elevate Orbit
          </h2>

          <p className="mt-3 text-zinc-500">
            Signed in as {user?.email}
          </p>
        </div>

        {/* CARDS */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* DASHBOARD */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
            <LayoutDashboard
              size={30}
              className="mb-5 text-white"
            />

            <h3 className="text-xl font-bold">
              Dashboard
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              View the current state of your Elevate Orbit platform.
            </p>
          </div>

          {/* NOTES */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
            <FileText
              size={30}
              className="mb-5 text-white"
            />

            <h3 className="text-xl font-bold">
              Notes
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Manage subjects, notes and study resources.
            </p>
          </div>

          {/* UPLOADS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
            <Upload
              size={30}
              className="mb-5 text-white"
            />

            <h3 className="text-xl font-bold">
              Uploads
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Manage resources contributed by users.
            </p>
          </div>

          {/* CONTRIBUTIONS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
            <MessageSquare
              size={30}
              className="mb-5 text-white"
            />

            <h3 className="text-xl font-bold">
              Contributions
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Review suggestions, feedback and community contributions.
            </p>
          </div>

          {/* SETTINGS */}
          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-7">
            <Settings
              size={30}
              className="mb-5 text-white"
            />

            <h3 className="text-xl font-bold">
              Settings
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-500">
              Manage platform settings and administration options.
            </p>
          </div>

        </div>

        {/* CMS */}
        <div className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-950 p-8">

          <p className="text-sm uppercase tracking-[0.25em] text-zinc-600">
            Next Stage
          </p>

          <h3 className="mt-3 text-2xl font-bold">
            Elevate Orbit CMS
          </h3>

          <p className="mt-3 max-w-2xl leading-7 text-zinc-500">
            Soon you will be able to manage homepage content,
            notes, announcements, resources and contributions
            from this dashboard without editing your website code.
          </p>

        </div>

      </div>
    </main>
  );
}