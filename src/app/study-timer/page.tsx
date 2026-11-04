
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
  CalendarDays,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

import { onAuthStateChanged, User } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../firebase";
import Navbar from "../components/Navbar";

/* =========================================================
   TYPES
========================================================= */

type StudySession = {
  id: string;
  subject: string;
  mode: string;
  durationMinutes: number;
  completedAt: string;
};

type WeeklyDay = {
  day: string;
  minutes: number;
  subjectMinutes: Record<string, number>;
  isToday: boolean;
};

/* =========================================================
   TIMER MODES
========================================================= */

const TIMER_MODES = [
  {
    name: "Pomodoro",
    minutes: 25,
    description: "25 minutes of focused study",
  },
  {
    name: "Deep Study",
    minutes: 50,
    description: "50 minutes of deep focus",
  },
  {
    name: "Custom",
    minutes: 30,
    description: "Set your own duration",
  },
];

/* =========================================================
   PREDEFINED SUBJECTS
========================================================= */

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

/* =========================================================
   SUBJECT COLOUR PALETTE
========================================================= */

const SUBJECT_COLORS = [
  { solid: "#38DDF2", gradient: "from-[#38DDF2] to-[#168DBB]" },
  { solid: "#9B7BFF", gradient: "from-[#9B7BFF] to-[#6946D8]" },
  { solid: "#FF9B71", gradient: "from-[#FF9B71] to-[#E75D68]" },
  { solid: "#4DDBA5", gradient: "from-[#4DDBA5] to-[#159B79]" },
  { solid: "#F5C96A", gradient: "from-[#F5C96A] to-[#DB9238]" },
  { solid: "#F47CC4", gradient: "from-[#F47CC4] to-[#C14B9B]" },
  { solid: "#76A9FF", gradient: "from-[#76A9FF] to-[#416EDB]" },
  { solid: "#B6D96B", gradient: "from-[#B6D96B] to-[#72A43D]" },
  { solid: "#FF8D8D", gradient: "from-[#FF8D8D] to-[#D94D65]" },
  { solid: "#65D6D0", gradient: "from-[#65D6D0] to-[#289EAA]" },
];

/* =========================================================
   HELPERS
========================================================= */

function formatTime(totalSeconds: number) {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes
    ? `${hours}h ${remainingMinutes}m`
    : `${hours}h`;
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
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    return (
      value as { toDate: () => Date }
    ).toDate().toISOString();
  }

  if (typeof value === "string") return value;

  if (value instanceof Date) return value.toISOString();

  return new Date().toISOString();
}

/* =========================================================
   WEEKLY ACTIVITY DATA
========================================================= */

function getWeeklyData(sessions: StudySession[]): WeeklyDay[] {
  const today = new Date();
  const monday = getStartOfWeek();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days.map((day, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    const subjectMinutes: Record<string, number> = {};

    sessions.forEach((session) => {
      const sessionDate = new Date(session.completedAt);

      const isSameDay =
        sessionDate.getFullYear() === date.getFullYear() &&
        sessionDate.getMonth() === date.getMonth() &&
        sessionDate.getDate() === date.getDate();

      if (isSameDay) {
        subjectMinutes[session.subject] =
          (subjectMinutes[session.subject] || 0) +
          session.durationMinutes;
      }
    });

    const minutes = Object.values(subjectMinutes).reduce(
      (total, value) => total + value,
      0
    );

    return {
      day,
      minutes,
      subjectMinutes,
      isToday:
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear(),
    };
  });
}

/* =========================================================
   WAVY TIMER PATH
   START POSITION: 12 O'CLOCK
========================================================= */

function createWavePath(
  radius: number,
  amplitude: number,
  waves: number
) {
  const points = 180;
  let path = "";

  for (let i = 0; i <= points; i++) {
    const angle =
      (i / points) * Math.PI * 2 - Math.PI / 2;

    const waveRadius =
      radius + Math.sin(angle * waves) * amplitude;

    const x = 150 + waveRadius * Math.cos(angle);
    const y = 150 + waveRadius * Math.sin(angle);

    path += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
  }

  return `${path} Z`;
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function StudyTimerPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [mode, setMode] = useState("Pomodoro");
  const [customMinutes, setCustomMinutes] = useState(30);

  // Free typing and dropdown selection use the same input.
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showSubjectOptions, setShowSubjectOptions] = useState(false);

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [savingSession, setSavingSession] = useState(false);

  const [error, setError] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);

  const completionHandledRef = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  /* =========================================================
     DERIVED VALUES
  ========================================================= */

  const currentDuration = useMemo(() => {
    if (mode === "Custom") return customMinutes;

    return (
      TIMER_MODES.find((item) => item.name === mode)?.minutes ?? 25
    );
  }, [mode, customMinutes]);

  const activeSubject = selectedSubject.trim() || "General Study";

  const filteredSubjects = useMemo(() => {
    const search = selectedSubject.trim().toLowerCase();

    if (!search) return SUBJECTS;

    return SUBJECTS.filter((subject) =>
      subject.toLowerCase().includes(search)
    );
  }, [selectedSubject]);

  const totalSeconds = currentDuration * 60;
  const elapsedSeconds = totalSeconds - timeLeft;

  const progress =
    totalSeconds > 0
      ? Math.min(100, Math.max(0, (elapsedSeconds / totalSeconds) * 100))
      : 0;

  const wavePath = createWavePath(111, 2.5, 16);

  const weeklyData = useMemo(
    () => getWeeklyData(studySessions),
    [studySessions]
  );

  const maximumWeeklyMinutes = Math.max(
    60,
    ...weeklyData.map((day) => day.minutes)
  );

  /* =========================================================
     CONSISTENT SUBJECT COLOURS
     Same subject = same colour in both charts.
  ========================================================= */

  const subjectColorMap = useMemo(() => {
    const names = [
      ...new Set(studySessions.map((session) => session.subject)),
    ].sort((a, b) => a.localeCompare(b));

    const map: Record<
      string,
      { solid: string; gradient: string }
    > = {};

    names.forEach((name, index) => {
      map[name] = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
    });

    return map;
  }, [studySessions]);

  const subjectStats = useMemo(() => {
    const stats: Record<string, number> = {};

    studySessions.forEach((session) => {
      stats[session.subject] =
        (stats[session.subject] || 0) + session.durationMinutes;
    });

    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [studySessions]);

  const maximumSubjectMinutes = Math.max(
    1,
    ...subjectStats.map((item) => item[1])
  );

  /* =========================================================
     AUTHENTICATION
  ========================================================= */

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthChecking(false);

      if (!currentUser) {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  /* =========================================================
     LOAD FIREBASE STUDY HISTORY
  ========================================================= */

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

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

        const snapshot = await getDocs(sessionsQuery);

        const sessions: StudySession[] = snapshot.docs.map((document) => {
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
              typeof data.durationMinutes === "number"
                ? data.durationMinutes
                : 0,
            completedAt: convertFirestoreDate(data.completedAt),
          };
        });

        if (!cancelled) {
          setStudySessions(sessions);
        }
      } catch (err) {
        console.error("Could not load study sessions:", err);

        if (!cancelled) {
          setError(
            "Could not load your study history. Please refresh and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingSessions(false);
        }
      }
    };

    void loadStudySessions();

    return () => {
      cancelled = true;
    };
  }, [user]);

  /* =========================================================
     AUDIO
  ========================================================= */

  const getAudioContext = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) return null;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextClass();
      }

      return audioContextRef.current;
    } catch (err) {
      console.error("Could not create audio context:", err);
      return null;
    }
  };

  const prepareAudio = () => {
    const audioContext = getAudioContext();

    if (audioContext?.state === "suspended") {
      void audioContext.resume();
    }
  };

  const playCompletionSound = () => {
    const audioContext = getAudioContext();

    if (!audioContext) return;

    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const now = audioContext.currentTime;

    const notes = [
      { frequency: 523.25, start: 0, duration: 0.18 },
      { frequency: 659.25, start: 0.12, duration: 0.18 },
      { frequency: 783.99, start: 0.24, duration: 0.3 },
    ];

    notes.forEach(({ frequency, start, duration }) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now + start);

      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(
        0.18,
        now + start + 0.02
      );
      gain.gain.exponentialRampToValueAtTime(
        0.0001,
        now + start + duration
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(now + start);
      oscillator.stop(now + start + duration);
    });
  };

  /* =========================================================
     SAVE COMPLETED SESSION
  ========================================================= */

  const saveCompletedSession = async () => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (savingSession) return;

    try {
      setSavingSession(true);
      setError("");

      const sessionData = {
        subject: activeSubject,
        mode,
        durationMinutes: currentDuration,
        completedAt: serverTimestamp(),
      };

      const sessionsRef = collection(
        db,
        "users",
        user.uid,
        "studySessions"
      );

      const sessionDocument = await addDoc(sessionsRef, sessionData);

      const newSession: StudySession = {
        id: sessionDocument.id,
        subject: activeSubject,
        mode,
        durationMinutes: currentDuration,
        completedAt: new Date().toISOString(),
      };

      setStudySessions((sessions) => [newSession, ...sessions]);
    } catch (err) {
      console.error("Could not save study session:", err);

      setError(
        "Your session could not be saved. Please check your connection and try again."
      );
    } finally {
      setSavingSession(false);
    }
  };

  /* =========================================================
     TIMER INTERVAL
  ========================================================= */

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          if (!completionHandledRef.current) {
            completionHandledRef.current = true;

            setIsRunning(false);
            setSessionSeconds(currentDuration * 60);

            playCompletionSound();
            setShowCelebration(true);

            window.setTimeout(() => {
              setShowCelebration(false);
            }, 4500);

            void saveCompletedSession().finally(() => {
              setTimeLeft(currentDuration * 60);
              completionHandledRef.current = false;
            });
          }

          return 0;
        }

        return current - 1;
      });

      setSessionSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRunning, currentDuration, mode, activeSubject, user]);

  /* =========================================================
     MODE SELECTION
  ========================================================= */

  const changeMode = (newMode: string) => {
    if (isRunning || savingSession) return;

    setMode(newMode);
    setIsRunning(false);
    setShowCelebration(false);
    completionHandledRef.current = false;

    const minutes =
      newMode === "Custom"
        ? customMinutes
        : TIMER_MODES.find((item) => item.name === newMode)?.minutes ?? 25;

    setTimeLeft(minutes * 60);
    setSessionSeconds(0);
  };

  /* =========================================================
     CUSTOM DURATION
  ========================================================= */

  const updateCustomMinutes = (amount: number) => {
    if (isRunning || savingSession) return;

    const nextValue = Math.min(
      180,
      Math.max(1, customMinutes + amount)
    );

    setCustomMinutes(nextValue);

    if (mode === "Custom") {
      setTimeLeft(nextValue * 60);
      setSessionSeconds(0);
    }
  };

  /* =========================================================
     SUBJECT SELECTION
  ========================================================= */

  const chooseSubject = (subject: string) => {
    setSelectedSubject(subject);
    setShowSubjectOptions(false);
    setError("");
  };

  /* =========================================================
     START TIMER
  ========================================================= */

  const startTimer = () => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (savingSession) return;

    prepareAudio();

    setError("");
    setShowSubjectOptions(false);
    setShowCelebration(false);
    completionHandledRef.current = false;

    setIsRunning(true);
  };

  /* =========================================================
     PAUSE / RESET
  ========================================================= */

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setShowCelebration(false);
    completionHandledRef.current = false;
    setTimeLeft(currentDuration * 60);
    setSessionSeconds(0);
  };

  /* =========================================================
     STATISTICS
  ========================================================= */

  const todayStudyMinutes = useMemo(() => {
    const today = getStartOfToday();

    return studySessions
      .filter(
        (session) => new Date(session.completedAt) >= today
      )
      .reduce((total, session) => total + session.durationMinutes, 0);
  }, [studySessions]);

  const weekStudyMinutes = useMemo(() => {
    const startOfWeek = getStartOfWeek();

    return studySessions
      .filter(
        (session) => new Date(session.completedAt) >= startOfWeek
      )
      .reduce((total, session) => total + session.durationMinutes, 0);
  }, [studySessions]);

  const totalStudyMinutes = useMemo(() => {
    return studySessions.reduce(
      (total, session) => total + session.durationMinutes,
      0
    );
  }, [studySessions]);

  /* =========================================================
     AUTH LOADING
  ========================================================= */

  if (authChecking || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070B16] text-white">
        <Loader2 size={28} className="animate-spin text-[#38DDF2]" />
      </main>
    );
  }

  /* =========================================================
     PAGE UI
  ========================================================= */

  return (
    <main className="min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      <Navbar />

      {/* BACKGROUND */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.07] blur-[150px]" />
        <div className="absolute -left-48 top-[700px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      {/* CELEBRATION */}

      {showCelebration && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {Array.from({ length: 55 }, (_, index) => (
            <span
              key={index}
              className="elevit-confetti"
              style={{
                left: `${(index * 37) % 100}%`,
                animationDelay: `${(index % 12) * 0.08}s`,
                animationDuration: `${2.7 + (index % 6) * 0.25}s`,
              }}
            />
          ))}

          <div className="absolute inset-x-0 top-[38%] flex justify-center px-6">
            <div className="elevit-completion-card rounded-3xl border border-[#38DDF2]/20 bg-[#101827]/95 px-8 py-8 text-center shadow-2xl backdrop-blur-xl sm:px-12">
              <div className="text-5xl">🎉</div>

              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[#38DDF2]">
                Session Complete
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                Great work!
              </h2>

              <p className="mt-3 text-sm text-[#94A9C5]">
                Your study session has been saved.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}

      <section className="relative px-5 pb-10 pt-32 sm:px-8 sm:pt-36">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
            <Timer size={27} className="text-[#38DDF2]" />
          </div>

          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#38DDF2]">
            ELEVIT STUDY TOOLS
          </p>

          <h1 className="bg-gradient-to-r from-white via-[#BCEFFF] to-[#9B7BFF] bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
            Study Timer
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#94A9C5] sm:text-lg">
            Find your rhythm. Stay focused. Make every study session count.
          </p>

          <p className="mt-3 text-xs text-[#64748B]">
            Your completed sessions are saved to your ELEVIT account.
          </p>
        </div>
      </section>

      {/* ERROR */}

      {error && (
        <section className="relative px-5 pb-5 sm:px-8">
          <div className="mx-auto max-w-6xl rounded-2xl border border-red-500/20 bg-red-500/[0.06] px-5 py-4">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        </section>
      )}

      {/* MAIN TIMER */}

      <section className="relative px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.35fr_0.65fr]">

          {/* TIMER CARD */}

          <div className="rounded-3xl border border-white/[0.08] bg-[#101827]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-9">
            <div className="mb-8">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#64748B]">
                Choose your focus mode
              </p>

              <div className="grid gap-3 sm:grid-cols-3">
                {TIMER_MODES.map((timerMode) => {
                  const active = mode === timerMode.name;

                  return (
                    <button
                      key={timerMode.name}
                      type="button"
                      onClick={() => changeMode(timerMode.name)}
                      disabled={isRunning || savingSession}
                      className={`rounded-2xl border p-4 text-left transition duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                        active
                          ? "border-[#38DDF2]/50 bg-[#38DDF2]/[0.09] text-white"
                          : "border-white/[0.07] bg-[#090E18] text-[#94A9C5] hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {timerMode.name}
                      </p>

                      <p className="mt-2 text-xs leading-5 text-[#8292AC]">
                        {timerMode.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CUSTOM DURATION */}

            {mode === "Custom" && (
              <div className="mb-8 rounded-2xl border border-[#38DDF2]/15 bg-[#090E18] p-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Custom Duration
                    </p>

                    <p className="mt-1 text-xs text-[#64748B]">
                      Choose between 1 and 180 minutes.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => updateCustomMinutes(-5)}
                      disabled={isRunning}
                      aria-label="Decrease duration"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-white disabled:opacity-40"
                    >
                      <Minus size={17} />
                    </button>

                    <span className="min-w-14 text-center text-xl font-bold text-white">
                      {customMinutes}m
                    </span>

                    <button
                      type="button"
                      onClick={() => updateCustomMinutes(5)}
                      disabled={isRunning}
                      aria-label="Increase duration"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-white disabled:opacity-40"
                    >
                      <Plus size={17} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* WAVY TIMER */}

            <div className="flex flex-col items-center py-3 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8292AC]">
                {savingSession
                  ? "Saving your session"
                  : isRunning
                    ? "Stay in your focus zone"
                    : timeLeft === 0
                      ? "Session completed"
                      : "Ready when you are"}
              </p>

              <div className="relative mt-5 flex h-[300px] w-[300px] items-center justify-center">
                <svg
                  viewBox="0 0 300 300"
                  className="absolute inset-0 h-full w-full overflow-visible"
                  role="img"
                  aria-label={`Timer progress ${Math.round(progress)} percent`}
                >
                  <defs>
                    <linearGradient
                      id="timerGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#38DDF2" />
                      <stop offset="55%" stopColor="#4D9BF5" />
                      <stop offset="100%" stopColor="#9B7BFF" />
                    </linearGradient>

                    <filter id="timerGlow">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <circle
                    cx="150"
                    cy="150"
                    r="111"
                    fill="none"
                    stroke="#1D293B"
                    strokeWidth="2"
                  />

                  <circle
                    cx="150"
                    cy="150"
                    r="99"
                    fill="none"
                    stroke="#1D293B"
                    strokeWidth="1"
                    strokeDasharray="3 8"
                  />

                  <path
                    d={wavePath}
                    fill="none"
                    stroke="#38DDF2"
                    strokeWidth="2.5"
                    opacity="0.15"
                  />

                  <path
                    d={wavePath}
                    fill="none"
                    stroke="url(#timerGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="710"
                    strokeDashoffset={710 - (710 * progress) / 100}
                    filter="url(#timerGlow)"
                    style={{
                      transition: "stroke-dashoffset 0.8s linear",
                    }}
                  />

                  <circle
                    cx="150"
                    cy="39"
                    r="4"
                    fill="#38DDF2"
                    className={isRunning ? "timer-dot-running" : ""}
                  />
                </svg>

                <div className="relative z-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#64748B]">
                    {mode}
                  </p>

                  <div className="mt-3 text-6xl font-bold tabular-nums tracking-[-0.06em] text-white sm:text-7xl">
                    {formatTime(timeLeft)}
                  </div>

                  <p className="mt-3 text-xs text-[#8292AC]">
                    {isRunning ? "You're doing great" : "Time to focus"}
                  </p>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="mt-3 w-full max-w-sm">
                <div className="mb-2 flex justify-between text-xs text-[#64748B]">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-[#1D293B]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#38DDF2] via-[#4D9BF5] to-[#9B7BFF] transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* CONTROLS */}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {!isRunning ? (
                  <button
                    type="button"
                    onClick={startTimer}
                    disabled={savingSession || timeLeft === 0}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-8 py-3.5 text-sm font-bold text-[#07111D] shadow-[0_8px_30px_rgba(56,221,242,0.15)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {savingSession ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : (
                      <Play size={17} fill="currentColor" />
                    )}

                    {savingSession ? "Saving..." : "Start Focus"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={pauseTimer}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-8 py-3.5 text-sm font-bold text-[#07111D] transition hover:brightness-110"
                  >
                    <Pause size={17} fill="currentColor" />
                    Pause
                  </button>
                )}

                <button
                  type="button"
                  onClick={resetTimer}
                  disabled={savingSession}
                  className="flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.03] px-7 py-3.5 text-sm text-[#CBD5E1] transition hover:border-[#38DDF2]/30 hover:text-white disabled:opacity-40"
                >
                  <RotateCcw size={16} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div className="space-y-5">

            {/* SEARCHABLE SUBJECT INPUT */}

            <div className="rounded-3xl border border-white/[0.08] bg-[#101827]/90 p-6 backdrop-blur-xl">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#64748B]">
                What are you studying?
              </p>

              <div className="relative">
                <div className="flex items-center overflow-hidden rounded-2xl border border-white/[0.09] bg-[#090E18] transition focus-within:border-[#38DDF2]/50">
                  <input
                    type="text"
                    value={selectedSubject}
                    onChange={(event) => {
                      setSelectedSubject(event.target.value);
                      setShowSubjectOptions(true);
                      setError("");
                    }}
                    onFocus={() => setShowSubjectOptions(true)}
                    onKeyDown={(event) => {
                      if (event.key === "Escape") {
                        setShowSubjectOptions(false);
                      }

                      if (event.key === "Enter") {
                        event.preventDefault();
                        setShowSubjectOptions(false);
                      }
                    }}
                    placeholder="Type your subject..."
                    maxLength={60}
                    disabled={isRunning || savingSession}
                    className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-[#8292AC] disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowSubjectOptions((previous) => !previous)
                    }
                    disabled={isRunning || savingSession}
                    aria-label="Show available subjects"
                    aria-expanded={showSubjectOptions}
                    className="flex h-full items-center justify-center px-5 text-[#94A9C5] transition hover:text-[#38DDF2] disabled:opacity-50"
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-200 ${
                        showSubjectOptions ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {showSubjectOptions && !isRunning && !savingSession && (
                  <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-white/[0.10] bg-[#101827] p-2 shadow-2xl">
                    <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">
                      Available Subjects
                    </p>

                    {filteredSubjects.length > 0 ? (
                      filteredSubjects.map((subject) => (
                        <button
                          key={subject}
                          type="button"
                          onClick={() => {
                            setSelectedSubject(subject);
                            setShowSubjectOptions(false);
                            setError("");
                          }}
                          className="flex w-full items-center rounded-xl px-3 py-3 text-left text-sm text-[#CBD5E1] transition hover:bg-[#38DDF2]/[0.08] hover:text-[#38DDF2]"
                        >
                          <BookOpen
                            size={15}
                            className="mr-3 shrink-0 text-[#38DDF2]"
                          />
                          {subject}
                        </button>
                      ))
                    ) : (
                      <p className="px-3 py-4 text-sm text-[#8292AC]">
                        No matching subject. You can use your custom subject:
                        <span className="ml-1 font-medium text-[#38DDF2]">
                          {selectedSubject}
                        </span>
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setShowSubjectOptions(false)}
                      className="mt-1 w-full rounded-xl border-t border-white/[0.06] px-3 py-3 text-left text-xs text-[#8292AC] hover:text-white"
                    >
                      Continue with this subject
                    </button>
                  </div>
                )}
              </div>

              <p className="mt-3 text-xs text-[#64748B]">
                Type any subject or choose one from the dropdown.
              </p>
            </div>

            {/* CURRENT SESSION */}

            <div className="rounded-3xl border border-white/[0.08] bg-[#101827]/90 p-6">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#64748B]">
                Current Session
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-[#8292AC]">Subject</span>

                  <span className="max-w-[190px] truncate text-right text-sm font-medium text-white">
                    {selectedSubject.trim() || "Not selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8292AC]">Mode</span>
                  <span className="text-sm font-medium text-white">
                    {mode}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#8292AC]">Session Time</span>
                  <span className="text-sm font-medium tabular-nums text-white">
                    {formatTime(sessionSeconds)}
                  </span>
                </div>
              </div>
            </div>

            {/* COMPLETED SESSIONS COUNT */}

            <div className="rounded-3xl border border-white/[0.08] bg-[#101827]/90 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.08]">
                  <CheckCircle2 size={20} className="text-[#38DDF2]" />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#64748B]">
                    Sessions Completed
                  </p>

                  <p className="mt-1 text-2xl font-bold text-white">
                    {studySessions.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDY STATISTICS */}

      <section className="relative border-t border-white/[0.06] px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#38DDF2]">
              Your Progress
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Study Statistics
            </h2>

            <p className="mt-3 text-sm text-[#8292AC]">
              Understand your focus habits and track your consistency.
            </p>
          </div>

          {loadingSessions ? (
            <div className="flex items-center justify-center rounded-3xl border border-white/[0.08] bg-[#101827] p-12">
              <Loader2
                size={25}
                className="animate-spin text-[#38DDF2]"
              />
            </div>
          ) : (
            <>
              {/* SUMMARY CARDS */}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    label: "Today",
                    value: todayStudyMinutes,
                    suffix: "min",
                    icon: Clock3,
                  },
                  {
                    label: "This Week",
                    value: weekStudyMinutes,
                    suffix: "min",
                    icon: BarChart3,
                  },
                  {
                    label: "Total Study",
                    value: totalStudyMinutes,
                    suffix: "min",
                    icon: Timer,
                  },
                  {
                    label: "Sessions",
                    value: studySessions.length,
                    suffix: "completed",
                    icon: CheckCircle2,
                  },
                ].map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-white/[0.08] bg-[#101827]/90 p-5 transition hover:border-[#38DDF2]/20"
                    >
                      <Icon
                        size={20}
                        className="mb-5 text-[#38DDF2]"
                      />

                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#64748B]">
                        {stat.label}
                      </p>

                      <p className="mt-3 text-3xl font-bold tabular-nums text-white">
                        {stat.value.toLocaleString()}

                        <span className="ml-2 text-xs font-normal text-[#8292AC]">
                          {stat.suffix}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* WEEKLY ACTIVITY - MULTI-SUBJECT STACKED CHART */}

              <div className="mt-6 rounded-3xl border border-white/[0.08] bg-[#101827]/90 p-6 sm:p-8">
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={18}
                        className="text-[#38DDF2]"
                      />

                      <h3 className="text-lg font-semibold text-white">
                        Weekly Activity
                      </h3>
                    </div>

                    <p className="mt-2 text-xs text-[#8292AC]">
                      Your daily study time, broken down by subject.
                    </p>
                  </div>
                </div>

                <div className="grid h-56 grid-cols-7 gap-3 sm:gap-6">
                  {weeklyData.map((day) => (
                    <div
                      key={day.day}
                      className="flex min-w-0 flex-col items-center justify-end"
                    >
                      {/* No number above the chart */}

                      <div className="flex h-36 w-full items-end justify-center rounded-t-xl bg-white/[0.025]">
                        <div
                          className="flex w-full max-w-10 flex-col-reverse overflow-hidden rounded-t-lg"
                          style={{
                            height:
                              day.minutes > 0
                                ? `${Math.max(
                                    5,
                                    (day.minutes / maximumWeeklyMinutes) * 100
                                  )}%`
                                : "2%",
                          }}
                        >
                          {Object.entries(day.subjectMinutes).map(
                            ([subject, minutes]) => {
                              const color =
                                subjectColorMap[subject]?.solid ?? "#64748B";

                              return (
                                <div
                                  key={subject}
                                  title={`${subject}: ${formatMinutes(minutes)}`}
                                  className="w-full transition-all duration-700"
                                  style={{
                                    height: `${
                                      (minutes / day.minutes) * 100
                                    }%`,
                                    backgroundColor: color,
                                    minHeight: "3px",
                                  }}
                                />
                              );
                            }
                          )}
                        </div>
                      </div>

                      <span
                        className={`mt-3 text-[10px] font-medium sm:text-xs ${
                          day.isToday
                            ? "text-[#38DDF2]"
                            : "text-[#8292AC]"
                        }`}
                      >
                        {day.day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* SUBJECT LEGEND */}

                {subjectStats.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.06] pt-6">
                    {subjectStats.map(([subject]) => (
                      <div
                        key={subject}
                        className="flex items-center gap-2"
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              subjectColorMap[subject]?.solid ?? "#64748B",
                          }}
                        />

                        <span className="text-xs text-[#94A9C5]">
                          {subject}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {weekStudyMinutes === 0 && (
                  <p className="mt-6 text-center text-xs text-[#64748B]">
                    Complete a study session to see your weekly activity.
                  </p>
                )}
              </div>

              {/* SUBJECT-WISE STUDY TIME */}

              <div className="mt-6 rounded-3xl border border-white/[0.08] bg-[#101827]/90 p-6 sm:p-8">
                <div className="mb-8">
                  <div className="flex items-center gap-3">
                    <BookOpen
                      size={20}
                      className="text-[#38DDF2]"
                    />

                    <h3 className="text-xl font-bold text-white">
                      Subject-wise Study Time
                    </h3>
                  </div>

                  <p className="mt-2 text-sm text-[#8292AC]">
                    See how your study time is distributed across subjects.
                  </p>
                </div>

                {subjectStats.length === 0 ? (
                  <div className="rounded-2xl border border-white/[0.07] bg-[#090E18] p-9 text-center">
                    <GraduationCap
                      size={28}
                      className="mx-auto mb-3 text-[#64748B]"
                    />

                    <p className="text-sm text-[#8292AC]">
                      Complete your first study session to see your subject
                      statistics.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {subjectStats.map(([subject, minutes], index) => {
                      const percentage =
                        (minutes / maximumSubjectMinutes) * 100;

                      const color =
                        subjectColorMap[subject]?.gradient ??
                        "from-[#64748B] to-[#475569]";

                      return (
                        <div key={subject}>
                          <div className="mb-3 flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-gradient-to-br ${color} text-xs font-bold text-[#07111D]`}
                              >
                                {index + 1}
                              </span>

                              <span className="truncate text-sm font-medium text-[#E2E8F0]">
                                {subject}
                              </span>
                            </div>

                            <span className="shrink-0 text-xs tabular-nums text-[#8292AC]">
                              {formatMinutes(minutes)}
                            </span>
                          </div>

                          <div className="h-2.5 overflow-hidden rounded-full bg-[#202B3D]">
                            <div
                              className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="relative border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-semibold tracking-[0.12em] text-white">
            ELEVIT
            <span className="ml-2 font-normal tracking-normal text-[#64748B]">
              · Study Tools
            </span>
          </p>

          <p className="mt-2 text-xs text-[#526078]">
            Learn. Build. Grow.
          </p>
        </div>
      </footer>

      {/* ANIMATIONS */}

      <style jsx global>{`
        .timer-dot-running {
          animation: elevit-pulse 1.8s ease-in-out infinite;
        }

        @keyframes elevit-pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.85);
            transform-origin: 150px 39px;
          }

          50% {
            opacity: 1;
            transform: scale(1.35);
            transform-origin: 150px 39px;
          }
        }

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
          background: #9b7bff;
        }

        .elevit-confetti:nth-child(4n + 2) {
          background: #38ddf2;
        }

        .elevit-confetti:nth-child(4n + 3) {
          background: #4d9bf5;
        }

        @keyframes elevit-confetti-fall {
          0% {
            opacity: 1;
            transform: translate3d(0, -30px, 0) rotate(0deg);
          }

          25% {
            opacity: 1;
          }

          100% {
            opacity: 0;
            transform: translate3d(30px, 110vh, 0) rotate(720deg);
          }
        }

        .elevit-completion-card {
          animation: elevit-completion-pop 0.5s
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes elevit-completion-pop {
          0% {
            opacity: 0;
            transform: translateY(25px) scale(0.9);
          }

          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .timer-dot-running,
          .elevit-confetti,
          .elevit-completion-card {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
