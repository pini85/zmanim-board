"use client";
import { useEffect, useState } from "react";

const POLLING_INTERVAL = 60 * 60 * 1000; // 1 hour (60 min * 60 sec * 1000 ms)

export function VersionChecker() {
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);

  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const res = await fetch("/api/version", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch build ID");

        const { buildId } = await res.json();

        if (currentBuildId && buildId !== currentBuildId) {
          console.log("New version detected! Reloading...");
          window.location.reload();
        }

        setCurrentBuildId(buildId);
      } catch (error) {
        console.error("Version check failed:", error);
      }
    };

    checkForUpdate();
    const interval = setInterval(checkForUpdate, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [currentBuildId]);

  return null;
}
