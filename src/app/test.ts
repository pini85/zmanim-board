import { useEffect, useState } from "react";

const POLLING_INTERVAL = 10_000; // 10 seconds

export function useVersionCheck() {
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const res = await fetch("/api/version");
        if (!res.ok) throw new Error("Failed to fetch build ID");

        const { buildId } = await res.json();

        if (currentBuildId && buildId !== currentBuildId) {
          console.log("New version detected! Reloading...");
          window.location.reload();
        } else {
          console.log("No new version detected");
        }

        setCurrentBuildId(buildId);
      } catch (error) {
        console.error("Version check failed:", error);
      }
    };

    checkForUpdate(); // Run immediately
    const interval = setInterval(checkForUpdate, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [currentBuildId]);

  return null;
}
