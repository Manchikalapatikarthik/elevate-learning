import Navbar from "../../../components/Navbar";

export default function Unit3Page() {

  const images = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-40 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-12">
            Unit 3 — Stability of Control System
          </h1>

          <div className="space-y-10">

            {images.map((num) => (
              <img
                key={num}
                src={`/notes/control-systems/unit-3/${num}.jpg`}
                alt={`Page ${num}`}
                className="w-full rounded-2xl"
              />
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}