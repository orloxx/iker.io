import { getPosts } from "lib/posts";
import { SITE_URL } from "utils/constants";

// Next generates /sitemap.xml from this at build time.
//
// The post routes are DERIVED from public/posts via lib/posts.js — the same
// source app/[slug]/page.js uses to decide which slugs exist. Do not hand-list
// them: a slug that is routable but missing here is invisible to search, and
// one listed here but not routable is a 404 in a crawler's face. Keeping both
// on one reader is what makes those two failures impossible.
//
// /qr and /settings are deliberately absent — robots.js disallows them, and a
// sitemap entry for a disallowed path is a contradiction. If that decision is
// ever reversed, both files change together.
export default async function sitemap() {
  const posts = await getPosts();

  return [
    // The desktop is rendered from source, not from a file with an mtime, so
    // the build is the most accurate "last modified" available for it — the
    // site only changes when it is rebuilt and redeployed.
    { url: SITE_URL, lastModified: new Date() },
    // Posts carry no lastModified, on purpose. The only date a build can see is
    // the file's mtime, and a host that clones the repo sets that to the clone
    // — git restores no mtimes — so every post claimed to have changed on every
    // unrelated deploy (BUG-009). lastmod is optional in the sitemap protocol
    // and a hint at best to crawlers, so omitting it costs nothing and asserts
    // nothing; the mtime asserted something false. Only add it back with a date
    // that lives in the content and survives a fresh clone.
    ...posts.map(({ slug }) => ({ url: `${SITE_URL}/${slug}` })),
  ];
}
