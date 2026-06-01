import Navbar from "../../components/Navbar";

export default function SmartAntennaPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Smart Antenna Systems
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-9 max-w-5xl mx-auto">
          Complete handwritten notes, antenna theory,
          radiation patterns, wave propagation,
          smart antennas, transmission lines,
          arrays, and microwave engineering concepts.
        </p>

      </section>

      {/* Units */}
      <section className="pb-32 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          {/* UNIT 1 */}
          <a
            href="/notes/smart-antenna-systems/unit-1"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 1
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Antenna Fundamentals and Wire Antennas
            </h3>

            <p className="text-gray-400 leading-8">
              Radiation mechanism, antenna parameters,
              dipole antennas, monopole antennas,
              radiation resistance,
              and antenna fields.
            </p>
          </a>

          {/* UNIT 2 */}
          <a
            href="/notes/smart-antenna-systems/unit-2"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 2
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Antenna Arrays
            </h3>

            <p className="text-gray-400 leading-8">
              Broadside arrays, end fire arrays,
              Hansen-Woodyard arrays,
              pattern multiplication,
              and binomial arrays.
            </p>
          </a>

          {/* UNIT 3 */}
          <a
            href="/notes/smart-antenna-systems/unit-3"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 3
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Travelling Wave and Broadband Antennas
            </h3>

            <p className="text-gray-400 leading-8">
              Yagi-Uda arrays, reflector antennas,
              horn antennas, microstrip antennas,
              broadband antennas,
              and smart antennas.
            </p>
          </a>

          {/* UNIT 4 */}
          <a
            href="/notes/smart-antenna-systems/unit-4"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 4
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Transmission Line Theory
            </h3>

            <p className="text-gray-400 leading-8">
              Transmission lines, reflection coefficient,
              standing wave ratio,
              line losses,
              impedance matching,
              and quarter-wave transformers.
            </p>
          </a>

          {/* UNIT 5 */}
          <a
            href="/notes/smart-antenna-systems/unit-5"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 5
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Measurements and Waveguides
            </h3>

            <p className="text-gray-400 leading-8">
              Waveguides, resonators,
              microwave measurements,
              cavity resonators,
              impedance measurements,
              and microwave components.
            </p>
          </a>

        </div>

      </section>

    </main>
  );
}