"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

import { db } from "../../firebase";

import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const availableSubjects: Record<string, string> = {
  // Semester 1
  "Electrical Technology": "/notes/electrical-technology",
  "Electronic Devices": "/notes/electronic-devices",

  // Semester 2
  "Chemistry": "/notes/chemistry",
  "Electrical Circuits and Network Analysis":
    "/notes/electrical-circuits-and-network-analysis",

  // Semester 3
  "Signals and Systems": "/notes/signals-and-systems",
  "Electromagnetic Field Theory":
    "/notes/electromagnetic-field-theory",

  // Semester 4
  "Analog Integrated Circuits":
    "/notes/analog-integrated-circuits",

  // Semester 5
  "Smart Antenna Systems": "/notes/smart-antenna-systems",
  "CMOS VLSI Design": "/notes/cmos-vlsi-design",
  "Control Systems": "/notes/control-systems",
  "Microprocessor and Microcontroller":
    "/notes/microprocessor-and-microcontroller",

  // Semester 6
  "Computer Networks": "/notes/computer-networks",
};

const semesters = [
  {
    semester: "Semester 1",
    subjects: [
      "Matrices and Calculus",
      "Physics",
      "Engineering Drawing and Design",
      "Electrical Technology",
      "Problem Solving Techniques using C",
      "Electronic Devices",
    ],
  },

  {
    semester: "Semester 2",
    subjects: [
      "Technical English",
      "Advanced Calculus and Statistics",
      "Chemistry",
      "Electrical Circuits and Network Analysis",
      "Python Programming",
      "Digital Logic Circuits",
    ],
  },

  {
    semester: "Semester 3",
    subjects: [
      "Transform Techniques and Complex Analysis",
      "Electronic Circuits",
      "Signals and Systems",
      "Electromagnetic Field Theory",
      "Data Structures using C",
      "Universal Human Values",
    ],
  },

  {
    semester: "Semester 4",
    subjects: [
      "Fourier Series and Numerical Methods",
      "Probability and Random Process",
      "Analog Integrated Circuits",
      "Analog and Digital Communication",
      "Digital Signal Processing",
      "Design Thinking and Innovations",
    ],
  },

  {
    semester: "Semester 5",
    subjects: [
      "Smart Antenna Systems",
      "CMOS VLSI Design",
      "Control Systems",
      "Microprocessor and Microcontroller",
      "Industry 5.0 for Electronics Engineers",
    ],
  },

  {
    semester: "Semester 6",
    subjects: [
      "Computer Networks",
      "HDL Digital Design",
      "Embedded Systems",
    ],
  },

  {
    semester: "Semester 7",
    subjects: [
      "Microwave and Optical Communication",
      "Cognitive IoT",
      "Project Work Phase I",
    ],
  },

  {
    semester: "Semester 8",
    subjects: [
      "Professional Elective 5",
      "Professional Elective 6",
      "Project Work Phase II",
    ],
  },
];

export default function NotesPage() {

  const [uploadedNotes, setUploadedNotes] = useState<any[]>([]);

  useEffect(() => {

    const fetchNotes = async () => {

      const q = query(
        collection(db, "notes"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUploadedNotes(notesData);

    };

    fetchNotes();

  }, []);

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-24 px-6 text-center">

        <h1 className="text-6xl md:text-7xl font-extrabold mb-8">
          Elevate Notes
        </h1>

        <p className="text-gray-400 text-xl leading-9 max-w-5xl mx-auto">
          Access structured semester-wise engineering notes,
          AI-enhanced explanations, important questions,
          handwritten notes, detailed concepts,
          and exam-focused learning resources.
        </p>

      </section>

      {/* SEMESTERS */}
      <section className="pb-32 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          {semesters.map((sem, index) => (

            <div
              key={index}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 transition duration-300"
            >

              <h2 className="text-4xl font-bold mb-8">
                {sem.semester}
              </h2>

              <div className="space-y-4">

                {sem.subjects.map((subject, idx) => (

                  availableSubjects[subject] ? (

                    <Link
                      href={availableSubjects[subject]}
                      key={idx}
                    >

                      <div className="bg-black border border-zinc-800 rounded-2xl px-5 py-4 hover:border-white transition cursor-pointer">

                        <p className="text-lg text-gray-300">
                          {subject}
                        </p>

                      </div>

                    </Link>

                  ) : (

                    <div
                      key={idx}
                      className="bg-black border border-zinc-800 rounded-2xl px-5 py-4 opacity-70"
                    >

                      <p className="text-lg text-gray-300">
                        {subject}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        Notes Coming Soon
                      </p>

                    </div>

                  )

                ))}

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* COMMUNITY NOTES */}
      <section className="pb-32 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-5xl font-extrabold mb-14 text-center">
            Community Uploaded Notes
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {uploadedNotes.map((note) => (

              <div
                key={note.id}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8"
              >

                <h3 className="text-2xl font-bold mb-4">
                  {note.subject}
                </h3>

                <p className="text-gray-400 mb-2">
                  {note.semester}
                </p>

                <p className="text-gray-500 mb-6">
                  {note.unit}
                </p>

                <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold">
                  View Notes
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}