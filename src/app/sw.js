import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";

// Source for the service worker. `serwist build` compiles this file and injects
// the precache manifest as self.__SW_MANIFEST — it is not a route, App Router
// ignores any file in app/ that isn't a special filename.
const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    concurrency: 10,
  },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

serwist.addEventListeners();
