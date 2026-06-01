import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-40 px-6 pb-24">

        <div className="max-w-5xl mx-auto">

          <h1 className="text-6xl font-bold mb-10">
            About Elevate Learning
          </h1>

          <p className="text-gray-400 text-xl leading-9 mb-8">
            Elevate Learning is a modern educational and technology ecosystem
            designed to empower engineering students through AI-driven learning,
            technical education, innovation, and project-based experiences.
          </p>

          <p className="text-gray-400 text-xl leading-9 mb-8">
            Our mission is to simplify complex engineering concepts,
            provide structured learning resources, and create a platform
            where students can access notes, technical blogs,
            AI-powered video learning, placement preparation,
            and real-world engineering projects.
          </p>

          <p className="text-gray-400 text-xl leading-9">
            Elevate Learning aims to become a complete ecosystem for
            future engineers, innovators, developers, and creators
            by combining education, technology, and innovation
            into one unified platform.
          </p>

        </div>

      </section>

    </main>
  );
}