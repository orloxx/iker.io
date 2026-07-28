"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { EXPERIENCE_YEARS } from "utils/constants";

// Posts may write {{YEARS}} instead of hardcoding how long I've been doing this;
// it resolves to the figure derived from CAREER_START, the same one the page
// metadata and the manifest use. See utils/constants.js.
const TOKENS = {
  "{{YEARS}}": String(EXPERIENCE_YEARS),
};

function resolveTokens(markdown) {
  return Object.entries(TOKENS).reduce(
    (text, [token, value]) => text.replaceAll(token, value),
    markdown,
  );
}

export async function getPost(slug) {
  try {
    const filePath = path.join(process.cwd(), "public", "posts", `${slug}.md`);
    const markdown = resolveTokens(await readFile(filePath, "utf-8"));

    // Unsanitised on purpose: `slug` only ever resolves to a file committed to
    // public/posts (see the dynamicParams note in app/[slug]/page.js), so the
    // markdown is ours. If posts ever come from anywhere else, sanitise here —
    // this is the last point before the HTML reaches dangerouslySetInnerHTML in
    // molecules/window.js.
    //
    // Still synchronous, and still passes raw HTML through verbatim, on marked
    // v18 as on v4 — both were re-measured across that upgrade, since either
    // one changing would have moved that trust boundary. What v18 did drop is
    // the automatic id="" on headings (marked removed headerIds in v7); no page
    // links to those anchors, so restoring them would mean taking on a plugin
    // dependency for an anchor nothing uses.
    return {
      markdown,
      html: marked(markdown),
    };
  } catch (error) {
    return {
      error: {
        status: 404,
        statusText: "Not Found",
        message: error.message,
      },
    };
  }
}
