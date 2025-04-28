"use client";

import { useEffect } from "react";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const usePushNotifications = () => {
  useEffect(() => {
    async function subscribeUser() {
      if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
        console.warn("Push messaging jest nieobsługiwany w tej przeglądarce.");
        return;
      }

      const permission = await Notification.requestPermission();
      console.log("Permission:", permission);

      if (permission !== "granted") {
        console.warn("Brak zgody na powiadomienia");
        return;
      }

      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
      });

      console.log("Subskrypcja utworzona:", subscription);

      await fetch("/api/save-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      console.log("Subskrypcja zapisana na serwerze");
    }

    subscribeUser();
  }, []);
}

export default usePushNotifications;
