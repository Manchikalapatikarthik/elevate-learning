"use client";

import { use } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

type Resource = {
  name: string;
  path: string;
  type: "Notes" | "Coming Soon";
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
    title: "Electrical Circuits and Network Analysis",
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

  "electromagnetic-field-theory": {
    title: "Electromagnetic Field Theory",
    resources: [
      { name: "📖 Notes Set 1", path: "/notes/electromagnetic-field-theory/Notes1", type: "Notes" },
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
    title: "Microprocessor and Microcontroller",
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
    ],
  },

  "cmos-vlsi-design": {
    title: "CMOS VLSI Design",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/cmos-vlsi-design", type: "Notes" },
    ],
  },

  "control-systems": {
    title: "Control Systems",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/control-systems", type: "Notes" },
    ],
  },

  "computer-networks": {
    title: "Computer Networks",
    resources: [
      { name: "📖 Full Course Notes", path: "/notes/computer-networks", type: "Notes" },
    ],
  },
};

export default function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = use(params);

  const current = subjectRegistry[subject];

  if (!current) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-40 text-center">
          <h1 className="text-5xl font-bold">Subject Not Found</h1>
          <Link href="/notes" className="mt-8 inline-block bg-white text-black px-6 py-3 rounded-xl">
            Back to Notes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          <Link
            href="/notes"
            className="text-zinc-500 hover:text-white mb-6 inline-block"
          >
            ← Back to Notes
          </Link>

          <h1 className="text-6xl font-bold mb-6">
            {current.title}
          </h1>

          <p className="text-xl text-gray-400 mb-14">
            Select a resource below.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.resources.map((resource, index) =>
              resource.type === "Coming Soon" ? (
                <div
                  key={index}
                  className="bg-zinc-950 border border-dashed border-zinc-800 rounded-2xl p-8 opacity-50"
                >
                  <h2 className="text-2xl font-bold mb-4">
                    {resource.name}
                  </h2>
                  <p className="text-gray-500">
                    Coming Soon
                  </p>
                </div>
              ) : (
                <Link key={index} href={resource.path}>
                  <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8 hover:border-white hover:-translate-y-1 transition duration-300 cursor-pointer">
                    <h2 className="text-2xl font-bold mb-6">
                      {resource.name}
                    </h2>

                    <span className="inline-block bg-blue-950/40 text-blue-300 border border-blue-800 px-3 py-1 rounded-full text-sm">
                      Notes
                    </span>
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