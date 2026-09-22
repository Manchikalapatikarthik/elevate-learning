"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  Clock3,
  BarChart3,
  BookOpen,
  Loader2,
} from "lucide-react";

import {
  onAuthStateChanged,
  User,
} from "firebase/auth";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";

import { auth, db } from "../../firebase";
import Navbar from "../components/Navbar";

type TimerMode = {
  name: string;
  minutes: number;
  description: string;
};

type StudySession = {
  id: string;
  subject: string;
  mode: string;
  durationMinutes: number;
  completedAt: string;
};

const TIMER_MODES: TimerMode[] = [
  {
    name: "Pomodoro",
    minutes: 25,
    description: "25 minutes focused study",
  },
  {
    name: "Deep Study",
    minutes: 50,
    description: "50 minutes focused study",
  },
  {
    name: "Custom",
    minutes: 30,
    description: "Set your own study duration",
  },
];

const SUBJECTS = [
  "Matrices and Calculus",
  "Physics",
  "Engineering Drawing and Design",
  "Electrical Technology",
  "Problem Solving Techniques using C",
  "Electronic Devices",
  "Technical English",
  "Advanced Calculus and Statistics",
  "Chemistry",
  "Electrical Circuits and Network Analysis",
  "Python Programming",
  "Digital Logic Circuits",
  "Transform Techniques and Complex Analysis",
  "Electronic Circuits",
  "Signals and Systems",
  "Electromagnetic Field Theory",
  "Data Structures using C",
  "Universal Human Values",
  "Fourier Series and Numerical Methods",
  "Probability and Random Process",
  "Analog Integrated Circuits",
  "Analog and Digital Communication",
  "Digital Signal Processing",
  "Design Thinking and Innovations",
  "Smart Antenna Systems",
  "CMOS VLSI Design",
  "Control Systems",
  "Microprocessor and Microcontroller",
  "Industry 5.0 for Electronics Engineers",
  "Computer Networks",
  "HDL Digital Design",
  "Embedded Systems",
  "Microwave and Optical Communication",
  "Cognitive IoT",
  "Project Work Phase I",
  "Professional Elective 5",
  "Professional Elective 6",
  "Project Work Phase II",
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function getStartOfToday() {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
}

function getStartOfWeek() {
  const date = new Date();
  const day = date.getDay();

  const daysFromMonday = day === 0 ? 6 : day - 1;

  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - daysFromMonday);

  return date;
}

function convertFirestoreDate(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate ===
      "function"
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

export default function StudyTimerPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [mode, setMode] = useState("Pomodoro");
  const [customMinutes, setCustomMinutes] = useState(30);
  const [selectedSubject, setSelectedSubject] = useState("");

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [sessionSeconds, setSessionSeconds] = useState(0);

  const [studySessions, setStudySessions] =
    useState<StudySession[]>([]);

  const [loadingSessions, setLoadingSessions] =
    useState(true);

  const [savingSession, setSavingSession] =
    useState(false);

  const [clearingHistory, setClearingHistory] =
    useState(false);

  const [error, setError] = useState("");

  const [showCelebration, setShowCelebration] =
    useState(false);

  const completionHandledRef =
    useRef(false);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const currentDuration = useMemo(() => {
    if (mode === "Custom") {
      return customMinutes;
    }

    return (
      TIMER_MODES.find(
        (item) => item.name === mode
      )?.minutes ?? 25
    );
  }, [mode, customMinutes]);

  /*
   * -----------------------------------------
   * AUTHENTICATION
   * -----------------------------------------
   */
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setAuthChecking(false);

          if (!currentUser) {
            router.replace("/login");
          }
        }
      );

    return () => unsubscribe();
  }, [router]);

  /*
   * -----------------------------------------
   * LOAD THIS USER'S STUDY SESSIONS
   * -----------------------------------------
   */
  useEffect(() => {
    if (!user) return;

    const loadStudySessions = async () => {
      try {
        setLoadingSessions(true);
        setError("");

        const sessionsRef = collection(
          db,
          "users",
          user.uid,
          "studySessions"
        );

        const sessionsQuery = query(
          sessionsRef,
          orderBy("completedAt", "desc")
        );

        const snapshot =
          await getDocs(sessionsQuery);

        const sessions: StudySession[] =
          snapshot.docs.map((document) => {
            const data = document.data();

            return {
              id: document.id,

              subject:
                typeof data.subject === "string"
                  ? data.subject
                  : "General Study",

              mode:
                typeof data.mode === "string"
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
          });

        setStudySessions(sessions);
      } catch (err) {
        console.error(
          "Could not load study sessions:",
          err
        );

        setError(
          "Could not load your study history. Please refresh and try again."
        );
      } finally {
        setLoadingSessions(false);
      }
    };

    loadStudySessions();
  }, [user]);

  /*
   * -----------------------------------------
   * AUDIO
   * -----------------------------------------
   */
  const getAudioContext = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      if (!audioContextRef.current) {
        audioContextRef.current =
          new AudioContextClass();
      }

      return audioContextRef.current;
    } catch (error) {
      console.error(
        "Could not create audio context:",
        error
      );

      return null;
    }
  };

  const prepareAudio = () => {
    const audioContext = getAudioContext();

    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }
  };

  const playCompletionSound = () => {
    const audioContext = getAudioContext();

    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const now =
      audioContext.currentTime;

    /*
     * A short three-note completion chime.
     */
    const notes = [
      {
        frequency: 523.25,
        start: 0,
        duration: 0.18,
      },
      {
        frequency: 659.25,
        start: 0.12,
        duration: 0.18,
      },
      {
        frequency: 783.99,
        start: 0.24,
        duration: 0.3,
      },
    ];

    notes.forEach(
      ({
        frequency,
        start,
        duration,
      }) => {
        const oscillator =
          audioContext.createOscillator();

        const gain =
          audioContext.createGain();

        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
          frequency,
          now + start
        );

        gain.gain.setValueAtTime(
          0.0001,
          now + start
        );

        gain.gain.exponentialRampToValueAtTime(
          0.18,
          now + start + 0.02
        );

        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          now + start + duration
        );

        oscillator.connect(gain);
        gain.connect(
          audioContext.destination
        );

        oscillator.start(
          now + start
        );

        oscillator.stop(
          now + start + duration
        );
      }
    );
  };

  /*
   * -----------------------------------------
   * SAVE COMPLETED SESSION
   * -----------------------------------------
   */
  const saveCompletedSession = async () => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (savingSession) return;

    try {
      setSavingSession(true);
      setError("");

      const subject =
        selectedSubject ||
        "General Study";

      const sessionData = {
        subject,
        mode,
        durationMinutes:
          currentDuration,
        completedAt:
          serverTimestamp(),
      };

      const sessionsRef = collection(
        db,
        "users",
        user.uid,
        "studySessions"
      );

      const sessionDocument =
        await addDoc(
          sessionsRef,
          sessionData
        );

      const newSession: StudySession = {
        id: sessionDocument.id,
        subject,
        mode,
        durationMinutes:
          currentDuration,
        completedAt:
          new Date().toISOString(),
      };

      setStudySessions(
        (sessions) => [
          newSession,
          ...sessions,
        ]
      );
    } catch (err) {
      console.error(
        "Could not save study session:",
        err
      );

      setError(
        "Your session could not be saved. Please check your connection and try again."
      );
    } finally {
      setSavingSession(false);
    }
  };

  /*
   * -----------------------------------------
   * TIMER
   * -----------------------------------------
   */
  useEffect(() => {
    if (!isRunning) return;

    const interval =
      window.setInterval(() => {
        setTimeLeft((current) => {
          if (current <= 1) {
            if (
              !completionHandledRef.current
            ) {
              completionHandledRef.current =
                true;

              setIsRunning(false);

              setSessionSeconds(
                currentDuration * 60
              );

              /*
               * COMPLETION EFFECTS
               */
              playCompletionSound();

              setShowCelebration(
                true
              );

              window.setTimeout(() => {
                setShowCelebration(
                  false
                );
              }, 4500);

              /*
               * SAVE TO FIREBASE
               */
              void saveCompletedSession().finally(
                () => {
                  setTimeLeft(
                    currentDuration *
                      60
                  );

                  completionHandledRef.current =
                    false;
                }
              );
            }

            return 0;
          }

          return current - 1;
        });

        setSessionSeconds(
          (current) => current + 1
        );
      }, 1000);

    return () =>
      window.clearInterval(
        interval
      );
  }, [
    isRunning,
    currentDuration,
    mode,
    selectedSubject,
    user,
  ]);

  /*
   * -----------------------------------------
   * CHANGE MODE
   * -----------------------------------------
   */
  const changeMode = (
    newMode: string
  ) => {
    setMode(newMode);
    setIsRunning(false);

    completionHandledRef.current =
      false;

    const minutes =
      newMode === "Custom"
        ? customMinutes
        : TIMER_MODES.find(
            (item) =>
              item.name === newMode
          )?.minutes ?? 25;

    setTimeLeft(
      minutes * 60
    );

    setSessionSeconds(0);
  };

  /*
   * -----------------------------------------
   * CUSTOM TIMER
   * -----------------------------------------
   */
  const updateCustomMinutes = (
    amount: number
  ) => {
    const nextValue =
      Math.min(
        180,
        Math.max(
          1,
          customMinutes +
            amount
        )
      );

    setCustomMinutes(
      nextValue
    );

    if (mode === "Custom") {
      setIsRunning(false);

      completionHandledRef.current =
        false;

      setTimeLeft(
        nextValue * 60
      );

      setSessionSeconds(0);
    }
  };

  /*
   * -----------------------------------------
   * START TIMER
   * -----------------------------------------
   */
  const startTimer = () => {
    if (!user) {
      router.replace("/login");
      return;
    }

    /*
     * User interaction initializes audio.
     */
    prepareAudio();

    setError("");
    setShowCelebration(false);

    if (selectedSubject === "") {
      setSelectedSubject(
        "General Study"
      );
    }

    completionHandledRef.current =
      false;

    setIsRunning(true);
  };

  /*
   * -----------------------------------------
   * PAUSE
   * -----------------------------------------
   */
  const pauseTimer = () => {
    setIsRunning(false);
  };

  /*
   * -----------------------------------------
   * RESET
   * -----------------------------------------
   */
  const resetTimer = () => {
    setIsRunning(false);

    setShowCelebration(false);

    completionHandledRef.current =
      false;

    setTimeLeft(
      currentDuration * 60
    );

    setSessionSeconds(0);
  };

  /*
   * -----------------------------------------
   * CLEAR HISTORY
   * -----------------------------------------
   */
  const clearHistory = async () => {
    if (!user) {
      router.replace("/login");
      return;
    }

    const confirmed =
      window.confirm(
        "Clear all of your saved study history?"
      );

    if (!confirmed) return;

    try {
      setClearingHistory(true);
      setError("");

      const sessionsRef =
        collection(
          db,
          "users",
          user.uid,
          "studySessions"
        );

      const snapshot =
        await getDocs(
          sessionsRef
        );

      const documents =
        snapshot.docs;

      /*
       * Keep each batch safely below
       * Firestore's batch write limit.
       */
      const batchSize = 450;

      for (
        let index = 0;
        index <
        documents.length;
        index += batchSize
      ) {
        const batch =
          writeBatch(db);

        const currentBatch =
          documents.slice(
            index,
            index + batchSize
          );

        currentBatch.forEach(
          (document) => {
            batch.delete(
              document.ref
            );
          }
        );

        await batch.commit();
      }

      setStudySessions([]);
    } catch (err) {
      console.error(
        "Could not clear study history:",
        err
      );

      setError(
        "Could not clear your history. Please try again."
      );
    } finally {
      setClearingHistory(
        false
      );
    }
  };

  /*
   * -----------------------------------------
   * STATISTICS
   * -----------------------------------------
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

  const subjectStats =
    useMemo(() => {
      const stats: Record<
        string,
        number
      > = {};

      studySessions.forEach(
        (session) => {
          stats[session.subject] =
            (stats[
              session.subject
            ] || 0) +
            session.durationMinutes;
        }
      );

      return Object.entries(
        stats
      )
        .sort(
          (a, b) =>
            b[1] - a[1]
        )
        .slice(0, 6);
    }, [studySessions]);

  const totalSeconds =
    currentDuration * 60;

  const elapsedSeconds =
    totalSeconds - timeLeft;

  const progress =
    totalSeconds > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (elapsedSeconds /
              totalSeconds) *
              100
          )
        )
      : 0;

  /*
   * -----------------------------------------
   * AUTH LOADING
   * -----------------------------------------
   */
  if (authChecking) {
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
   * -----------------------------------------
   * REQUIRE LOGIN
   * -----------------------------------------
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

      {/* ====================================
          COMPLETION CELEBRATION
      ==================================== */}
      {showCelebration && (
        <div
          className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
          aria-hidden="true"
        >
          {/* CONFETTI */}
          <div className="absolute inset-0">
            {Array.from(
              { length: 55 },
              (_, index) => (
                <span
                  key={index}
                  className="elevit-confetti"
                  style={{
                    left: `${
                      (index * 37) %
                      100
                    }%`,
                    animationDelay: `${
                      (index % 12) *
                      0.08
                    }s`,
                    animationDuration: `${
                      2.7 +
                      (index % 6) *
                        0.25
                    }s`,
                    transform: `rotate(${
                      index * 23
                    }deg)`,
                  }}
                />
              )
            )}
          </div>

          {/* SUCCESS MESSAGE */}
          <div className="absolute inset-x-0 top-[38%] flex justify-center px-6">
            <div className="elevit-completion-card rounded-3xl border border-zinc-700 bg-black/90 px-8 py-7 text-center shadow-2xl shadow-black/80 backdrop-blur-xl sm:px-12 sm:py-9">

              <div className="text-5xl">
                🎉
              </div>

              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-zinc-500">
                Session Complete
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Great work!
              </h2>

              <p className="mt-3 text-sm text-zinc-500">
                Your study session has been saved.
              </p>

            </div>
          </div>
        </div>
      )}

      {/* ====================================
          HERO
      ==================================== */}
      <section className="px-6 pb-10 pt-32">
        <div className="mx-auto max-w-6xl text-center">

          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950">
              <Timer size={30} />
            </div>
          </div>

          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-zinc-600">
            ELEVIT Study Tools
          </p>

          <h1 className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            Study Timer
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg">
            Focus, complete study sessions and
            build your personal study history.
          </p>

          <p className="mt-3 text-xs text-zinc-700">
            Your completed sessions are saved to
            your ELEVIT account.
          </p>

        </div>
      </section>

      {/* ====================================
          ERROR
      ==================================== */}
      {error && (
        <section className="px-6 pb-6">
          <div className="mx-auto max-w-6xl">

            <div className="rounded-2xl border border-red-900/40 bg-red-950/20 px-5 py-4">
              <p className="text-sm leading-6 text-red-300">
                {error}
              </p>
            </div>

          </div>
        </section>
      )}

      {/* ====================================
          TIMER
      ==================================== */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">

            {/* TIMER CARD */}
            <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl sm:p-10">

              <div className="mb-10">

                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-600">
                  Study Mode
                </p>

                <div className="grid gap-3 sm:grid-cols-3">

                  {TIMER_MODES.map(
                    (timerMode) => {
                      const active =
                        mode ===
                        timerMode.name;

                      return (
                        <button
                          key={
                            timerMode.name
                          }
                          type="button"
                          onClick={() =>
                            changeMode(
                              timerMode.name
                            )
                          }
                          className={`rounded-2xl border p-4 text-left transition duration-200 ${
                            active
                              ? "border-white bg-white text-black"
                              : "border-zinc-800 bg-black text-zinc-400 hover:border-zinc-600 hover:text-white"
                          }`}
                        >

                          <p className="text-sm font-semibold">
                            {
                              timerMode.name
                            }
                          </p>

                          <p className="mt-2 text-xs leading-5 text-zinc-600">
                            {
                              timerMode.description
                            }
                          </p>

                        </button>
                      );
                    }
                  )}

                </div>

              </div>

              {/* CUSTOM */}
              {mode === "Custom" && (
                <div className="mb-10 rounded-2xl border border-zinc-800 bg-black p-5">

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Custom Duration
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        Choose between 1 and 180 minutes.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          updateCustomMinutes(
                            -5
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                      >
                        <Minus size={17} />
                      </button>

                      <span className="min-w-14 text-center text-xl font-semibold">
                        {customMinutes}m
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateCustomMinutes(
                            5
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 text-zinc-400 transition hover:border-zinc-600 hover:text-white"
                      >
                        <Plus size={17} />
                      </button>

                    </div>

                  </div>

                </div>
              )}

              {/* TIMER DISPLAY */}
              <div className="text-center">

                <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                  {isRunning
                    ? "Focus Session"
                    : savingSession
                    ? "Saving Session"
                    : "Ready to Study"}
                </p>

                <div className="mt-5 text-7xl font-bold tabular-nums tracking-tight sm:text-8xl">
                  {formatTime(
                    timeLeft
                  )}
                </div>

                <div className="mx-auto mt-8 max-w-2xl">

                  <div className="h-1.5 overflow-hidden rounded-full bg-zinc-900">

                    <div
                      className="h-full rounded-full bg-white transition-all duration-1000"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="mt-9 flex flex-wrap justify-center gap-3">

                  {!isRunning ? (
                    <button
                      type="button"
                      onClick={
                        startTimer
                      }
                      disabled={
                        savingSession
                      }
                      className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {savingSession ? (
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />
                      ) : (
                        <Play
                          size={17}
                          fill="currentColor"
                        />
                      )}

                      {savingSession
                        ? "Saving..."
                        : "Start Study"}

                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={
                        pauseTimer
                      }
                      className="flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                    >
                      <Pause
                        size={17}
                        fill="currentColor"
                      />
                      Pause
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={
                      resetTimer
                    }
                    className="flex items-center gap-2 rounded-full border border-zinc-800 px-7 py-3.5 text-sm text-zinc-300 transition hover:border-zinc-600 hover:text-white"
                  >
                    <RotateCcw size={17} />
                    Reset
                  </button>

                </div>

              </div>

            </div>

            {/* SIDE */}
            <div className="space-y-6">

              {/* SUBJECT */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

                <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-600">
                  What are you studying?
                </p>

                <select
                  value={
                    selectedSubject
                  }
                  onChange={(
                    event
                  ) =>
                    setSelectedSubject(
                      event.target.value
                    )
                  }
                  className="w-full rounded-2xl border border-zinc-800 bg-black px-4 py-3.5 text-sm text-white outline-none transition focus:border-zinc-500"
                >

                  <option
                    value=""
                    className="bg-black"
                  >
                    Select a subject
                  </option>

                  {SUBJECTS.map(
                    (subject) => (
                      <option
                        key={subject}
                        value={subject}
                        className="bg-black"
                      >
                        {subject}
                      </option>
                    )
                  )}

                  <option
                    value="General Study"
                    className="bg-black"
                  >
                    General Study
                  </option>

                </select>

              </div>

              {/* CURRENT SESSION */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

                <p className="mb-5 text-xs uppercase tracking-[0.25em] text-zinc-600">
                  Current Session
                </p>

                <div className="space-y-4">

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-zinc-500">
                      Subject
                    </span>

                    <span className="max-w-[180px] truncate text-right text-sm font-medium text-white">
                      {selectedSubject ||
                        "Not selected"}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-zinc-500">
                      Mode
                    </span>

                    <span className="text-sm font-medium text-white">
                      {mode}
                    </span>

                  </div>

                  <div className="flex items-center justify-between">

                    <span className="text-sm text-zinc-500">
                      Session Time
                    </span>

                    <span className="text-sm font-medium tabular-nums text-white">
                      {formatTime(
                        sessionSeconds
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* COMPLETED */}
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                    <CheckCircle2
                      size={20}
                    />
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                      Sessions Completed
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {
                        studySessions.length
                      }
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ====================================
          STATISTICS
      ==================================== */}
      <section className="border-t border-zinc-900 px-6 py-16">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10">

            <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
              Your Progress
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Study Statistics
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
              These statistics belong to your ELEVIT account.
            </p>

          </div>

          {loadingSessions ? (
            <div className="flex items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-950 p-12">

              <Loader2
                size={25}
                className="animate-spin text-zinc-500"
              />

            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

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

              <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">

                <CheckCircle2
                  size={21}
                  className="mb-5"
                />

                <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                  Sessions
                </p>

                <p className="mt-3 text-3xl font-bold">
                  {
                    studySessions.length
                  }
                </p>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* ====================================
          SUBJECT STATISTICS
      ==================================== */}
      <section className="px-6 pb-16">

        <div className="mx-auto max-w-6xl">

          <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">

            <div className="mb-8">

              <div className="flex items-center gap-3">

                <BookOpen
                  size={21}
                />

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
                  Complete your first study session to see your subject statistics.
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
                      maxMinutes >
                      0
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

      {/* ====================================
          RECENT SESSIONS
      ==================================== */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-6xl">

          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
                History
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Recent Sessions
              </h2>

            </div>

            {studySessions.length >
              0 && (
              <button
                type="button"
                onClick={
                  clearHistory
                }
                disabled={
                  clearingHistory
                }
                className="text-sm text-zinc-600 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {clearingHistory
                  ? "Clearing..."
                  : "Clear history"}
              </button>
            )}

          </div>

          {loadingSessions ? (
            <div className="flex items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-950 p-10">

              <Loader2
                size={24}
                className="animate-spin text-zinc-500"
              />

            </div>
          ) : studySessions.length ===
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
                          {
                            session.subject
                          }
                        </p>

                        <p className="mt-1 text-xs text-zinc-600">
                          {
                            session.mode
                          }
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

      {/* ====================================
          FOOTER
      ==================================== */}
      <footer className="border-t border-zinc-900 px-6 py-10">

        <div className="mx-auto max-w-7xl text-center">

          <p className="text-sm text-zinc-600">
            ELEVIT · Study Tools
          </p>

        </div>

      </footer>

      {/* ====================================
          CONFETTI STYLES
      ==================================== */}
      <style jsx global>{`
        .elevit-confetti {
          position: absolute;
          top: -30px;
          width: 9px;
          height: 18px;
          border-radius: 2px;
          opacity: 0;
          animation-name: elevit-confetti-fall;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }

        .elevit-confetti:nth-child(4n) {
          background: #ffffff;
        }

        .elevit-confetti:nth-child(4n + 1) {
          background: #a78bfa;
        }

        .elevit-confetti:nth-child(4n + 2) {
          background: #38bdf8;
        }

        .elevit-confetti:nth-child(4n + 3) {
          background: #f472b6;
        }

        @keyframes elevit-confetti-fall {
          0% {
            opacity: 1;
            transform: translate3d(0, -30px, 0)
              rotate(0deg);
          }

          25% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate3d(30px, 110vh, 0)
              rotate(720deg);
          }
        }

        .elevit-completion-card {
          animation: elevit-completion-pop 0.5s
            cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
        }

        @keyframes elevit-completion-pop {
          0% {
            opacity: 0;
            transform: translateY(25px)
              scale(0.9);
          }

          100% {
            opacity: 1;
            transform: translateY(0)
              scale(1);
          }
        }
      `}</style>

    </main>
  );
}