import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { CostumeModal } from './CostumeModal'
import { PatternModal } from './PatternModal'
import { ActionMenuModal } from './ActionMenuModal'
import { ExpansionModal } from './ExpansionModal'

// Assets
import bgImage from '../../assets/images/level3_exploration/瑞兽/三级界面- 瑞兽护岁安-长图背景.png'
import backBtn from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-返回键.png'
import iconCostume from '../../assets/images/level3_exploration/瑞兽/三级界面-瑞兽护岁安-长图-对应服饰介绍图标.png'
import iconPattern from '../../assets/images/level3_exploration/通用/三级界面-瑞兽护岁安-长图-纹饰图标.png'
import happyNewYearIcon from '../../assets/images/level3_exploration/瑞兽/新年快乐对话框图标_白色背景.png'
import textCostume from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-本衣文字.png'
import textPattern from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-纹样文字.png'

// Beast Text Images
import textFlyingFish from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-飞鱼纹文字.png'
import textMang from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-蟒纹文字.png'
import textQilin from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-麒麟纹文字.png'
import textDouniu from '../../assets/images/level3_exploration/瑞兽/斗牛纹/三级界面- 瑞兽护岁安-长图-斗牛纹文字.png'

// Beast Images
import beastFlyingFish from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-飞鱼纹.png'
import beastMang from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-蟒纹.png'
import beastQilin from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-麒麟纹.png'
import beastDouniu from '../../assets/images/level3_exploration/瑞兽/斗牛纹/三级界面- 瑞兽护岁安-长图-斗牛纹.png'

// Costume Assets - Flying Fish
import costumeFlyingFishTitle from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里文字.png'
import costumeFlyingFish1 from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里.png'
import costumeFlyingFish2 from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里背面.png'
import costumeFlyingFish3 from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里大细节.png'
import costumeFlyingFish4 from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里细节1.png'
import costumeFlyingFish5 from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里细节2.png'
import costumeFlyingFish6 from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-香色麻飞鱼贴里细节3.png'

// Costume Assets - Mang
import costumeMangTitle from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍文字.png'
import costumeMang1 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍.png'
import costumeMang2 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍背面.png'
import costumeMang3 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节1.png'
import costumeMang4 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节2.png'
import costumeMang5 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节3.png'
import costumeMang6 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节4.png'

// Costume Assets - Qilin
import costumeQilinTitle from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-大红色绸绣过肩麒麟鸾风纹女袍文字.png'
import costumeQilin1 from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-大红色绸绣过肩麒麟鸾风纹女袍.png'
import costumeQilin2 from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-大红色绸绣过肩麒麟鸾风纹女袍背面.png'
import costumeQilin3 from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-大红色绸绣过肩麒麟鸾风纹女袍细节1.png'
import costumeQilin4 from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-大红色绸绣过肩麒麟鸾风纹女袍细节2.png'
import costumeQilin5 from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-大红色绸绣过肩麒麟鸾风纹女袍细节3.png'

// Costume Assets - Douniu
import costumeDouniuTitle from '../../assets/images/level3_exploration/瑞兽/斗牛纹/三级界面- 瑞兽护岁安-长图-明青色暗花罗缀绣斗牛补袍文字.png'
import costumeDouniu1 from '../../assets/images/level3_exploration/瑞兽/斗牛纹/三级界面- 瑞兽护岁安-长图-明青色暗花罗缀绣斗牛补袍.png'

// Pattern Description Assets
import patternFlyingFishDesc from '../../assets/images/level3_exploration/瑞兽/飞鱼纹/三级界面- 瑞兽护岁安-长图-飞鱼纹文字介绍.png'
import patternMangDesc from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-蟒纹文字介绍.png'
import patternQilinDesc from '../../assets/images/level3_exploration/瑞兽/麒麟纹/三级界面- 瑞兽护岁安-长图-麒麟纹文字介绍.png'
import patternDouniuDesc from '../../assets/images/level3_exploration/瑞兽/斗牛纹/三级界面- 瑞兽护岁安-长图-斗牛纹文字介绍.png'

const BEASTS = [
  { 
    id: 'flying-fish', 
    name: '飞鱼纹', 
    image: beastFlyingFish,
    textImage: textFlyingFish,
    textStyle: { right: 180, top: 700, width: 50 },
    costumeData: {
      titleImage: costumeFlyingFishTitle,
      images: [
        costumeFlyingFish1,
        costumeFlyingFish2,
        costumeFlyingFish3,
        costumeFlyingFish4,
        costumeFlyingFish5,
        costumeFlyingFish6
      ]
    },
    patternData: {
      title: '飞鱼纹',
      contentImage: patternFlyingFishDesc
    }
  },
  { 
    id: 'mang', 
    name: '蟒纹', 
    image: beastMang,
    textImage: textMang,
    textStyle: { left: 220, top: 340, width: 40 },
    costumeData: {
      titleImage: costumeMangTitle,
      images: [
        costumeMang1,
        costumeMang2,
        costumeMang3,
        costumeMang4,
        costumeMang5,
        costumeMang6
      ]
    },
    patternData: {
      title: '蟒纹',
      contentImage: patternMangDesc
    }
  },
  { 
    id: 'qilin', 
    name: '麒麟纹', 
    image: beastQilin,
    textImage: textQilin,
    textStyle: { left: 200, top: 360, width: 35 },
    costumeData: {
      titleImage: costumeQilinTitle,
      images: [
        costumeQilin1,
        costumeQilin2,
        costumeQilin3,
        costumeQilin4,
        costumeQilin5
      ]
    },
    patternData: {
      title: '麒麟纹',
      contentImage: patternQilinDesc
    }
  },
  { 
    id: 'douniu', 
    name: '斗牛纹', 
    image: beastDouniu,
    textImage: textDouniu,
    textStyle: { left: 150, top: 280, width: 40 },
    costumeData: {
      titleImage: costumeDouniuTitle,
      images: [
        costumeDouniu1
      ]
    },
    patternData: {
      title: '斗牛纹',
      contentImage: patternDouniuDesc
    }
  },
]

export function BeastExploration() {
  const { setPhase } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Modal State
  const [isCostumeModalOpen, setIsCostumeModalOpen] = useState(false)
  const [costumeModalData, setCostumeModalData] = useState<{ titleImage: string, images: string[] } | null>(null)

  const [isPatternModalOpen, setIsPatternModalOpen] = useState(false)
  const [patternModalData, setPatternModalData] = useState<{ title: string, contentImage: string } | null>(null)

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false)
  const [isExpansionModalOpen, setIsExpansionModalOpen] = useState(false)

  // Track click positions for each beast: { [beastId]: { x, y } }
  const [beastPopups, setBeastPopups] = useState<Record<string, { x: number, y: number } | null>>({})

  const handleBeastClick = (e: React.MouseEvent<HTMLDivElement>, beastId: string) => {
    // Get click position relative to the container
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setBeastPopups(prev => ({
      ...prev,
      [beastId]: { x, y }
    }))
  }

  const handleOpenCostume = (data: typeof costumeModalData) => {
    setCostumeModalData(data)
    setIsCostumeModalOpen(true)
  }

  const handleOpenPattern = (data: typeof patternModalData) => {
    setPatternModalData(data)
    setIsPatternModalOpen(true)
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
      {/* Content Container */}
      <div 
        ref={containerRef}
        className="absolute inset-0 pointer-events-auto overflow-hidden"
      >
        {/* Back Button (Fixed) */}
          <motion.button
            className="absolute top-8 right-6 z-50 w-10 h-10 flex items-center justify-center"
            whileTap={{ scale: 0.9 }}
            onClick={() => setPhase('hub')}
          >
            <img src={backBtn} alt="Back" className="w-full h-full object-contain" />
          </motion.button>

          {/* Scrollable Container */}
          <div className="absolute inset-0 overflow-y-auto snap-y snap-mandatory hide-scrollbar z-10">
            {BEASTS.map((beast, index) => (
              <div 
                key={beast.id}
                className="w-full h-full snap-start relative flex items-center justify-center overflow-hidden"
              >
                {/* Per-Page Background */}
                <img 
                  src={bgImage} 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover z-0" 
                />

                {/* Beast Image */}
                <motion.div 
                  className="w-[480px] z-10 flex items-center justify-center relative cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: false }}
                  onClick={(e) => handleBeastClick(e, beast.id)}
                >
                   <img src={beast.image} alt={beast.name} className="w-full h-auto drop-shadow-2xl" />
                   
                   {/* Interactive Popup Icon */}
                   <AnimatePresence>
                     {beastPopups[beast.id] && (
                       <motion.img
                         key={`popup-${beast.id}`}
                         src={happyNewYearIcon}
                         alt="Happy New Year"
                         className="absolute w-24 h-auto z-50 pointer-events-none"
                         style={{
                           left: beastPopups[beast.id]!.x,
                           top: beastPopups[beast.id]!.y,
                           x: '-50%', // Center horizontally on click
                           y: '-100%', // Position above click
                         }}
                         initial={{ scale: 0, rotate: -15, opacity: 0 }}
                         animate={{ 
                           scale: 1, 
                           opacity: 1,
                           rotate: [0, -10, 10, -5, 5, 0], // Swaying effect
                           y: ['-100%', '-110%', '-100%'] // Slight bobbing
                         }}
                         exit={{ scale: 0, opacity: 0 }}
                         transition={{ 
                           duration: 0.5,
                           rotate: {
                             repeat: Infinity,
                             repeatType: "mirror",
                             duration: 1.5,
                             ease: "easeInOut"
                           },
                           y: {
                             repeat: Infinity,
                             repeatType: "reverse",
                             duration: 1.0,
                             ease: "easeInOut"
                           }
                         }}
                       />
                     )}
                   </AnimatePresence>
                </motion.div>

                {/* Beast Text Name */}
                <motion.div
                  className="absolute z-20"
                  style={beast.textStyle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: false }}
                >
                  <img src={beast.textImage} alt={beast.name} className="w-full h-auto drop-shadow-lg" />
                </motion.div>

                {/* Bottom Buttons Area - Per Page */}
                
                {/* Left Button: Costume (本衣) - Bottom Left */}
                <motion.div 
                  className="absolute z-20 cursor-pointer flex flex-col items-center gap-1"
                  style={{ left: 130, bottom: 100 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenCostume(beast.costumeData)}
                >
                  <img src={iconCostume} alt="本衣图标" className="w-[86px] h-auto drop-shadow-lg" />
                  <img src={textCostume} alt="本衣" className="w-[44px] h-auto mt-1" />
                </motion.div>

                {/* Generate Poster Button - Only on Last Slide (Douniu) */}
                {index === BEASTS.length - 1 && (
                  <motion.div
                    className="absolute z-20 cursor-pointer bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsActionMenuOpen(true)}
                  >
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      {/* Outer Ripple Effect */}
                      <div className="absolute inset-0 bg-[#FFD700] rounded-full animate-ping opacity-20" />
                      
                      {/* Inner Glow Effect */}
                      <div className="absolute inset-0 bg-[#FFD700] blur-sm opacity-60 animate-pulse rounded-full" />
                      
                      {/* Button Body - Circle */}
                      <div className="relative w-full h-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)] border border-[#FFF8E7]/50" />
                    </div>
                  </motion.div>
                )}

                {/* Right Button: Pattern (纹样) - Bottom Right */}
                <motion.div 
                  className="absolute z-20 cursor-pointer flex flex-col items-center gap-1"
                  style={{ right: 130, bottom: 100 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleOpenPattern(beast.patternData)}
                >
                  <img src={iconPattern} alt="纹样图标" className="w-[72px] h-auto drop-shadow-lg" />
                  <img src={textPattern} alt="纹样" className="w-[44px] h-auto mt-1" />
                </motion.div>
              </div>
            ))}
          </div>

          {/* Costume Modal */}
          <CostumeModal 
            isOpen={isCostumeModalOpen}
            onClose={() => setIsCostumeModalOpen(false)}
            data={costumeModalData}
          />

          {/* Pattern Modal */}
          <PatternModal
            isOpen={isPatternModalOpen}
            onClose={() => setIsPatternModalOpen(false)}
            data={patternModalData}
          />

          <ActionMenuModal
            isOpen={isActionMenuOpen}
            onClose={() => setIsActionMenuOpen(false)}
            onExpansion={() => {
              setIsActionMenuOpen(false)
              setIsExpansionModalOpen(true)
            }}
          />

          <ExpansionModal
            isOpen={isExpansionModalOpen}
            onClose={() => setIsExpansionModalOpen(false)}
          />

      </div>
    </div>
  )
}
