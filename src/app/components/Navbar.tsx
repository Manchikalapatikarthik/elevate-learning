export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">

      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Elevate Learning
        </h1>

        <div className="flex gap-8 text-lg">

          <a href="/" className="hover:text-gray-400 transition">
            Home
          </a>

          <a href="/about" className="hover:text-gray-400 transition">
            About
          </a>

          <a href="/blog" className="hover:text-gray-400 transition">
            Blog
          </a>

          <a href="/projects" className="hover:text-gray-400 transition">
            Projects
          </a>

          <a href="/contact" className="hover:text-gray-400 transition">
            Contact
          </a>

        </div>

      </div>

    </nav>
  );
}