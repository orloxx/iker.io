import { getPost } from "lib/actions";
import { getPosts } from "lib/posts";
import Desktop from "molecules/desktop";
import Window from "molecules/window";
import { notFound } from "next/navigation";

// Posts are files committed to the repo, so generateStaticParams() below knows
// every valid slug at build time. Without this, Next renders unlisted slugs on
// demand and answers HTTP 200 — notFound() alone does NOT fix that, it renders
// the 404 body with a 200 status. This is what makes the status code honest.
export const dynamicParams = false;

// Shares lib/posts.js with app/sitemap.js on purpose: the set of slugs that
// answer 200 and the set the sitemap advertises are the same set, read once.
export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(({ slug }) => ({ slug }));
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
