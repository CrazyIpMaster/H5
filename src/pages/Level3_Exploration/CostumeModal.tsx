import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Common Assets
import closeBtn from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-对应服饰返回键.png'
import museumText from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-山东博物馆藏文字.png'
import bgImage from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-对应服饰短背景图.png'
import dynastyIcon from '../../assets/images/level3_exploration/通用/三级界面-瑞兽护岁安-长图-明字图标.png'

interface CostumeModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    titleImage: string
    images: string[]
  } | null
}

export function CostumeModal({ isOpen, onClose, data }: CostumeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  // Reset index when data changes
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0)
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, data, onClose])

  if (!isOpen || !data) return null

  const handleDragEnd = (_event: any, info: any) => {
    const threshold = 50
    if (info.offset.x > threshold) {
      // Swipe Right -> Prev
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    } else if (info.offset.x < -threshold) {
      // Swipe Left -> Next
      if (currentIndex < data.images.length - 1) {
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            className="relative w-[600px] h-[480px] rounded-lg overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
          >
            {/* Header: Dynasty Icon & Title */}
            <div className="absolute top-7 left-0 right-0 flex flex-col items-center gap-1 z-20">
               <img src={dynastyIcon} alt="Ming Dynasty" className="w-8 h-8 object-contain opacity-90" />
               <img src={data.titleImage} alt="Title" className="h-5 w-auto object-contain" />
            </div>

            {/* Close Button */}
            <motion.button
              className="absolute top-5 right-6 z-30 w-10 h-10"
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <img src={closeBtn} alt="Close" className="w-full h-full object-contain" />
            </motion.button>

            {/* Carousel Area */}
            <div className="absolute inset-0 flex items-center justify-center top-24 bottom-20">
              <motion.div
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
              >
                <motion.img
                  key={currentIndex}
                  src={data.images[currentIndex]}
                  alt={`Costume ${currentIndex + 1}`}
                  className="max-w-[100%] max-h-[100%] object-contain drop-shadow-xl"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </div>

            {/* Footer: Museum Text (Above Dots) */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center z-20">
              <img src={museumText} alt="Museum" className="h-5 w-auto object-contain opacity-80" />
            </div>

            {/* Pagination Dots (Below Text) */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
              {data.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-[#8B4513]' : 'bg-[#8B4513]/30'
                  }`}
                />
              ))}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
