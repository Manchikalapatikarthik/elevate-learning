import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl md:text-7xl font-extrabold mb-8">
            About ELEVIT
          </h1>

          <p className="text-gray-400 text-xl leading-9 max-w-5xl mb-10">
            ELEVIT was born from the idea of
            <span className="text-white font-semibold"> Elevate Orbit</span>.
            Just as planets revolve around the sun, a student's life revolves
            around learning, projects, innovation, research, careers, and
            personal growth. Elevate Orbit represents this journey by bringing
            every important aspect of student development into one connected
            ecosystem.
          </p>

          <p className="text-gray-400 text-xl leading-9 max-w-5xl mb-10">
            The name
            <span className="text-white font-semibold"> ELEVIT </span>
            is derived from Elevate Orbit and symbolizes continuous growth,
            curiosity, and innovation. Our vision is to provide structured
            notes, technical insights, project guidance, and learning resources
            that help students learn, build, and create with confidence.
          </p>

          <p className="text-gray-400 text-xl leading-9 max-w-5xl">
            Whether you are preparing for examinations, developing projects,
            exploring emerging technologies, or planning your career, ELEVIT
            is designed to support every stage of your academic journey.
          </p>

          <div className="mt-16">
            <p className="text-gray-500 text-lg">
              Created by
            </p>

            <p className="text-white text-2xl font-semibold mt-2">
              Manchikalapati Karthik
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}