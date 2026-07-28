# iker.io

This is the source code for [iker.io](https://iker.io) — my personal site, an
online CV dressed up as a desktop operating system. Client-rendered React on
Next.js (App Router, JavaScript), Redux state persisted to cookies, no backend.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

Build the application:

```bash
pnpm build
```

This runs `next build` and then `serwist build`, which writes the service worker
to `public/sw.js` — that file is generated, not committed.

Start the production server:

```bash
pnpm start
```

## Commands

| Command      | What it does                                             |
| ------------ | -------------------------------------------------------- |
| `pnpm dev`   | Dev server on :3000                                       |
| `pnpm build` | Production build + service worker                         |
| `pnpm start` | Serve the build                                           |
| `pnpm lint`  | Biome check and fix — run this, not `npx biome`            |
| `pnpm clean` | Wipe `.next`, `node_modules` and the generated `sw.js`     |

## Adding a post

Drop a Markdown file in `public/posts/`. `readme.md` becomes `/readme`, and any
new file becomes `/<its-name>` — the route enumerates the directory at build
time, so a post needs a rebuild to appear and any other path returns a 404.

Posts can write `{{YEARS}}` instead of a hardcoded number of years of
experience; it resolves from `CAREER_START` in `src/utils/constants.js`, which is
also where the page metadata and the web manifest get theirs.

## Branches and releases

`develop` is the preview deployment, `main` is production. Work happens on
`feature/<name>` or `bugfix/<name>` branches cut from `develop` and squash-merged
back into it. A release is a merge of `develop` into `main`, tagged with a plain
semver version (`4.0.0`, no `v` prefix).
