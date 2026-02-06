import { motion } from 'framer-motion'

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
  onDismiss?: () => void
}

export const ErrorMessage = ({ message, onRetry, onDismiss }: ErrorMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-x-4 bottom-20 z-50 mx-auto max-w-[600px]"
    >
      <div className="bg-[var(--color-dark)] border-2 border-[var(--color-primary)] rounded-lg p-4 shadow-lg">
        <div className="flex items-start gap-3">
          {/* 错误图标 */}
          <div className="flex-shrink-0 w-6 h-6 text-[var(--color-primary)]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          
          {/* 错误信息 */}
          <div className="flex-1">
            <p className="text-[var(--color-light)] text-sm">{message}</p>
          </div>
          
          {/* 关闭按钮 */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 text-[var(--color-light)] opacity-60 hover:opacity-100"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
          )}
        </div>
        
        {/* 重试按钮 */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 w-full py-2 bg-[var(--color-primary)] text-[var(--color-light)] rounded text-sm font-medium"
          >
            重新尝试
          </button>
        )}
      </div>
    </motion.div>
  )
}

