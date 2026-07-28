import { readdir } from "node:fs/promises";
import path from "node:path";
import { getPost } from "lib/actions";
import Desktop from "molecules/desktop";
import Window from "molecules/window";
import { notFound } from "next/navigation";

// Posts are files committed to the repo, so generateStaticParams() below knows
// every valid slug at build time. Without this, Next renders unlisted slugs on
// demand and answers HTTP 200 — notFound() alone does NOT fix that, it renders
// the 404 body with a 200 status. This is what makes the status code honest.
export const dynamicParams = false;

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

  // getPost() returns an error object rather than throwing, so an unknown slug
  // would otherwise render the app shell with HTTP 200 — a soft 404. notFound()
  // is what turns the miss into a real status code; don't render past it.
  if (error) notFound();

  return (
    <>
      <Desktop />
      <Window html={html} />
    </>
  );
}
