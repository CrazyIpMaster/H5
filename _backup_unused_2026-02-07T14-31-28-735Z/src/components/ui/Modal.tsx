import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  // 禁止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* 弹窗内容 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[360px] max-h-[80vh] overflow-hidden"
          >
            {/* 装饰边框 */}
            <div className="absolute inset-0 border-2 border-[var(--color-secondary)] rounded-lg" />
            <div className="absolute inset-[4px] border border-[var(--color-secondary)]/50 rounded-lg" />
            
            {/* 内容区域 */}
            <div className="relative bg-gradient-to-b from-[#2A1810] to-[#1A1A2E] rounded-lg overflow-hidden">
              {/* 标题栏 */}
              {title && (
                <div className="relative px-4 py-3 border-b border-[var(--color-secondary)]/30">
                  <h3 className="text-center text-[var(--color-secondary)] font-[var(--font-display)] text-lg tracking-widest">
                    {title}
                  </h3>
                  {/* 装饰线 */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-secondary)] to-transparent" />
                </div>
              )}
              
              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-[var(--color-secondary)] hover:text-[var(--color-light)] transition-colors z-10"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              
              {/* 主内容 */}
              <div className="p-4 overflow-y-auto max-h-[calc(80vh-60px)]">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

