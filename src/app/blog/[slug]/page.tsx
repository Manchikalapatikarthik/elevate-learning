import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

import Navbar from "../../components/Navbar";

type Params = Promise<{ slug: string }>;

export default async function PostPage({
  params,
}: {
  params: Params;
}) {

  const { slug } = await params;

  const fullPath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  const contentHtml = processedContent.toString();

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <article className="max-w-4xl mx-auto px-6 pt-40 pb-24">

        <p className="text-gray-500 mb-6">
          {matterResult.data.date}
        </p>

        <h1 className="text-5xl font-bold mb-10">
          {matterResult.data.title}
        </h1>

        <div
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

      </article>

    </main>
  );
}