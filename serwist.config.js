import { readFileSync } from "node:fs";
import { serwist } from "@serwist/next/config";

// Read by `serwist build`, which runs after `next build` (see package.json) and
// writes the precache manifest into public/sw.js. Same stack as cg-autonomo.
//
// The prerendered pages come from `.next/prerender-manifest.json`, not from
// serwist's own glob of `.next/server/app/**/*.html` (`precachePrerendered`,
// off below). With a build adapter configured — Vercel sets one through
// `NEXT_ADAPTER_PATH` — Next 16.4 writes the prerendered HTML to
// `.next/server/route-cache/…` instead, so on Vercel the glob finds none of
// it, while a build without an adapter still writes to `.next/server/app`.
// Vercel's layout reproduces locally with any adapter module, e.g.
// `NEXT_ADAPTER_PATH=./adapter.cjs next build` for
// `module.exports = { name: "noop", async onBuildComplete() {} }`.
//
// `routeType: "page"` leaves out the route handlers and `initialStatus` the
// pages prerendered as an error; neither was ever in the precache, nor were the
// `/_…` error documents. The revision is the build id: the pages are fetched
// again once per deploy.
const next = (file) => readFileSync(`.next/${file}`, "utf8");
const buildId = next("BUILD_ID").trim();
const pages = Object.entries(JSON.parse(next("prerender-manifest.json")).routes)
  .filter(
    ([route, v]) =>
      v.routeType === "page" && !v.initialStatus && !route.startsWith("/_"),
  )
  .map(([route]) => route);

export default serwist({
  swSrc: "src/app/sw.js",
  swDest: "public/sw.js",
  precachePrerendered: false,
  additionalPrecacheEntries: pages.map((url) => ({ url, revision: buildId })),
});
