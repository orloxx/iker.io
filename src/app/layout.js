import Logger from "atoms/logger";
import ServiceWorkerRegister from "atoms/sw-register";
import StatusBar from "molecules/status-bar";
import PropTypes from "prop-types";
import CustomProvider from "store";
import {
  APP_ICONS,
  DESCRIPTION,
  GRAVATAR,
  KEYWORDS,
  NAME,
  SITE_TITLE,
  SITE_URL,
  THEME_COLOR,
} from "utils/constants";

// Need to explicitly import it when adding <link> to the head
import "@fortawesome/fontawesome-svg-core/styles.css";
import "styles/globals.scss";
import styles from "styles/modules/home.module.scss";

// Every string here comes from utils/constants — see the note at the top of that
// file. The manifest is not listed: app/manifest.js generates it and Next adds
// the <link rel="manifest"> itself.
export const metadata = {
  title: SITE_TITLE,
  description: DESCRIPTION,
  keywords: KEYWORDS,
  authors: [{ name: NAME }],
  icons: APP_ICONS.flatMap(({ src, sizes }) => [
    { rel: "icon", sizes, url: src },
    { rel: "apple-touch-icon", sizes, url: src },
  ]),
  openGraph: {
    title: SITE_TITLE,
    description: DESCRIPTION,
    siteName: SITE_TITLE,
    type: "article",
    url: SITE_URL,
    images: [{ url: GRAVATAR }],
  },
  appleWebApp: {
    capable: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "msapplication-starturl": "/",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: THEME_COLOR,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>
          <div className={styles.container}>
            <StatusBar title={SITE_TITLE} />
            {children}
            <Logger />
            <ServiceWorkerRegister />
          </div>
        </CustomProvider>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
