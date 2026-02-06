import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Import assets
import bgVideo from '../../assets/images/level1_intro/首页/长图/238b3b7f996d379ff86c4aa03131f2d4.mp4?url'
import skipBtn from '../../assets/images/level1_intro/首页/长图/跳过.png'
import rain1 from '../../assets/images/level1_intro/首页/长图/图层 18.png'
import rain2 from '../../assets/images/level1_intro/首页/长图/图层 20.png'
import rain3 from '../../assets/images/level1_intro/首页/长图/图层 22.png'
import text0 from '../../assets/images/level1_intro/首页/长图/明代服饰里的‘好彩头’.png'
import text1 from '../../assets/images/level1_intro/首页/长图/中国传统服饰上的纹样，从无闲笔.png'
import text2 from '../../assets/images/level1_intro/首页/长图/一针一线，都缝进了对 幸福生活的期盼.png'
import text3 from '../../assets/images/level1_intro/首页/长图/瑞兽护佑，飞羽传福， 缠枝连绵，云纹流转.png'
import text4 from '../../assets/images/level1_intro/首页/长图/每一道图案，都是穿在身上的祝福 也是人心深处最温柔的向往.png'

interface StorySliderProps {
  onComplete: () => void
}

const TEXT_SEQUENCE = [
  { id: 0, src: text0 },
  { id: 1, src: text1 },
  { id: 2, src: text2 },
  { id: 3, src: text3 },
  { id: 4, src: text4 },
]

export const StorySlider = ({ onComplete }: StorySliderProps) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  
  // 2. Text Animation Sequence Animation
  useEffect(() => {
    if (currentTextIndex >= TEXT_SEQUENCE.length) {
       const timer = setTimeout(() => {
         setCurrentTextIndex(0)
       }, 500) 
       return () => clearTimeout(timer)
    }

    const duration = 4000 // 1s in + 2s hold + 1s out = 4s (slower)
    const interval = 1000 // 1s gap (slower)
    
    const timer = setTimeout(() => {
      setCurrentTextIndex(prev => prev + 1)
    }, duration + interval)

    return () => clearTimeout(timer)
  }, [currentTextIndex])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {/* 图层 20 - 右上角菱形 */}
        <motion.img 
          src={rain2} 
          alt="deco-tr" 
          className="absolute z-10 will-change-transform"
          style={{ left: 432, top: 340, width: 26, height: 'auto' }}
          animate={{ y: [0, -5, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* 图层 18 - 左侧兔子/火纹 */}
        <motion.img 
          src={rain1} 
          alt="deco-ml" 
          className="absolute z-10 will-change-transform"
          style={{ left: 100, top: 640, width: 42, height: 'auto' }}
          animate={{ y: [0, -3, 0], x: [0, 2, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
        />

        {/* 图层 22 - 右下角方形 */}
        <motion.img 
          src={rain3} 
          alt="deco-br" 
          className="absolute z-10 will-change-transform"
          style={{ left: 510, top: 810, width: 30, height: 'auto' }}
          animate={{ y: [0, -4, 0], rotate: [-2, 0, -2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        />

        {/* Text Sequence */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <AnimatePresence mode="wait">
            {TEXT_SEQUENCE.map((text, index) => (
              index === currentTextIndex && (
                <motion.div
                  key={text.id}
                  className="absolute"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                >
                  <motion.img 
                    src={text.src} 
                    alt="text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 4,
                      times: [0, 0.25, 0.75, 1], // 1s in, 2s hold, 1s out
                      ease: "linear"
                    }}
                  />
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Skip Button - 也在缩放容器内 */}
        <motion.div
          className="absolute z-50 cursor-pointer"
          style={{ right: 20, bottom: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onComplete}
        >
          <img src={skipBtn} alt="跳过" className="w-20 h-auto object-contain" />
        </motion.div>
      </div>
    </div>
  )
}

