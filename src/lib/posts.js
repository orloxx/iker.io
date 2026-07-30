import { readdir } from "node:fs/promises";
import path from "node:path";

const POSTS_DIRECTORY = path.join(process.cwd(), "public", "posts");

/**
 * Every post committed to public/posts.
 *
 * Two callers derive their routes from this and must not drift:
 * generateStaticParams() in app/[slug]/page.js, which decides which slugs exist
 * at all — and therefore which ones answer 200 rather than 404 — and
 * app/sitemap.js, which tells crawlers about them. Hand-listing either is how a
 * post ends up routable but invisible to search, or listed in the sitemap and
 * 404ing when a crawler follows it.
 *
 * The slug is all this returns, deliberately: there is no last-modified date.
 * It used to also return the file's mtime, which is right locally and wrong
 * everywhere that matters — git does not record or restore mtimes, so a host
 * that clones the repo stamps every file with the moment it cloned, and the
 * sitemap then told crawlers the CV had changed on every unrelated deploy
 * (BUG-009). Do not reintroduce a date read from the filesystem. A date here
 * would have to come from the content itself to survive a deploy.
 *
 * @return {Promise<Array<{slug: string}>>}
 */
export async function getPosts() {
  const filenames = await readdir(POSTS_DIRECTORY);

  return filenames
    .filter((filename) => filename.endsWith(".md"))
    .map((filename) => ({ slug: filename.replace(/\.md$/, "") }));
}
