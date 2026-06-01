import Navbar from "../../../components/Navbar";

export default function Unit3Page() {

  const images = Array.from({ length: 22 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-40 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-12">
            Unit 3 — Travelling Wave and Broadband Antennas
          </h1>

          <div className="space-y-10">

            {images.map((num) => (
              <img
                key={num}
                src={`/notes/smart-antenna-systems/unit-3/3-${String(num).padStart(2, "0")}.jpg`}
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