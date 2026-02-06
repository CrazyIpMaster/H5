import { motion } from 'framer-motion'
import { Modal } from '../../components/ui/Modal'
import type { PatternData } from '../../data/patterns'

interface HotspotModalProps {
  isOpen?: boolean
  onClose: () => void
  pattern: PatternData | null
  children?: React.ReactNode
}

export const HotspotModal = ({ isOpen = true, onClose, pattern, children }: HotspotModalProps) => {
  if (!pattern) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={pattern.name}>
      <div className="flex flex-col items-center">
        {/* 纹样图片展示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full aspect-square max-w-[200px] mb-6 relative"
        >
          {/* 装饰边框 */}
          <div className="absolute inset-0 border-2 border-[var(--color-secondary)]/30 rounded-lg" />
          <div className="absolute inset-2 border border-[var(--color-secondary)]/20 rounded" />
          
          {/* 图案展示区 */}
          <div className="absolute inset-4 flex items-center justify-center bg-gradient-to-br from-[#2A1810] to-[#1A1A2E] rounded">
            <PatternDisplay patternId={pattern.id} />
          </div>
          
          {/* 角落装饰 */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-secondary)]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-secondary)]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-secondary)]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-secondary)]" />
        </motion.div>

        {/* 寓意标签 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="px-4 py-2 bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/50 rounded-full mb-4"
        >
          <span className="text-[var(--color-secondary)] text-sm tracking-wider">
            {pattern.meaning}
          </span>
        </motion.div>

        {/* 详细描述 */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[var(--color-light)]/80 text-sm leading-relaxed text-center"
        >
          {pattern.description}
        </motion.p>

        {/* 分隔装饰 */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="my-4 w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-secondary)]/50 to-transparent"
        />

        {/* 底部提示 */}
        {!children && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
            className="text-[var(--color-light)] text-xs"
          >
            继续探索发现更多纹样
          </motion.p>
        )}

        {children}
      </div>
    </Modal>
  )
}

// 纹样图案展示组件
const PatternDisplay = ({ patternId }: { patternId: string }) => {
  const color = '#FFD700'
  
  switch (patternId) {
    case 'crane':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 仙鹤 */}
          <path
            d="M50 20 Q55 25 55 35 L55 50 Q55 60 50 70 L50 85"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          {/* 头部 */}
          <circle cx="50" cy="18" r="6" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="48" cy="16" r="1.5" fill={color} />
          {/* 冠 */}
          <path d="M52 12 Q55 8 58 12" fill="none" stroke="#C41E3A" strokeWidth="2" />
          {/* 翅膀 */}
          <path d="M55 40 Q70 35 80 45 Q70 50 55 45" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M45 40 Q30 35 20 45 Q30 50 45 45" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 腿 */}
          <path d="M48 85 L45 95" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M52 85 L55 95" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'phoenix':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 凤凰 */}
          <path
            d="M50 15 Q60 20 55 30 Q50 40 40 35 Q30 30 35 20 Q40 10 50 15"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          <circle cx="42" cy="22" r="2" fill={color} />
          {/* 凤冠 */}
          <path d="M50 15 Q55 5 60 10" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M48 13 Q50 3 55 8" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M52 14 Q60 6 65 12" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 身体和尾羽 */}
          <path
            d="M40 35 Q30 50 25 75 Q35 70 40 55 Q45 70 55 80 Q50 55 40 35"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          {/* 翅膀 */}
          <path d="M55 30 Q75 25 85 40 Q70 45 55 35" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'swallow':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 燕子 */}
          <ellipse cx="50" cy="40" rx="8" ry="12" fill="none" stroke={color} strokeWidth="2" />
          {/* 头 */}
          <circle cx="50" cy="25" r="6" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="48" cy="24" r="1.5" fill={color} />
          {/* 翅膀 */}
          <path d="M42 38 Q20 30 10 45 Q25 50 42 42" fill="none" stroke={color} strokeWidth="2" />
          <path d="M58 38 Q80 30 90 45 Q75 50 58 42" fill="none" stroke={color} strokeWidth="2" />
          {/* 燕尾 */}
          <path d="M45 52 L35 75" fill="none" stroke={color} strokeWidth="2" />
          <path d="M55 52 L65 75" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      )
    case 'dragon':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 龙 */}
          <path
            d="M20 60 Q15 40 30 30 Q45 20 60 25 Q75 30 80 45 Q85 60 70 70 Q55 80 40 75 Q30 70 35 60 Q40 50 55 55"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
          />
          {/* 龙头 */}
          <circle cx="65" cy="30" r="4" fill={color} />
          {/* 龙角 */}
          <path d="M60 25 Q55 15 58 10" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M68 22 Q70 12 75 10" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 龙须 */}
          <path d="M75 30 Q85 28 90 25" fill="none" stroke={color} strokeWidth="1" />
          <path d="M78 35 Q88 35 92 32" fill="none" stroke={color} strokeWidth="1" />
          {/* 龙鳞 */}
          <path d="M35 55 Q40 52 45 55" fill="none" stroke={color} strokeWidth="1" />
          <path d="M45 60 Q50 57 55 60" fill="none" stroke={color} strokeWidth="1" />
        </svg>
      )
    case 'qilin':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 麒麟 */}
          <ellipse cx="50" cy="55" rx="20" ry="15" fill="none" stroke={color} strokeWidth="2" />
          {/* 头 */}
          <path d="M70 55 Q80 50 85 40 Q80 35 70 40" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="80" cy="38" r="2" fill={color} />
          {/* 角 */}
          <path d="M82 35 Q85 25 80 20" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 鬃毛 */}
          <path d="M75 42 Q78 38 82 40" fill="none" stroke={color} strokeWidth="1" />
          <path d="M72 45 Q75 42 78 44" fill="none" stroke={color} strokeWidth="1" />
          {/* 腿 */}
          <path d="M35 68 L32 85" fill="none" stroke={color} strokeWidth="2" />
          <path d="M45 70 L43 87" fill="none" stroke={color} strokeWidth="2" />
          <path d="M55 70 L57 87" fill="none" stroke={color} strokeWidth="2" />
          <path d="M65 68 L68 85" fill="none" stroke={color} strokeWidth="2" />
          {/* 尾巴 */}
          <path d="M30 55 Q20 50 15 55 Q20 60 15 65" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 鳞片 */}
          <path d="M40 50 Q45 47 50 50" fill="none" stroke={color} strokeWidth="1" />
          <path d="M50 55 Q55 52 60 55" fill="none" stroke={color} strokeWidth="1" />
        </svg>
      )
    case 'baize':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 白泽 */}
          <ellipse cx="50" cy="55" rx="22" ry="18" fill="none" stroke={color} strokeWidth="2" />
          {/* 头 */}
          <circle cx="75" cy="45" r="12" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="72" cy="42" r="2" fill={color} />
          <circle cx="78" cy="42" r="2" fill={color} />
          {/* 第三只眼 */}
          <circle cx="75" cy="35" r="3" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="75" cy="35" r="1" fill={color} />
          {/* 角 */}
          <path d="M70 33 Q65 25 68 18" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M80 33 Q85 25 82 18" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 腿 */}
          <path d="M32 70 L28 88" fill="none" stroke={color} strokeWidth="2" />
          <path d="M45 72 L43 90" fill="none" stroke={color} strokeWidth="2" />
          <path d="M55 72 L57 90" fill="none" stroke={color} strokeWidth="2" />
          <path d="M68 70 L72 88" fill="none" stroke={color} strokeWidth="2" />
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 海水江崖 */}
          {/* 山 */}
          <path d="M30 90 L50 50 L70 90" fill="none" stroke={color} strokeWidth="2" />
          <path d="M40 90 L50 70 L60 90" fill="none" stroke={color} strokeWidth="1.5" />
          {/* 波浪 */}
          <path d="M10 85 Q20 75 30 85 Q40 95 50 85 Q60 75 70 85 Q80 95 90 85" fill="none" stroke={color} strokeWidth="2" />
          <path d="M10 75 Q20 65 30 75 Q40 85 50 75 Q60 65 70 75 Q80 85 90 75" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M20 65 Q30 55 40 65 Q50 75 60 65 Q70 55 80 65" fill="none" stroke={color} strokeWidth="1" />
          {/* 云 */}
          <path d="M15 30 Q25 20 35 30 Q45 20 55 30 Q45 40 35 30 Q25 40 15 30" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    case 'ruyi':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 如意纹 */}
          <path
            d="M50 20 Q70 20 70 40 Q70 50 60 50 Q70 50 70 60 Q70 80 50 80 Q30 80 30 60 Q30 50 40 50 Q30 50 30 40 Q30 20 50 20"
            fill="none"
            stroke={color}
            strokeWidth="2"
          />
          {/* 中心装饰 */}
          <circle cx="50" cy="50" r="8" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="50" cy="50" r="3" fill={color} />
          {/* 四角装饰 */}
          <circle cx="50" cy="25" r="4" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="50" cy="75" r="4" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="35" cy="50" r="4" fill="none" stroke={color} strokeWidth="1" />
          <circle cx="65" cy="50" r="4" fill="none" stroke={color} strokeWidth="1" />
        </svg>
      )
    case 'flower':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
          {/* 折枝花 */}
          {/* 花朵 */}
          <circle cx="50" cy="35" r="15" fill="none" stroke={color} strokeWidth="2" />
          <circle cx="50" cy="35" r="8" fill="none" stroke={color} strokeWidth="1.5" />
          <circle cx="50" cy="35" r="3" fill={color} />
          {/* 花瓣 */}
          <ellipse cx="50" cy="18" rx="5" ry="8" fill="none" stroke={color} strokeWidth="1" />
          <ellipse cx="35" cy="30" rx="8" ry="5" fill="none" stroke={color} strokeWidth="1" />
          <ellipse cx="65" cy="30" rx="8" ry="5" fill="none" stroke={color} strokeWidth="1" />
          <ellipse cx="40" cy="48" rx="6" ry="4" fill="none" stroke={color} strokeWidth="1" />
          <ellipse cx="60" cy="48" rx="6" ry="4" fill="none" stroke={color} strokeWidth="1" />
          {/* 枝干 */}
          <path d="M50 50 Q45 60 40 70 Q35 80 30 85" fill="none" stroke={color} strokeWidth="2" />
          {/* 叶子 */}
          <path d="M42 65 Q35 60 30 65 Q35 70 42 65" fill="none" stroke={color} strokeWidth="1.5" />
          <path d="M38 75 Q45 70 50 75 Q45 80 38 75" fill="none" stroke={color} strokeWidth="1.5" />
        </svg>
      )
    default:
      return (
        <div className="w-full h-full flex items-center justify-center text-[var(--color-secondary)]">
          <span className="text-4xl">✦</span>
        </div>
      )
  }
}

