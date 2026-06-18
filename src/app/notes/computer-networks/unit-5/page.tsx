import Navbar from "../../../components/Navbar";

export default function Unit5Page() {
  const images = Array.from({ length: 13 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-40 px-6 pb-24">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-5xl font-bold mb-10">
            Unit 5 - Application Layer
          </h1>

          <div className="space-y-6">
            {images.map((num) => (
              <img
                key={num}
                src={`/notes/computer-networks/unit-5/${num}.jpg`}
                alt={`Page ${num}`}
                className="w-full rounded-xl"
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}