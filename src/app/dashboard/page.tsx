"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  LogOut,
  Sparkles,
  Timer,
  Trophy,
} from "lucide-react";

import { auth, db } from "../../firebase";

import Navbar from "../components/Navbar";
import { signOutStudent } from "../../lib/studentAuth";

type StudentProfile = {
  uid: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
};

type StudySession = {
  id: string;
  subject: string;
  mode: string;
  durationMinutes: number;
  completedAt: string;
};

function convertFirestoreDate(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    return (
      value as { toDate: () => Date }
    ).toDate().toISOString();
  }

  if (typeof value === "string") {
    return value;
  }

  return new Date().toISOString();
}

function getStartOfToday() {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
}

function getStartOfWeek() {
  const date = new Date();
  const day = date.getDay();

  const daysFromMonday =
    day === 0 ? 6 : day - 1;

  date.setHours(0, 0, 0, 0);

  date.setDate(
    date.getDate() - daysFromMonday
  );

  return date;
}

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] =
    useState<User | null>(null);

  const [profile, setProfile] =
    useState<StudentProfile | null>(null);

  const [studySessions, setStudySessions] =
    useState<StudySession[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * AUTH + DATA
   */
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          if (!currentUser) {
            router.replace("/login");
            return;
          }

          try {
            setUser(currentUser);
            setError("");

            /*
             * Student profile
             */
            setProfile({
              uid: currentUser.uid,
              displayName:
                currentUser.displayName ||
                "",
              email:
                currentUser.email ||
                "",
              photoURL:
                currentUser.photoURL ||
                "",
            });

            /*
             * Study sessions
             */
            const sessionsRef =
              collection(
                db,
                "users",
                currentUser.uid,
                "studySessions"
              );

            const sessionsQuery =
              query(
                sessionsRef,
                orderBy(
                  "completedAt",
                  "desc"
                )
              );

            const snapshot =
              await getDocs(
                sessionsQuery
              );

            const sessions: StudySession[] =
              snapshot.docs.map(
                (document) => {
                  const data =
                    document.data();

                  return {
                    id: document.id,

                    subject:
                      typeof data.subject ===
                      "string"
                        ? data.subject
                        : "General Study",

                    mode:
                      typeof data.mode ===
                      "string"
                        ? data.mode
                        : "Pomodoro",

                    durationMinutes:
                      typeof data.durationMinutes ===
                      "number"
                        ? data.durationMinutes
                        : 0,

                    completedAt:
                      convertFirestoreDate(
                        data.completedAt
                      ),
                  };
                }
              );

            setStudySessions(
              sessions
            );
          } catch (err) {
            console.error(
              "Could not load dashboard:",
              err
            );

            setError(
              "Could not load your study data. Please refresh and try again."
            );
          } finally {
            setLoading(false);
          }
        }
      );

    return () => unsubscribe();
  }, [router]);

  /*
   * TODAY
   */
  const todayStudyMinutes =
    useMemo(() => {
      const today =
        getStartOfToday();

      return studySessions
        .filter(
          (session) =>
            new Date(
              session.completedAt
            ) >= today
        )
        .reduce(
          (
            total,
            session
          ) =>
            total +
            session.durationMinutes,
          0
        );
    }, [studySessions]);

  /*
   * THIS WEEK
   */
  const weekStudyMinutes =
    useMemo(() => {
      const startOfWeek =
        getStartOfWeek();

      return studySessions
        .filter(
          (session) =>
            new Date(
              session.completedAt
            ) >= startOfWeek
        )
        .reduce(
          (
            total,
            session
          ) =>
            total +
            session.durationMinutes,
          0
        );
    }, [studySessions]);

  /*
   * TOTAL
   */
  const totalStudyMinutes =
    useMemo(() => {
      return studySessions.reduce(
        (
          total,
          session
        ) =>
          total +
          session.durationMinutes,
        0
      );
    }, [studySessions]);

  /*
   * SUBJECT STATS
   */
  const subjectStats =
    useMemo(() => {
      const stats: Record<
        string,
        number
      > = {};

      studySessions.forEach(
        (session) => {
          stats[session.subject] =
            (stats[session.subject] ||
              0) +
            session.durationMinutes;
        }
      );

      return Object.entries(stats)
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 6);
    }, [studySessions]);

  /*
   * NAME
   */
  const displayName =
    profile?.displayName ||
    user?.displayName ||
    "ELEVIT Student";

  const firstName =
    displayName.split(" ")[0];

  /*
   * SIGN OUT
   */
  const handleSignOut = async () => {
    await signOutStudent();

    router.replace("/login");
  };

  /*
   * LOADING
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <Loader2
          size={28}
          className="animate-spin text-zinc-500"
        />
      </main>
    );
  }

  /*
   * AUTH SAFETY
   */
  if (!user) {
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

      <Navbar />

      {/* HERO */}
      <section className="px-6 pb-12 pt-32">
        <div className="mx-auto max-w-6xl">

          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            My ELEVIT
          </p>

          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Welcome, {firstName} 👋
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                Your personal learning space for
                study progress, notes, tests and
                ELEVIT AI.
              </p>
            </div>

            {/* PROFILE */}
            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-zinc-800 bg-zinc-950">

                {profile?.photoURL ? (
                  <img
                    src={profile.photoURL}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-bold">
                    {displayName
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                )}

              </div>

              <div className="min-w-0">

                <p className="truncate text-sm font-semibold text-white">
                  {displayName}
                </p>

                <p className="truncate text-xs text-zinc-600">
                  {profile?.email ||
                    user.email}
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <section className="px-6 pb-8">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-2xl border border-red-900/40 bg-red-950/20 px-5 py-4">
              <p className="text-sm text-red-300">
                {error}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* STATISTICS */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* TODAY */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

              <Clock3
                size={21}
                className="mb-5"
              />

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Today
              </p>

              <p className="mt-3 text-3xl font-bold">
                {todayStudyMinutes}

                <span className="ml-1 text-sm font-normal text-zinc-600">
                  min
                </span>
              </p>

            </div>

            {/* WEEK */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

              <BarChart3
                size={21}
                className="mb-5"
              />

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                This Week
              </p>

              <p className="mt-3 text-3xl font-bold">
                {weekStudyMinutes}

                <span className="ml-1 text-sm font-normal text-zinc-600">
                  min
                </span>
              </p>

            </div>

            {/* TOTAL */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

              <Timer
                size={21}
                className="mb-5"
              />

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Total Study
              </p>

              <p className="mt-3 text-3xl font-bold">
                {totalStudyMinutes}

                <span className="ml-1 text-sm font-normal text-zinc-600">
                  min
                </span>
              </p>

            </div>

            {/* SESSIONS */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

              <CheckCircle2
                size={21}
                className="mb-5"
              />

              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                Sessions
              </p>

              <p className="mt-3 text-3xl font-bold">
                {studySessions.length}
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* SUBJECT PROGRESS */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">

            <div className="mb-8">

              <div className="flex items-center gap-3">
                <BookOpen size={21} />

                <h2 className="text-2xl font-bold">
                  Subject-wise Study Time
                </h2>
              </div>

              <p className="mt-2 text-sm text-zinc-500">
                Your completed study time by subject.
              </p>

            </div>

            {subjectStats.length ===
            0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-black p-8 text-center">

                <p className="text-sm text-zinc-500">
                  Complete your first study session
                  to see your subject progress.
                </p>

              </div>
            ) : (
              <div className="space-y-4">

                {subjectStats.map(
                  (
                    [
                      subject,
                      minutes,
                    ],
                    index
                  ) => {

                    const maxMinutes =
                      subjectStats[0][1];

                    const percentage =
                      maxMinutes > 0
                        ? (minutes /
                            maxMinutes) *
                          100
                        : 0;

                    return (
                      <div
                        key={subject}
                        className="rounded-2xl border border-zinc-800 bg-black p-4"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div className="flex min-w-0 items-center gap-3">

                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-800 text-xs text-zinc-500">
                              {index + 1}
                            </span>

                            <span className="truncate text-sm font-medium text-white">
                              {subject}
                            </span>

                          </div>

                          <span className="shrink-0 text-sm text-zinc-400">
                            {minutes} min
                          </span>

                        </div>

                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-900">

                          <div
                            className="h-full rounded-full bg-white transition-all"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </div>
        </div>
      </section>

      {/* RECENT */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              History
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Recent Study Sessions
            </h2>
          </div>

          {studySessions.length ===
          0 ? (
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-10 text-center">

              <p className="text-sm text-zinc-500">
                No completed study sessions yet.
              </p>

            </div>
          ) : (
            <div className="space-y-3">

              {studySessions
                .slice(0, 10)
                .map(
                  (session) => (
                    <div
                      key={
                        session.id
                      }
                      className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >

                      <div>

                        <p className="text-sm font-semibold text-white">
                          {session.subject}
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {session.mode}
                          {" · "}
                          {new Date(
                            session.completedAt
                          ).toLocaleString()}
                        </p>

                      </div>

                      <div className="text-sm font-medium text-zinc-300">
                        {
                          session.durationMinutes
                        }{" "}
                        min
                      </div>

                    </div>
                  )
                )}

            </div>
          )}

        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">

          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              Learning
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Continue Learning
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            {/* TIMER */}
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/study-timer"
                )
              }
              className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-left transition duration-300 hover:border-zinc-600"
            >

              <Clock3 size={23} />

              <h3 className="mt-6 text-xl font-semibold">
                Study Timer
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Start another focused study
                session and continue building
                your history.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 transition group-hover:text-white">
                Start studying
                <ArrowRight size={16} />
              </div>

            </button>

            {/* NOTES */}
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/notes"
                )
              }
              className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-left transition duration-300 hover:border-zinc-600"
            >

              <BookOpen size={23} />

              <h3 className="mt-6 text-xl font-semibold">
                Explore Notes
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Browse subjects, notes and
                learning resources.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-zinc-400 transition group-hover:text-white">
                Explore notes
                <ArrowRight size={16} />
              </div>

            </button>

            {/* TESTS */}
            <button
              type="button"
              className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-left transition duration-300 hover:border-zinc-600"
            >

              <FileText size={23} />

              <h3 className="mt-6 text-xl font-semibold">
                My Tests
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Your ELEVIT AI tests and results
                will appear here.
              </p>

              <div className="mt-6 text-sm text-zinc-600">
                Coming soon
              </div>

            </button>

            {/* AI */}
            <button
              type="button"
              className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 text-left transition duration-300 hover:border-zinc-600"
            >

              <Sparkles size={23} />

              <h3 className="mt-6 text-xl font-semibold">
                ELEVIT AI
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Ask doubts, study from your
                material and generate
                personalized tests.
              </p>

              <div className="mt-6 text-sm text-zinc-600">
                Coming soon
              </div>

            </button>

          </div>
        </div>
      </section>

      {/* ACCOUNT */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
                  Account
                </p>

                <h2 className="mt-3 text-xl font-semibold">
                  {displayName}
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  {profile?.email ||
                    user.email}
                </p>

              </div>

              <button
                type="button"
                onClick={
                  handleSignOut
                }
                className="flex items-center justify-center gap-2 rounded-full border border-zinc-800 px-6 py-3 text-sm text-zinc-400 transition hover:border-zinc-600 hover:text-white"
              >
                <LogOut size={16} />
                Sign Out
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-900 px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm text-zinc-600">
            ELEVIT · My Learning Space
          </p>

        </div>
      </footer>

    </main>
  );
}