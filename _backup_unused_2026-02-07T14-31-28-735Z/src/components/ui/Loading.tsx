import { motion } from 'framer-motion'

interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

export const Loading = ({ text = '加载中...', fullScreen = false }: LoadingProps) => {
  const containerClass = fullScreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-dark)]'
    : 'flex items-center justify-center p-8'

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4">
        {/* 太极图旋转动画 */}
        <motion.div
          className="w-16 h-16 relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* 太极图 */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="#FFD700" strokeWidth="2" />
            <path
              d="M50 2 A48 48 0 0 1 50 98 A24 24 0 0 1 50 50 A24 24 0 0 0 50 2"
              fill="#FFD700"
            />
            <circle cx="50" cy="26" r="8" fill="#1A1A2E" />
            <circle cx="50" cy="74" r="8" fill="#FFD700" />
          </svg>
        </motion.div>
        
        {/* 加载文字 */}
        <motion.p
          className="text-[var(--color-secondary)] font-[var(--font-display)] text-lg tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      </div>
    </div>
  )
}

