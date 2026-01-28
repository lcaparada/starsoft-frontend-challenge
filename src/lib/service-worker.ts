export const registerServiceWorker = () => {
  if (typeof window === "undefined") return;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
        })
        .then((registration) => {
          console.log(
            "[Service Worker] Registration successful:",
            registration.scope
          );

          setInterval(
            () => {
              registration.update();
            },
            60 * 60 * 1000
          );

          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("[Service Worker] New version available");
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error("[Service Worker] Registration failed:", error);
        });
    });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("[Service Worker] Controller changed, reloading page...");
      window.location.reload();
    });
  }
};

export const unregisterServiceWorker = async () => {
  if (typeof window === "undefined") return;

  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.ready;
    const unregistered = await registration.unregister();
    if (unregistered) {
      console.log("[Service Worker] Unregistered successfully");
    }
  }
};
