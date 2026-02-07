import { motion } from 'framer-motion'
// Assets
import bgImage from '../../assets/images/level1_intro/首页/一级页面 首页.png'
import titleImage from '../../assets/images/level1_intro/首页/一级页面-标题文字.png'
import btnImage from '../../assets/images/level1_intro/首页/一级页面 首页-按钮.png'
import logoImage from '../../assets/images/level1_intro/首页/文字logo.png'

interface HomeEntryProps {
  onStartStory: () => void
}

export const HomeEntry = ({ onStartStory }: HomeEntryProps) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* 1. 背景层 - 使用完整背景图 */}
      <img 
        src={bgImage} 
        alt="背景"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
      {/* 2. 主体内容层 */}
      <div className="absolute inset-0 z-10">
          
          {/* 标题文字 */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute top-[15%]"
            style={{ left: 290, width: 64 }}
          >
            <img 
              src={titleImage} 
              alt="开始寻找你的好彩头" 
              className="absolute w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* 启动按钮 */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-[68%] w-[20%] aspect-square cursor-pointer group z-20"
            onClick={onStartStory}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* 光晕背景 - Gold */}
            <motion.div
              className="absolute inset-0 bg-[#FFD700] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
            
            <img 
              src={btnImage} 
              alt="开始" 
              className="relative w-full h-full object-contain z-10"
            />
            
            {/* 涟漪动画 - Gold */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-20 animate-ping" />
            </div>
          </motion.div>

          {/* 底部Logo */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-[5%] w-[22%]"
          >
            <img 
              src={logoImage} 
              alt="山东博物馆" 
              className="w-full h-auto object-contain opacity-90"
            />
          </motion.div>
      </div>
    </div>
  )
}
