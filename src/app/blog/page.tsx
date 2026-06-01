import Navbar from "../components/Navbar";
import Link from "next/link";

import { getAllPosts } from "../../lib/posts";

export default function BlogPage() {

  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="pt-40 px-6 pb-24">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-6xl font-bold mb-10">
            Technical Blog
          </h1>

          <p className="text-gray-400 text-xl leading-9 mb-16">
            Explore engineering tutorials, AI innovations,
            embedded systems, IoT projects, technical insights,
            and educational content designed for students
            and future engineers.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            {posts.map((post) => (

              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
              >

                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 hover:border-white hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/10 transition duration-300 cursor-pointer h-full">

                  <p className="text-sm text-gray-500 mb-4">
                    {post.date}
                  </p>

                  <h2 className="text-3xl font-bold mb-4">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 leading-8">
                    {post.excerpt}
                  </p>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}