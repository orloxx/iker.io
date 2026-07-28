import {
  APP_ICONS,
  DESCRIPTION,
  SITE_TITLE,
  THEME_COLOR,
} from "utils/constants";

// Replaces the hand-maintained public/manifest.json, which was a second copy of
// the metadata in layout.js and had already drifted from it. Next serves this at
// /manifest.webmanifest and injects the <link rel="manifest"> automatically.
export default function manifest() {
  return {
    name: SITE_TITLE,
    short_name: "Iker IO",
    description: DESCRIPTION,
    lang: "en-US",
    start_url: "/?source=pwa",
    scope: "/",
    display: "fullscreen",
    theme_color: THEME_COLOR,
    background_color: THEME_COLOR,
    icons: APP_ICONS,
    shortcuts: [
      {
        name: "Read more about me",
        short_name: "README",
        description: "My CV",
        url: "/readme?source=pwa",
        icons: APP_ICONS,
      },
    ],
  };
}
