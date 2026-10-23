import { readFileSync } from "node:fs";
import { serwist } from "@serwist/next/config";

// Read by `serwist build`, which runs after `next build` (see package.json) and
// writes the precache manifest into public/sw.js. Same stack as cg-autonomo.
//
// The prerendered pages come from `.next/prerender-manifest.json`, not from
// serwist's own glob of `.next/server/app/**/*.html` (`precachePrerendered`,
// off below): Vercel's build adapter takes those HTML files out of the tree
// before `serwist build` runs, so on Vercel the glob finds none of them while a
// local build still does. Route handlers and the `/_…` error documents sit in
// the manifest too but were never in the precache. The revision is the build
// id: the pages are fetched again once per deploy.
const next = (file) => readFileSync(`.next/${file}`, "utf8");
const buildId = next("BUILD_ID").trim();
const pages = Object.keys(
  JSON.parse(next("prerender-manifest.json")).routes,
).filter((route) => !route.startsWith("/_") && !/\.[a-z0-9]+$/i.test(route));

export default serwist({
  swSrc: "src/app/sw.js",
  swDest: "public/sw.js",
  precachePrerendered: false,
  additionalPrecacheEntries: pages.map((url) => ({ url, revision: buildId })),
});
