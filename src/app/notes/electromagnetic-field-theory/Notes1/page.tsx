"use client";

import Navbar from "../../../components/Navbar";

export default function Notes1() {
  const totalPages = 30;

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-36 pb-16 px-6">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-3">
            Electromagnetic Field Theory
          </h1>

          <p className="text-gray-400 mb-12">
            Notes Set 1
          </p>

          <div className="space-y-8">
            {Array.from({ length: totalPages }, (_, i) => (
              <img
                key={i}
                src={`/notes/electromagnetic-field-theory/Notes1/${i + 1}.jpg`}
                alt={`Page ${i + 1}`}
                className="w-full rounded-xl border border-zinc-800"
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}