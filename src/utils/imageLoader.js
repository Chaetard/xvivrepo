export const preloadImages = async (urls) => {
  if (!urls || urls.length === 0) return Promise.resolve();

  const promises = urls.map((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => {
        console.warn(`Failed to preload image: ${url}`);
        resolve(null); // Resolve so it does not block Promise.all
      };
      img.src = url;
    });
  });
  return Promise.all(promises);
};
