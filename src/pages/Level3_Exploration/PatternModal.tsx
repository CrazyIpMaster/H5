import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Common Assets
import closeBtn from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-对应服饰返回键.png'
import bgImage from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-纹理介绍背景.png'

interface PatternModalProps {
  isOpen: boolean
  onClose: () => void
  data: {
    title: string
    contentImage: string
  } | null
}

export function PatternModal({ isOpen, onClose, data }: PatternModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen || !data) return null

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
          {/* Modal Content - Red Square Card */}
          <motion.div
            className="relative w-[600px] h-[600px] overflow-hidden shadow-2xl"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 0 40px rgba(214, 65, 49, 0.4)'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-7 right-9 z-30 w-10 h-10"
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              <img src={closeBtn} alt="Close" className="w-full h-full object-contain" />
            </motion.button>

            {/* Content Area - Text Introduction Image */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
               <motion.img 
                 src={data.contentImage} 
                 alt={data.title}
                 className="w-[70%] h-auto object-contain drop-shadow-md"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
               />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
