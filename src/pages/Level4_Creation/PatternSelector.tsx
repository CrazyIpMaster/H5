import { motion } from 'framer-motion'

// 导入背景和按钮
import bgImage from '../../assets/images/首页.png'
import nextBtn from '../../assets/images/level4_creation/海报/通用/四级页面海报修改-下一步按键.png'
import backBtn from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-返回键.png'
import titleMain from '../../assets/images/level4_creation/海报/通用/四级页面海报(修改1-生成你的好彩头文字.png'
import titleSub from '../../assets/images/level4_creation/海报/通用/四级页面海报(修改1-选择一款你喜欢的纹饰文字.png'
import gradientFrame1 from '../../assets/images/level4_creation/海报/海报2/四级页面海报1修改-渐变框.png'
import gradientFrame2 from '../../assets/images/level4_creation/海报/海报2/四级页面海报1修改-渐变框2.png'

// 导入纹样图片
import seawaterImg from '../../assets/images/level4_creation/海报/海报2/四级页面海报1修改-江崖海水纹.png'
import ruyiImg from '../../assets/images/level4_creation/海报/海报2/四级页面海报1修改-四合如意纹.png'
import flowerImg from '../../assets/images/level4_creation/海报/海报2/四级页面海报1修改-折枝花纹.png'
import shoushanImg from '../../assets/images/level4_creation/海报/海报2/四级页面海报1修改-寿山福海纹.png'

interface PatternSelectorProps {
  selectedPattern: string | null
  onSelect: (patternId: string) => void
  onNext: () => void
  onBack: () => void
}

// 纹样数据
const PATTERNS = [
  { 
    id: 'seawater', 
    name: '江崖海水纹', 
    img: seawaterImg,
    nameStyle: { right: 80, top: 180 },
    subtitle: '山河无恙・家国平安'
  },
  { 
    id: 'ruyi', 
    name: '四合如意纹', 
    img: ruyiImg,
    nameStyle: { left: 80, top: 380 },
    subtitle: '四方如意・吉祥顺心'
  },
  { 
    id: 'flower', 
    name: '折枝花纹', 
    img: flowerImg,
    nameStyle: { right: 80, top: 580 },
    subtitle: '生机盎然・福寿绵长',
    width: 170
  },
  { 
    id: 'shoushan', 
    name: '寿山福海纹', 
    img: shoushanImg,
    nameStyle: { left: 80, top: 780 },
    subtitle: '福寿双全・寿禄绵长'
  },
]

export const PatternSelector = ({ selectedPattern, onSelect, onNext, onBack }: PatternSelectorProps) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#D64131]">
      <div className="absolute inset-0 overflow-hidden pointer-events-auto">
        {/* 背景 */}
        <img src={bgImage} alt="bg" className="absolute inset-0 w-full h-full object-cover z-0" />

        {/* 返回按钮 */}
        <motion.button
          className="absolute top-8 right-6 z-50 w-10 h-10 flex items-center justify-center"
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
        >
          <img src={backBtn} alt="Back" className="w-full h-full object-contain" />
        </motion.button>

        {/* 标题区域 */}
        <div 
          className="absolute w-full flex flex-col items-center"
          style={{ top: 100 }}
        >
          <img 
            src={titleMain} 
            alt="生成你的好彩头"
            style={{ width: 300, height: 'auto' }}
          />
          <img 
            src={titleSub} 
            alt="选择一款你喜欢的纹饰"
            style={{ width: 240, height: 'auto', marginTop: 16 }}
          />
        </div>

        {/* 纹样列表 - 垂直排列，4个纹样 */}
        <div className="absolute inset-0" style={{ top: 220 }}>
          {PATTERNS.map((pattern, index) => (
            <div
              key={pattern.id}
              className="absolute"
              style={{ 
                left: '50%',
                top: index * 185,
                transform: 'translateX(-50%)',
                width: 640,
                height: 185
              }}
            >
              {/* 纹样图片 */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                onClick={() => onSelect(pattern.id)}
                whileTap={{ scale: 0.95 }}
                animate={selectedPattern === pattern.id ? { scale: 1.05 } : { scale: 1 }}
              >
                <img 
                  src={pattern.img} 
                  alt={pattern.name} 
                  className="drop-shadow-2xl"
                  style={{ width: (pattern as any).width || 160, height: 'auto' }}
                />
              </motion.div>

              {/* 选中时的渐变背景动画 */}
              {selectedPattern === pattern.id && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-0"
                  style={{
                    ...(index % 2 === 0 
                      ? { left: 0, width: '60%' } // 左侧文字，渐变框在左
                      : { right: 0, width: '60%' } // 右侧文字，渐变框在右
                    ),
                    height: 120
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img 
                    src={index % 2 === 0 ? gradientFrame2 : gradientFrame1} 
                    alt="gradient" 
                    className="w-full h-full object-fill"
                  />
                </motion.div>
              )}

              {/* 文字说明 - 根据位置动态调整（左右交替） */}
              <div
                className="absolute flex flex-col z-20"
                style={{
                  ...(index % 2 === 0 ? { left: 70 } : { right: 70 }),
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <span 
                  className="text-[#4A1A1A] text-[22px] font-bold tracking-wider mb-1"
                  style={{ fontFamily: 'serif' }}
                >
                  {pattern.name}
                </span>
                <span 
                  className="text-[#4A1A1A] text-[13px] tracking-[0.05em] opacity-80"
                  style={{ fontFamily: 'serif' }}
                >
                  {pattern.subtitle}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 下一步按钮 */}
        <motion.button 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: 110 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={!selectedPattern}
        >
          <img 
            src={nextBtn} 
            alt="下一步" 
            style={{ width: 150, opacity: selectedPattern ? 1 : 0.5 }} 
            className="drop-shadow-xl" 
          />
        </motion.button>
      </div>
    </div>
  )
}