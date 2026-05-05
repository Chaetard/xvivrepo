import { useState, useEffect } from "react";
import { preloadImages } from "../utils/imageLoader";

export const useImagePreloader = (criticalUrls, secondaryUrls = []) => {
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await preloadImages(criticalUrls);
        setIsReady(true);
        setProgress(100);
        // Load secondary images in the background asynchronously
        preloadImages(secondaryUrls);
      } catch (err) {
        console.error("Error preloading images", err);
        setIsReady(true); // Always proceed eventually
      }
    };

    loadImages();
  }, [criticalUrls, secondaryUrls]);

  return { isReady, progress };
};
