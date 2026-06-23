import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col"
        >
          <span className="text-3xl font-extrabold text-white tracking-wider">
            ELEVIT
          </span>

          <span className="text-xs text-gray-400 tracking-wide">
            by Elevate Orbit
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm md:text-base">

          <Link
            href="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            About
          </Link>

          <Link
            href="/blog"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Insights
          </Link>

          <Link
            href="/projects"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Projects
          </Link>

          <Link
            href="/notes"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Notes
          </Link>

          <Link
            href="/upload"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Upload
          </Link>

          <Link
            href="/contact"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Contact
          </Link>

        </nav>

      </div>

    </header>
  );
}