export default function Navbar() {
  return (

    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

        {/* Logo */}
        <a
          href="/"
          className="text-3xl font-extrabold text-white tracking-wide"
        >
          Elevate Learning
        </a>

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm md:text-base">

          <a
            href="/"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Home
          </a>

          <a
            href="/about"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            About
          </a>

          <a
            href="/blog"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Blog
          </a>

          <a
            href="/projects"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Projects
          </a>

          <a
            href="/notes"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Notes
          </a>

          <a
            href="/upload"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Upload
          </a>

          <a
            href="/contact"
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Contact
          </a>

        </nav>

      </div>

    </header>

  );
}