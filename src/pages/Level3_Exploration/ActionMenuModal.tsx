import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useAppStore } from '../../store/useAppStore'

// Assets
import btnMore from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-转四方更多拓展按钮.png'
import btnPoster from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-转四方生成海报按钮.png'

interface ActionMenuModalProps {
  isOpen: boolean
  onClose: () => void
  onExpansion?: () => void
}

export function ActionMenuModal({ isOpen, onClose, onExpansion }: ActionMenuModalProps) {
  const setPhase = useAppStore(state => state.setPhase)

  // ESC key support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleGeneratePoster = () => {
    setPhase('creation')
  }

  const handleMoreExpansion = () => {
    if (onExpansion) {
      onExpansion()
    } else {
      // Fallback
      alert('更多拓展功能即将上线，敬请期待！')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* More Expansion Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMoreExpansion}
            >
              <img src={btnMore} alt="更多拓展" className="w-48 h-auto drop-shadow-xl" />
            </motion.button>

            {/* Generate Poster Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGeneratePoster}
            >
              <img src={btnPoster} alt="生成海报" className="w-48 h-auto drop-shadow-xl" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
