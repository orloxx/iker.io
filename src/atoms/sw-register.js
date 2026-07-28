"use client";

import { useEffect } from "react";

// public/sw.js only exists after `serwist build`, which runs as part of
// `pnpm build` — so there is nothing to register against `next dev`.
function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker.register("/sw.js");
  }, []);

  return null;
}

export default ServiceWorkerRegister;
