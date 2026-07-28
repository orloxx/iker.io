import { serwist } from "@serwist/next/config";

// Read by `serwist build`, which runs after `next build` (see package.json) and
// writes the precache manifest into public/sw.js. Same stack as cg-autonomo.
export default serwist({
  swSrc: "src/app/sw.js",
  swDest: "public/sw.js",
});
