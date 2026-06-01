import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
  const fileNames = fs.readdirSync(postsDirectory);

  const posts = fileNames.map((fileName) => {
    const slug = fileName.replace(".md", "");

    const fullPath = path.join(postsDirectory, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      slug,
      ...(matterResult.data as {
        title: string;
        date: string;
        excerpt: string;
      }),
    };
  });

  return posts;
}