
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });
};

export const preloadAssets = async (
  assets: string[], 
  onProgress?: (progress: number) => void
): Promise<void> => {
  let loaded = 0;
  const total = assets.length;
  
  if (total === 0) {
    onProgress?.(100);
    return;
  }

  const promises = assets.map(async (src) => {
    try {
      await preloadImage(src);
    } catch (e) {
      console.warn(e); // Ignore errors, continue
    } finally {
      loaded++;
      onProgress?.(Math.round((loaded / total) * 100));
    }
  });

  await Promise.all(promises);
};
