"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "../components/Navbar";

type Resource = {
  name: string;
  path: string;
  type: "Notes" | "PYQs" | "Videos" | "Assignments" | "Coming Soon";
};

type Subject = {
  title: string;
  resources: Resource[];
};

const subjectRegistry: Record<string, Subject> = {
  "electrical-technology": {
    title: "Electrical Technology",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/electrical-technology/Notes1", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "electronic-devices": {
    title: "Electronic Devices",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/electronic-devices/Notes1", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "chemistry": {
    title: "Engineering Chemistry",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/chemistry/Notes1", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "electrical-circuits-and-network-analysis": {
    title: "Electrical Circuits & Network Analysis",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/electrical-circuits-and-network-analysis/Notes1", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "signals-and-systems": {
    title: "Signals and Systems",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/signals-and-systems/Notes1", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "analog-integrated-circuits": {
    title: "Analog Integrated Circuits",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/analog-integrated-circuits/Notes1", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "microprocessor-and-microcontroller": {
    title: "Microprocessor & Microcontroller",
    resources: [
      { name: "📖 Notes Part 1", path: "/notes/microprocessor-and-microcontroller/Notes1", type: "Notes" },
      { name: "📖 Notes Part 2", path: "/notes/microprocessor-and-microcontroller/Notes2", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
      { name: "📝 Assignments", path: "#", type: "Coming Soon" },
    ],
  },
  "smart-antenna-systems": {
    title: "Smart Antenna Systems",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/smart-antenna-systems", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
    ],
  },
  "cmos-vlsi-design": {
    title: "CMOS VLSI Design",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/cmos-vlsi-design", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
    ],
  },
  "control-systems": {
    title: "Control Systems",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/control-systems", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
    ],
  },
  "computer-networks": {
    title: "Computer Networks",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/computer-networks", type: "Notes" },
      { name: "📄 Previous Year Questions", path: "#", type: "Coming Soon" },
      { name: "🎥 Video Lectures", path: "#", type: "Coming Soon" },
    ],
  },
};

export default function SubjectLandingPage() {
  const params = useParams();
  const slug = params.subjectSlug as string;
  const subject = subjectRegistry[slug];

  if (!subject) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="pt-44 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Subject Not Found</h1>
          <p className="text-gray-400 mb-8">The requested subject is not available.</p>
          <Link href="/notes" className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-zinc-200 transition">
            Back to Notes
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-44 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-16 max-w-5xl">
            <Link href="/notes" className="text-zinc-500 hover:text-white transition text-sm flex items-center gap-2 mb-4">
              ← Back to Semesters
            </Link>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white">
              {subject.title}
            </h1>
            {/* 3. Improved subject description copywriting */}
            <p className="text-zinc-400 mt-4 text-lg">
              Access notes, previous year questions, assignments, video lectures, and additional learning resources for this subject.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subject.resources.map((resource, idx) =>
              resource.type === "Coming Soon" ? (
                <div
                  key={idx}
                  className="bg-zinc-950/40 border border-zinc-900 border-dashed rounded-2xl p-8 opacity-40 h-40 flex flex-col justify-between hover:opacity-60 transition duration-300"
                >
                  <h2 className="text-xl font-bold text-zinc-500 mb-3">
                    {resource.name}
                  </h2>
                  <p className="text-zinc-600 text-sm">Coming Soon</p>
                </div>
              ) : (
                <Link href={resource.path} key={idx} className="block">
                  {/* 2. Added hover:shadow-xl hover:shadow-white/5 for deep dark canvas lighting */}
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 hover:border-white hover:bg-zinc-900 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 group">
                    <h2 className="text-2xl font-bold text-zinc-100 group-hover:text-white line-clamp-2">
                      {resource.name}
                    </h2>
                    <div className="flex justify-between items-center mt-4">
                      {/* 1. Dynamic themed layout badges */}
                      <span
                        className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border font-semibold
                          ${
                            resource.type === "Notes"
                              ? "bg-blue-950/40 text-blue-300 border-blue-800"
                              : resource.type === "PYQs"
                              ? "bg-green-950/40 text-green-300 border-green-800"
                              : resource.type === "Videos"
                              ? "bg-red-950/40 text-red-300 border-red-800"
                              : resource.type === "Assignments"
                              ? "bg-yellow-950/40 text-yellow-300 border-yellow-800"
                              : "bg-zinc-900 text-zinc-400 border-zinc-800"
                          }`}
                      >
                        {resource.type}
                      </span>
                      <span className="text-zinc-500 group-hover:text-white transition text-xl">→</span>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>

        </div>
      </section>
    </main>
  );
}