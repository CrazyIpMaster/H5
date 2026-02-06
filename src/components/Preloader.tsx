import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../store/useAppStore'
import { preloadAssets } from '../utils/assetLoader'
import { getAllPatterns } from '../data/patterns'

import bgImage from '../assets/images/level1_intro/首页/一级页面-背景.png'
import flowerIcon from '../assets/images/level1_intro/首页/loading花图标静态发光图.png'

export const Preloader = () => {
  const { isAppLoaded, setAppLoaded, loadingProgress, setLoadingProgress } = useAppStore()
  const preloadedRef = useRef(false)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fixed resolution scaling logic (Same as BeastExploration)
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const targetRatio = 640 / 1136
      const windowRatio = windowWidth / windowHeight

      let newScale = 1
      if (windowRatio > targetRatio) {
        newScale = windowHeight / 1136
      } else {
        newScale = windowWidth / 640
      }
      setScale(newScale)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isAppLoaded || preloadedRef.current) return
    preloadedRef.current = true

    const loadAllAssets = async () => {
      // Collect assets
      const patterns = getAllPatterns();
      const patternImages = patterns.map(p => p.image);
      const staticAssets = [
        bgImage,
        // Add other static UI assets here if any
      ];
      
      const allAssets = [...staticAssets, ...patternImages];
      
      // Start Preloading
      // Simulate smoother progress
      let currentProgress = 0;
      
      await preloadAssets(allAssets, () => {
        // We'll use a timer to smoothly interpolate to the real progress
        // This is a simplified approach; for perfect smoothness we'd use requestAnimationFrame
        // but this should be enough for the visual effect requested
      });

      // Custom smooth progress simulation
      const interval = setInterval(() => {
        currentProgress += 1;
        if (currentProgress > 100) {
          currentProgress = 100;
          clearInterval(interval);
          setAppLoaded(true);
        }
        setLoadingProgress(currentProgress);
      }, 30); // 30ms * 100 steps = 3000ms total duration approx

      return () => clearInterval(interval);
    };

    loadAllAssets();
  }, [isAppLoaded, setAppLoaded, setLoadingProgress]);

  return (
    <AnimatePresence>
      {!isAppLoaded && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
        >
          {/* Content Container - Scaled to Maintain 640x1136 Ratio */}
          <div 
            ref={containerRef}
            className="absolute pointer-events-auto overflow-hidden flex flex-col items-center justify-center"
            style={{ 
              width: 640, 
              height: 1136,
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) scale(${scale})`,
            }}
          >
            {/* 背景图 */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url("${bgImage}")` }}
              />

              {/* 装饰性遮罩 - 增加纹理感 (Gold Tint) */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFD700]/5 pointer-events-none z-0" />

              {/* 四角装饰 - 窗棂纹样风格 (Gold) */}
              <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#FFD700]/40 rounded-tl-xl opacity-80 z-10" />
              <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#FFD700]/40 rounded-tr-xl opacity-80 z-10" />
              <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#FFD700]/40 rounded-bl-xl opacity-80 z-10" />
              <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#FFD700]/40 rounded-br-xl opacity-80 z-10" />

              {/* 内容区域 */}
              <div className="relative z-10 flex flex-col items-center justify-center w-full px-8">
                
                {/* Logo动画区域 */}
                <div className="relative mb-20">
                  {/* 外圈旋转纹样 */}
                  <motion.div
                    className="absolute inset-[-12px] border border-[#FFD700]/20 rounded-full border-dashed"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-[-4px] border border-[#FFD700]/30 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                  
                  {/* 中心Logo容器 */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-32 h-32 flex items-center justify-center"
                  >
                     <img 
                       src={flowerIcon} 
                       alt="Loading" 
                       className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]"
                     />
                  </motion.div>
                </div>

                {/* 进度条区域 */}
                <div className="w-64 max-w-[80%] relative flex flex-col items-center gap-4">
                  {/* 进度数值 */}
                  <motion.div 
                    className="text-[#D64131] text-xs font-serif tracking-widest opacity-80 mb-1"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {Math.round(loadingProgress)}%
                  </motion.div>

                  {/* 进度条轨道 */}
                  <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden relative backdrop-blur-sm border border-[#D64131]/20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
                     <motion.div
                      className="absolute left-0 top-0 bottom-0 rounded-full overflow-hidden"
                      style={{ 
                        width: `${loadingProgress}%`,
                        background: '#D64131', // 红色
                        boxShadow: '0 0 10px rgba(214, 65, 49, 0.4)'
                      }}
                      transition={{ type: 'tween', ease: "linear", duration: 0.1 }}
                    >
                      {/* 流光/脉冲动画效果 */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/2"
                        style={{ skewX: -20 }}
                        animate={{ x: ['-200%', '400%'] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                    </motion.div>
                  </div>

                  {/* 加载文字 */}
                  <motion.h2 
                    className="text-[#D64131] text-sm font-serif tracking-[0.5em] ml-2 font-medium mt-2"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    正在开启奇妙之旅
                  </motion.h2>
                </div>

              </div>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
