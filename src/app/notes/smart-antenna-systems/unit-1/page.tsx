import Navbar from "../../../components/Navbar";

export default function Unit1Page() {

  const images = Array.from({ length: 23 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-40 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-12">
            Unit 1 — Antenna Fundamentals and Wire Antennas
          </h1>

          <div className="space-y-10">

            {images.map((num) => (
              <img
                key={num}
                src={`/notes/smart-antenna-systems/unit-1/1-${String(num).padStart(2, "0")}.jpg`}
                alt={`Page ${num}`}
                className="w-full rounded-2xl"
                loading="lazy"
              />
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}