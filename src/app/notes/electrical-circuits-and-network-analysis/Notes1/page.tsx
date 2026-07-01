import Image from "next/image";
import Navbar from "../../../components/Navbar";

export default function ElectricalCircuitsAndNetworkAnalysisNotes1() {
  const images = Array.from({ length: 45 }, (_, i) => i + 1);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-36 pb-24 px-6">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-5xl font-bold mb-4">
            Electrical Circuits and Network Analysis
          </h1>

          <p className="text-xl text-gray-400 mb-12">
            Notes 1
          </p>

          <div className="space-y-10">

            {images.map((page) => (
              <div key={page} className="space-y-3">

                <p className="text-center text-gray-400 text-lg">
                  Page {page}
                </p>

                <Image
                  src={`/notes/electrical-circuits-and-network-analysis/Notes1/${page}.jpg`}
                  alt={`Page ${page}`}
                  width={1200}
                  height={1700}
                  className="w-full rounded-xl border border-zinc-800"
                  priority={page === 1}
                />

              </div>
            ))}

          </div>

        </div>
      </section>
    </main>
  );
}