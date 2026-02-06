import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { PanInfo } from 'framer-motion'

// Assets
import bgImage from '../../assets/images/level4_creation/更多拓展/拓展背景.png'
import backBtn from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-返回键.png'

// Xiezhi
import xiezhiTitle from '../../assets/images/level4_creation/更多拓展/獬豸文字.png'
import xiezhiImage from '../../assets/images/level4_creation/更多拓展/獬豸主体.png'
import xiezhiDesc from '../../assets/images/level4_creation/更多拓展/獬豸介绍.png'

// Baize
import baizeTitle from '../../assets/images/level4_creation/更多拓展/白泽文字.png'
import baizeImage from '../../assets/images/level4_creation/更多拓展/白泽纹理.png' // Using texture as main image based on file list
import baizeDesc from '../../assets/images/level4_creation/更多拓展/白泽介绍.png'

// Qilin
import qilinTitle from '../../assets/images/level4_creation/更多拓展/麒麟文字.png'
import qilinImage from '../../assets/images/level4_creation/更多拓展/麒麟主体.png'
import qilinDesc from '../../assets/images/level4_creation/更多拓展/麒麟介绍.png'

// Detail Images
import xiezhiDetail from '../../assets/images/level4_creation/更多拓展/獬豸分别介绍.png'
import baizeDetail from '../../assets/images/level4_creation/更多拓展/白泽分别介绍.png'
import qilinDetail from '../../assets/images/level4_creation/更多拓展/麒麟分别介绍.png'

interface ExpansionModalProps {
  isOpen: boolean
  onClose: () => void
}

const ITEMS = [
  {
    id: 'xiezhi',
    title: xiezhiTitle,
    image: xiezhiImage,
    desc: xiezhiDesc,
    titleClass: "left-14 top-36",
    titleHeight: "h-32",
    detailImage: xiezhiDetail
  },
  {
    id: 'baize',
    title: baizeTitle,
    image: baizeImage,
    desc: baizeDesc,
    titleClass: "right-14 top-36",
    titleHeight: "h-32",
    detailImage: baizeDetail
  },
  {
    id: 'qilin',
    title: qilinTitle,
    image: qilinImage,
    desc: qilinDesc,
    titleClass: "left-32 top-32",
    titleHeight: "h-32",
    detailImage: qilinDetail
  }
]

export function ExpansionModal({ isOpen, onClose }: ExpansionModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedDetail, setSelectedDetail] = useState<string | null>(null)
  
  // Handle Swipe
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.x < -threshold) {
      // Swipe Left -> Next
      setCurrentIndex((prev) => (prev + 1) % ITEMS.length)
    } else if (info.offset.x > threshold) {
      // Swipe Right -> Prev
      setCurrentIndex((prev) => (prev - 1 + ITEMS.length) % ITEMS.length)
    }
  }

  // Helper to calculate circular distance
  // Returns: 0 (center), 1 (right), -1 (left) for 3 items
  const getCircularDistance = (index: number, current: number, length: number) => {
    const diff = (index - current + length) % length
    if (diff > length / 2) {
      return diff - length // Wrap to negative (left)
    }
    return diff // Positive (right) or 0 (center)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-[70] overflow-hidden bg-black w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Content Container - Direct Fill since Parent is Scaled */}
          <div className="relative w-full h-full overflow-hidden shadow-2xl pointer-events-auto">
            {/* Background */}
            <img 
              src={bgImage} 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover z-0" 
            />

            {/* Close Button */}
            <motion.button
              className="absolute top-8 right-6 z-50 w-10 h-10 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <img src={backBtn} alt="Close" className="w-full h-full object-contain" />
            </motion.button>

            {/* Carousel Container */}
            <div className="absolute inset-0 flex items-center justify-center z-10 perspective-1000">
              <motion.div 
                className="relative w-full h-full flex items-center justify-center"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                {ITEMS.map((item, index) => {
                  const dist = getCircularDistance(index, currentIndex, ITEMS.length)
                  const isActive = dist === 0
                  
                  // 3D Transform Logic
                  // Center: 0
                  // Left: -1
                  // Right: 1
                  
                  return (
                    <motion.div
                      key={item.id}
                      className="absolute w-full h-full flex items-center justify-center pointer-events-none"
                      initial={false}
                      animate={{
                        x: dist * 400, // Increased distance for wider spacing
                        z: isActive ? 0 : -300, // Move side items further back
                        scale: isActive ? 1 : 0.75, // Slightly smaller side items
                        opacity: isActive ? 1 : 0.6,
                        zIndex: isActive ? 10 : 5, // Simple layering
                        rotateY: dist * 25 // Rotation for 3D effect
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30
                      }}
                    >
                      {/* Card Content */}
                      <div className="relative w-full h-full flex flex-col items-center justify-center pointer-events-auto">
                        
                        {/* Title (Custom Position) */}
                        <motion.div 
                          className={`absolute ${item.titleClass || 'left-16 top-36'}`}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : (item.id === 'baize' ? 20 : -20)
                          }}
                        >
                          <img src={item.title} alt={item.id} className={`${item.titleHeight || 'h-38'} w-auto object-contain drop-shadow-md`} />
                        </motion.div>

                        {/* Main Image (Center) */}
                        <div 
                          className="w-[480px] h-[480px] flex items-center justify-center -mt-20 cursor-pointer"
                          onClick={() => {
                            if (isActive) {
                              setSelectedDetail(item.detailImage)
                            }
                          }}
                        >
                          <img src={item.image} alt={item.id} className="w-full h-full object-contain drop-shadow-2xl" />
                        </div>

                        {/* Description Box (Bottom) */}
                        <motion.div 
                          className="absolute bottom-20 w-[460px]"
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 20
                          }}
                        >
                          <img src={item.desc} alt="Description" className="w-full h-auto drop-shadow-lg" />
                        </motion.div>

                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-3 z-20">
              {ITEMS.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

          </div>
        </motion.div>
      )}

      {/* Detail Image Modal (Picture-in-Picture) */}
      <AnimatePresence>
        {selectedDetail && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDetail(null)}
          >
            <motion.div
              className="relative w-full h-full max-w-[640px] flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedDetail} 
                alt="Detail" 
                className="w-[90%] h-auto object-contain"
              />
              
              {/* Close Button for Detail */}
              <button
                className="absolute top-8 right-6 w-10 h-10 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-md"
                onClick={() => setSelectedDetail(null)}
              >
                <span className="text-white text-2xl">&times;</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  )
}
