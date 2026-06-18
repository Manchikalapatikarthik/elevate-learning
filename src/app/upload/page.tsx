"use client";

import Navbar from "../components/Navbar";

import { useState } from "react";

import {
  collection,
  addDoc,
} from "firebase/firestore";

import { db } from "../../firebase";

import MyUploadButton from "../components/MyUploadButton";

export default function UploadPage() {

  const [semester, setSemester] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [unit, setUnit] =
    useState("");

  // FILE DATA
  const [fileData, setFileData] =
    useState({

      fileUrl: "",
      fileKey: "",

    });

  const [loading, setLoading] =
    useState(false);

  // SUBMIT
  const handleSubmit = async () => {

    if (
      !semester ||
      !subject ||
      !unit ||
      !fileData.fileUrl
    ) {

      alert(
        "Please fill all fields and upload file"
      );

      return;

    }

    try {

      setLoading(true);

      await addDoc(
        collection(db, "notes"),
        {

          semester,
          subject,
          unit,

          // FILE DATA
          fileUrl:
            fileData.fileUrl,

          fileKey:
            fileData.fileKey,

          createdAt:
            new Date(),

        }
      );

      alert(
        "Notes Uploaded Successfully"
      );

      // RESET
      setSemester("");
      setSubject("");
      setUnit("");

      setFileData({

        fileUrl: "",
        fileKey: "",

      });

    } catch (error) {

      console.log(error);

      alert(
        "Upload Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* HERO */}
      <section className="pt-40 pb-20 px-6 text-center">

        <h1 className="text-6xl md:text-7xl font-extrabold mb-6">

          Upload Notes

        </h1>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-8">

          Share engineering notes,
          handwritten materials,
          PDFs, and study resources.

        </p>

      </section>

      {/* FORM */}
      <section className="pb-32 px-6">

        <div className="max-w-3xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-10">

          {/* Semester */}
          <div className="mb-8">

            <label className="block text-lg font-semibold mb-3">

              Semester

            </label>

            <select
              value={semester}
              onChange={(e) =>
                setSemester(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white"
            >

              <option value="">
                Select Semester
              </option>

              <option>
                Semester 1
              </option>

              <option>
                Semester 2
              </option>

              <option>
                Semester 3
              </option>

              <option>
                Semester 4
              </option>

              <option>
                Semester 5
              </option>

              <option>
                Semester 6
              </option>

              <option>
                Semester 7
              </option>

              <option>
                Semester 8
              </option>

            </select>

          </div>

          {/* Subject */}
          <div className="mb-8">

            <label className="block text-lg font-semibold mb-3">

              Subject

            </label>

            <input
              type="text"
              placeholder="Enter Subject Name"
              value={subject}
              onChange={(e) =>
                setSubject(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white"
            />

          </div>

          {/* Unit */}
          <div className="mb-8">

            <label className="block text-lg font-semibold mb-3">

              Unit

            </label>

            <select
              value={unit}
              onChange={(e) =>
                setUnit(e.target.value)
              }
              className="w-full bg-black border border-zinc-700 rounded-xl px-5 py-4 text-white"
            >

              <option value="">
                Select Unit
              </option>

              <option>
                Unit 1
              </option>

              <option>
                Unit 2
              </option>

              <option>
                Unit 3
              </option>

              <option>
                Unit 4
              </option>

              <option>
                Unit 5
              </option>

            </select>

          </div>

          {/* UPLOAD */}
          <div className="mb-10">

            <label className="block text-lg font-semibold mb-5">

              Upload Notes File

            </label>

            <MyUploadButton
              setFileData={setFileData}
            />

          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg"
          >

            {loading
              ? "Uploading..."
              : "Submit Notes"}

          </button>

        </div>

      </section>

    </main>

  );

}

