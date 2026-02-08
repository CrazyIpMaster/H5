/**
 * 懒加载资源工具
 * 用于按需加载图片资源，减少初始加载时间
 */

// 图片缓存
const imageCache = new Map<string, string>();
const loadingPromises = new Map<string, Promise<string>>();

/**
 * 预加载单个图片
 */
export function preloadImage(src: string): Promise<string> {
  // 如果已缓存，直接返回
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  
  // 如果正在加载，返回现有的 Promise
  if (loadingPromises.has(src)) {
    return loadingPromises.get(src)!;
  }
  
  // 创建新的加载 Promise
  const promise = new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(src, src);
      loadingPromises.delete(src);
      resolve(src);
    };
    img.onerror = () => {
      loadingPromises.delete(src);
      reject(new Error(`Failed to load image: ${src}`));
    };
    img.src = src;
  });
  
  loadingPromises.set(src, promise);
  return promise;
}

/**
 * 批量预加载图片
 */
export async function preloadImages(
  sources: string[], 
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  let loaded = 0;
  const total = sources.length;
  
  const promises = sources.map(async (src) => {
    try {
      await preloadImage(src);
    } catch (e) {
      console.warn(`Failed to preload: ${src}`);
    } finally {
      loaded++;
      onProgress?.(loaded, total);
    }
  });
  
  await Promise.all(promises);
}

/**
 * 检查图片是否已缓存
 */
export function isImageCached(src: string): boolean {
  return imageCache.has(src);
}

/**
 * 清除图片缓存
 */
export function clearImageCache(): void {
  imageCache.clear();
}

