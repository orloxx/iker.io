import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const POSTS_DIRECTORY = path.join(process.cwd(), "public", "posts");

/**
 * Every post committed to public/posts, with its file's last-modified time.
 *
 * Two callers derive their routes from this and must not drift:
 * generateStaticParams() in app/[slug]/page.js, which decides which slugs exist
 * at all — and therefore which ones answer 200 rather than 404 — and
 * app/sitemap.js, which tells crawlers about them. Hand-listing either is how a
 * post ends up routable but invisible to search, or listed in the sitemap and
 * 404ing when a crawler follows it.
 *
 * @return {Promise<Array<{slug: string, lastModified: Date}>>}
 */
export async function getPosts() {
  const filenames = await readdir(POSTS_DIRECTORY);

  return Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".md"))
      .map(async (filename) => {
        const { mtime } = await stat(path.join(POSTS_DIRECTORY, filename));

        return { slug: filename.replace(/\.md$/, ""), lastModified: mtime };
      }),
  );
}
