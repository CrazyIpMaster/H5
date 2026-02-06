import { motion } from 'framer-motion'

// 导入背景和按钮
import bgImage from '../../assets/images/level4_creation/海报/通用/一级页面-背景.png'
import nextBtn from '../../assets/images/level4_creation/海报/通用/四级页面海报修改-下一步按键.png'
import titleMain from '../../assets/images/level4_creation/海报/通用/四级页面海报(修改1-生成你的好彩头文字.png'
import titleSub from '../../assets/images/level4_creation/海报/海报3/四级页面海报2修改1-选择一句你喜欢的祝福语文字.png'

// 导入祝福语牌子图片（3个红色牌子）
import blessing1Img from '../../assets/images/level4_creation/海报/海报3/四级页面海报2_03.png'
import blessing2Img from '../../assets/images/level4_creation/海报/海报3/四级页面海报2_05.png'
import blessing3Img from '../../assets/images/level4_creation/海报/海报3/四级页面海报2_07.png'

interface TextSelectorProps {
  selectedBlessing: string | null
  onSelect: (blessingId: string) => void
  onNext: () => void
  onBack: () => void
}

// 祝福语数据 - 对应3个红色牌子
const BLESSINGS = [
  { 
    id: 'madaochenggong', 
    name: '马到成功', 
    img: blessing1Img,
  },
  { 
    id: 'wanmayingfu', 
    name: '万马迎福', 
    img: blessing2Img,
  },
  { 
    id: 'mayinghaoyun', 
    name: '马迎好运', 
    img: blessing3Img,
  },
]

export const TextSelector = ({ selectedBlessing, onSelect, onNext, onBack }: TextSelectorProps) => {
  return (
    <div className="absolute inset-0 w-[640px] h-[1136px] overflow-hidden bg-[#D64131]">
      <div className="absolute inset-0 overflow-hidden pointer-events-auto">
        {/* 背景 */}
        <img src={bgImage} alt="bg" className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* 返回按钮 */}
        <motion.button
          className="absolute top-8 left-6 z-50 w-10 h-10 flex items-center justify-center bg-black/20 rounded-full backdrop-blur-sm"
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
        >
          <span className="text-white text-xl">←</span>
        </motion.button>

        {/* 标题区域 */}
        <div 
          className="absolute w-full flex flex-col items-center"
          style={{ top: 200 }}
        >
          <img 
            src={titleMain} 
            alt="生成你的好彩头"
            style={{ width: 300, height: 'auto' }}
          />
          <img 
            src={titleSub} 
            alt="选择一句你喜欢的祝福语"
            style={{ width: 240, height: 'auto', marginTop: 16 }}
          />
        </div>

        {/* 祝福语列表 - 水平排列3个红色牌子 */}
        <div 
          className="absolute w-full flex justify-center"
          style={{ top: 420, marginTop: -48 }}
        >
          <div className="flex justify-center items-end" style={{ gap: 35 }}>
            {BLESSINGS.map((blessing) => (
              <motion.div
                key={blessing.id}
                className="cursor-pointer"
                onClick={() => onSelect(blessing.id)}
                whileTap={{ scale: 0.95 }}
                animate={selectedBlessing === blessing.id ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={blessing.img} 
                  alt={blessing.name} 
                  className="drop-shadow-2xl"
                  style={{ 
                    width: 140, 
                    height: 'auto',
                    filter: selectedBlessing === blessing.id ? 'brightness(1.1)' : 'brightness(1)'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 下一步按钮 */}
        <motion.button 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 150 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={!selectedBlessing}
        >
          <img 
            src={nextBtn} 
            alt="下一步" 
            style={{ width: 150, opacity: selectedBlessing ? 1 : 0.5 }} 
            className="drop-shadow-xl" 
          />
        </motion.button>
      </div>
    </div>
  )
}