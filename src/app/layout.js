import Logger from "atoms/logger";
import ServiceWorkerRegister from "atoms/sw-register";
import StatusBar from "molecules/status-bar";
import PropTypes from "prop-types";
import CustomProvider from "store";

// Need to explicitly import it when adding <link> to the head
import "@fortawesome/fontawesome-svg-core/styles.css";
import "styles/globals.scss";
import styles from "styles/modules/home.module.scss";

export const metadata = {
  title: "Iker Garitaonandia | Software Developer",
  description:
    "Professional software developer with +15 years of experience helping companies achieve digital transformation.",
  keywords: [
    "Software developer",
    "Engineer",
    "Web developer",
    "JavaScript",
    "Frontend",
    "HTML",
    "CSS",
  ],
  authors: [{ name: "Iker Garitaonandia" }],
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", sizes: "16x16", url: "/wp/icon16.png" },
    { rel: "icon", sizes: "64x64", url: "/wp/icon64.png" },
    { rel: "icon", sizes: "192x192", url: "/wp/icon192.png" },
    { rel: "icon", sizes: "256x256", url: "/wp/icon256.png" },
    { rel: "apple-touch-icon", sizes: "16x16", url: "/wp/icon16.png" },
    { rel: "apple-touch-icon", sizes: "64x64", url: "/wp/icon64.png" },
    { rel: "apple-touch-icon", sizes: "192x192", url: "/wp/icon192.png" },
    { rel: "apple-touch-icon", sizes: "256x256", url: "/wp/icon256.png" },
  ],
  openGraph: {
    title: "Iker Garitaonandia | Software Developer",
    description:
      "Professional software developer with +15 years of experience helping companies achieve digital transformation.",
    siteName: "Iker Garitaonandia | Software Developer",
    type: "article",
    url: "https://iker.io",
    images: [
      {
        url: "https://www.gravatar.com/avatar/d2c9e46c4f3ca57f01afb4fd2dcd7b9d?s=200",
      },
    ],
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
  themeColor: "#0E5389",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>
          <div className={styles.container}>
            <StatusBar title={metadata.title} />
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
