import { readdir } from "node:fs/promises";
import path from "node:path";
import { getPost } from "lib/actions";
import Desktop from "molecules/desktop";
import Window from "molecules/window";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "public", "posts");
  const filenames = await readdir(postsDirectory);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({
      slug: filename.replace(/\.md$/, ""),
    }));
}

export default async function SlugPage({ params }) {
  const { slug } = await params;
  const { html, error } = await getPost(slug);

  return (
    <>
      <Desktop />
      <Window slug={slug} html={html} error={error} />
    </>
  );
}
