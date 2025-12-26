"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

export async function getPost(slug) {
  try {
    const filePath = path.join(process.cwd(), "public", "posts", `${slug}.md`);
    const markdown = await readFile(filePath, "utf-8");

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
