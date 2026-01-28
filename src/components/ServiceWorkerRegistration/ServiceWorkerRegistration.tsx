"use client";

import { useEffect } from "react";
import { registerServiceWorker } from "@/src/lib/service-worker";

export const ServiceWorkerRegistration = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return null;
};
