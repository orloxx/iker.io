import { SITE_URL } from "utils/constants";

// Next generates /robots.txt from this, the same file convention manifest.js
// uses. Until unknown paths started returning a real 404, this path served the
// app shell with HTTP 200 — a crawler asking for robots.txt got a page of HTML
// claiming to be one, so there was nothing worth putting here.
//
// /qr and /settings are tools, not content: they say nothing about who I am and
// would dilute the relevance of a site whose whole job is to be found by name.
// They stay reachable and linked, just not indexed. See plan DECISIONS.md #5.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/qr", "/settings"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
