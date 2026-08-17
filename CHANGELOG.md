# Changelog

Every release, newest first — one entry per tag on `main`. The entry is written in the
release commit, beside the `package.json` bump. This file is the index, not the story:
the detail lives in the issues each entry cites and in `git log`.

## 4.3.1 — 2026-08-18

The two advisories that opened after M2 closed all 45: nanoid 3.3.18
(GHSA-2v37-7h3g-55p8) under postcss, brace-expansion 5.0.9 (GHSA-rgw5-rvv9-x895) under
Serwist's minimatch. Both transitive and both inside their parents' ranges, so the
lockfile moved alone — no direct dependency, no new override.

## 4.3.0 — 2026-08-18

A tufiscal icon on the desktop, linking out to tufiscal.es — the mark copied in from
cg-autonomo rather than hotlinked, so `next/image` keeps its gravatar-only remote
pattern. Also the first release to carry this file, backfilled to 4.0.0.

## 4.2.1 — 2026-07-30

BUG-009: the sitemap's post `<lastmod>` dropped rather than re-sourced — git restores
no mtimes, so Vercel's clone stamped every post with the build and the sitemap claimed
the CV changed on every deploy. The field is optional, and a source that always says
«just now» gets discounted anyway.

## 4.2.0 — 2026-07-28

M1 — crawler files: `robots.txt` and `sitemap.xml`, the post routes derived from the
single reader of `public/posts/` so a post cannot be routable but unlisted; `/qr` and
`/settings` disallowed (DECISIONS #5). M2 — dependency health: all 45 advisories
closed by upgrading, none dismissed — React 19, react-redux 9, marked 18, js-cookie 3,
`node-fetch` removed — with the whole runtime surface driven in Chrome before release.

## 4.1.0 — 2026-07-28

The 2026-07-28 bugfix round: real HTTP status codes (BUG-001), a real Serwist PWA
(BUG-002), `constants.js` as the one source of the site's content facts (BUG-006), a
real README (BUG-007), and the first semver tags on `main` (BUG-004).

## 4.0.0 — 2026-07-28

The desktop CV with the QR share feature — the site as it stood when the version
convention arrived (BUG-004).
