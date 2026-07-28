"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

export async function getPost(slug) {
  try {
    const filePath = path.join(process.cwd(), "public", "posts", `${slug}.md`);
    const markdown = await readFile(filePath, "utf-8");

    // Unsanitised on purpose: `slug` only ever resolves to a file committed to
    // public/posts (see the dynamicParams note in app/[slug]/page.js), so the
    // markdown is ours. If posts ever come from anywhere else, sanitise here —
    // this is the last point before the HTML reaches dangerouslySetInnerHTML in
    // molecules/window.js.
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
