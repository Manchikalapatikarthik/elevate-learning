import Navbar from "../../components/Navbar";

export default function ControlSystemsPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 text-center">

        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Control Systems
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-9 max-w-4xl mx-auto">
          Access complete unit-wise Control Systems notes,
          handwritten notes, stability analysis,
          frequency response techniques,
          controllers, compensation methods,
          and exam-focused learning materials.
        </p>

      </section>

      {/* Units Section */}
      <section className="pb-32 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

          {/* UNIT 1 */}
          <a
            href="/notes/control-systems/unit-1"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 1
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              System Concepts
            </h3>

            <p className="text-gray-400 leading-8">
              Open loop systems, closed loop systems,
              transfer functions, block diagrams,
              signal flow graphs, Mason’s gain formula,
              and mathematical modeling techniques.
            </p>
          </a>

          {/* UNIT 2 */}
          <a
            href="/notes/control-systems/unit-2"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 2
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Time Response Analysis
            </h3>

            <p className="text-gray-400 leading-8">
              Standard test signals, first and second order systems,
              steady state error, dynamic error constants,
              and time domain specifications.
            </p>
          </a>

          {/* UNIT 3 */}
          <a
            href="/notes/control-systems/unit-3"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 3
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Stability of Control Systems
            </h3>

            <p className="text-gray-400 leading-8">
              Routh Hurwitz criterion, root locus analysis,
              Nyquist stability criterion,
              pole-zero effects, and stability concepts.
            </p>
          </a>

          {/* UNIT 4 */}
          <a
            href="/notes/control-systems/unit-4"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 4
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Frequency Response Analysis
            </h3>

            <p className="text-gray-400 leading-8">
              Frequency response, bode plots,
              Nyquist plots, gain margin,
              phase margin, and time-frequency correlation.
            </p>
          </a>

          {/* UNIT 5 */}
          <a
            href="/notes/control-systems/unit-5"
            className="bg-zinc-950 border border-zinc-800 rounded-3xl p-10 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300"
          >
            <h2 className="text-3xl font-bold mb-5">
              Unit 5
            </h2>

            <h3 className="text-2xl text-gray-200 mb-4">
              Compensation and Controllers
            </h3>

            <p className="text-gray-400 leading-8">
              Lag compensation, lead compensation,
              lag-lead networks, P, PI, PID controllers,
              and bode plot-based controller design.
            </p>
          </a>

        </div>

      </section>

    </main>
  );
}