import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ComputerNetworksPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-40 px-6 pb-24">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold mb-8">
            Computer Networks
          </h1>

          <p className="text-gray-400 text-xl leading-9 mb-16">
            Unit-wise handwritten notes for Computer Networks.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            <Link href="/notes/computer-networks/unit-1">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:border-white">
                <h2 className="text-3xl font-bold mb-4">
                  Unit 1
                </h2>
                <p>Network Fundamentals</p>
              </div>
            </Link>

            <Link href="/notes/computer-networks/unit-2">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:border-white">
                <h2 className="text-3xl font-bold mb-4">
                  Unit 2
                </h2>
                <p>Data Link Layer</p>
              </div>
            </Link>

            <Link href="/notes/computer-networks/unit-3">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:border-white">
                <h2 className="text-3xl font-bold mb-4">
                  Unit 3
                </h2>
                <p>Network Layer</p>
              </div>
            </Link>

            <Link href="/notes/computer-networks/unit-4">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:border-white">
                <h2 className="text-3xl font-bold mb-4">
                  Unit 4
                </h2>
                <p>Transport Layer</p>
              </div>
            </Link>

            <Link href="/notes/computer-networks/unit-5">
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 cursor-pointer hover:border-white">
                <h2 className="text-3xl font-bold mb-4">
                  Unit 5
                </h2>
                <p>Application Layer</p>
              </div>
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}