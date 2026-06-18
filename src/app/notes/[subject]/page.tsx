"use client";
import Navbar from "../../components/Navbar";

import { useEffect, useState } from "react";

import { db } from "../../../firebase";

import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {

  const [notes, setNotes] =
    useState<any[]>([]);

  const [subjectName,
    setSubjectName] =
    useState("");

  // DELETE NOTE
  const deleteNote = async (
    id: string
  ) => {

    try {

      await deleteDoc(
        doc(db, "notes", id)
      );

      setNotes(

        notes.filter(
          (note) =>
            note.id !== id
        )

      );

      alert(
        "Note Deleted"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Delete Failed"
      );

    }

  };

  useEffect(() => {

    const loadSubjectAndNotes =
      async () => {

        const resolvedParams =
          await params;

        const formatted =
          resolvedParams.subject

            .split("-")

            .map((word) => {

              if (
                word === "and"
              ) {

                return "and";

              }

              return (

                word
                  .charAt(0)
                  .toUpperCase()

                +

                word
                  .slice(1)

              );

            })

            .join(" ");

        setSubjectName(
          formatted
        );

        const q = query(

          collection(
            db,
            "notes"
          ),

          where(
            "subject",
            "==",
            formatted
          )

        );

        const snapshot =
          await getDocs(q);

        const notesData =
          snapshot.docs.map(
            (doc) => ({

              id: doc.id,

              ...doc.data(),

            })
          );

        setNotes(
          notesData
        );

      };

    loadSubjectAndNotes();

  }, [params]);

  return (

    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="pt-40 px-6 pb-32">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-6xl font-extrabold mb-8">

            {subjectName}

          </h1>

          <p className="text-gray-400 text-xl leading-9 mb-16">

            Subject notes,
            unit-wise materials,
            important questions,
            handwritten notes,
            and learning resources.

          </p>

          {/* NO NOTES */}
          {notes.length === 0 ? (

            <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-6">

                No Notes Yet

              </h2>

              <p className="text-gray-400 leading-8">

                Upload notes for this subject.

              </p>

            </div>

          ) : (

            /* NOTES GRID */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {notes.map((note) => (

                <div
                  key={note.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8"
                >

                  <h2 className="text-2xl font-bold mb-4">

                    {note.subject}

                  </h2>

                  <p className="text-gray-400 mb-2">

                    {note.semester}

                  </p>

                  <p className="text-gray-500 mb-6">

                    {note.unit}

                  </p>

                  <div className="flex flex-col gap-4">

                    {/* VIEW NOTES */}
                    <a
                      href={
                        note.fileUrl ||
                        note.fileURL
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300 text-center"
                    >

                      View Notes

                    </a>

                    {/* DELETE NOTE */}
                    <button
                      onClick={() =>
                        deleteNote(
                          note.id
                        )
                      }
                      className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition duration-300"
                    >

                      Delete Note

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

    </main>

  );

}