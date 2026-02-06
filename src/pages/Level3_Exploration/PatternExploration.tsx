import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { CostumeModal } from './CostumeModal'
import { PatternModal } from './PatternModal'
import { ActionMenuModal } from './ActionMenuModal'
import { ExpansionModal } from './ExpansionModal'

// Assets
import bgImage from '../../assets/images/level3_exploration/祥纹/三级界面-祥纹绕衣行-长图背景.png'
import backBtn from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-返回键.png'
import iconCostume from '../../assets/images/level3_exploration/祥纹/三级界面-祥纹绕衣行-长图_对应服饰介绍图标.png'
import iconPattern from '../../assets/images/level3_exploration/通用/三级界面-瑞兽护岁安-长图-纹饰图标.png'
import textCostume from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-本衣文字.png'
import textPattern from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-纹样文字.png'

// Pattern Text Images
import textRuyi from '../../assets/images/level3_exploration/祥纹/四合如意纹/三级界面-祥纹绕衣行-长图-四合如意纹文字.png'
import textShoushan from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-寿山福海文字.png'
import textFlower from '../../assets/images/level3_exploration/祥纹/折枝花纹/三级界面-祥纹绕衣行-长图-折枝花纹文字.png'
import textSeawater from '../../assets/images/level3_exploration/祥纹/海水江崖纹/三级界面-祥纹绕衣行-长图-海水江崖纹文字.png'

// Pattern Images
import patternRuyi from '../../assets/images/level3_exploration/祥纹/四合如意纹/三级界面-祥纹绕衣行-长图-四合如意纹.png'
import patternShoushan from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-寿山福海.png'
import patternFlower from '../../assets/images/level3_exploration/祥纹/折枝花纹/三级界面-祥纹绕衣行-长图-折枝花纹.png'
import patternSeawater from '../../assets/images/level3_exploration/祥纹/海水江崖纹/三级界面-祥纹绕衣行-长图-海水江崖纹.png'

// Pattern Detail Images (JPEGs)
import detailRuyi from '../../assets/images/level3_exploration/祥纹/四合如意纹/四合如意.jpeg'
import detailShoushan from '../../assets/images/level3_exploration/祥纹/寿山福海/寿山福海.jpeg'
import detailFlower from '../../assets/images/level3_exploration/祥纹/折枝花纹/折枝花纹.jpeg'
import detailSeawater from '../../assets/images/level3_exploration/祥纹/海水江崖纹/海水江崖.jpeg'

// Costume - Shoushan (Used as placeholder for others where missing)
import costumeShoushan1 from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-香色芝麻纱绣过肩蟒女长衫.png'
import costumeShoushan2 from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-香色芝麻纱绣过肩蟒女长衫背面.png'
import costumeShoushan3 from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-香色芝麻纱绣过肩蟒女长衫细节1.png'
import costumeShoushan4 from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-香色芝麻纱绣过肩蟒女长衫细节2.png'
import costumeShoushan5 from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-香色芝麻纱绣过肩蟒女长衫细节3.png'

// Costume - Mang (For Haishuijiangya and Siheruyi)
import costumeMang1 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍.png'
import costumeMang2 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍背面.png'
import costumeMang3 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节1.png'
import costumeMang4 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节2.png'
import costumeMang5 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节3.png'
import costumeMang6 from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍细节4.png'
import costumeMangTitle from '../../assets/images/level3_exploration/瑞兽/蟒纹/三级界面- 瑞兽护岁安-长图-茶色织金蟒妆花纱道袍文字.png'

// Pattern Content Images
import contentRuyi from '../../assets/images/level3_exploration/祥纹/四合如意纹/三级界面-祥纹绕衣行-长图-四合如意纹文字内容.png'
import contentShoushan from '../../assets/images/level3_exploration/祥纹/寿山福海/三级界面-祥纹绕衣行-长图-寿山福海文字内容.png'
import contentFlower from '../../assets/images/level3_exploration/祥纹/折枝花纹/三级界面-祥纹绕衣行-长图-折枝花纹文字内容.png'
import contentSeawater from '../../assets/images/level3_exploration/祥纹/海水江崖纹/三级界面-祥纹绕衣行-长图-海水江崖纹文字内容.png'

const PATTERNS = [
  { 
    id: 'haishuijiangya', 
    name: '海水江崖纹', 
    image: patternSeawater,
    detailImage: detailSeawater,
    textImage: textSeawater,
    textStyle: { right: 220, top: 250, width: 200 },
    costumeData: {
      titleImage: costumeMangTitle, 
      images: [costumeMang1, costumeMang2, costumeMang3, costumeMang4, costumeMang5, costumeMang6]
    },
    patternData: {
      title: '海水江崖纹',
      contentImage: contentSeawater
    }
  },
  { 
    id: 'siheruyi', 
    name: '四合如意纹', 
    image: patternRuyi,
    detailImage: detailRuyi,
    textImage: textRuyi,
    textStyle: { left: 220, top: 250, width: 200 },
    costumeData: {
      titleImage: costumeMangTitle,
      images: [costumeMang1, costumeMang2, costumeMang3, costumeMang4, costumeMang5, costumeMang6]
    },
    patternData: {
      title: '四合如意纹',
      contentImage: contentRuyi
    }
  },
  { 
    id: 'shoushanfuhai', 
    name: '寿山福海', 
    image: patternShoushan,
    detailImage: detailShoushan,
    textImage: textShoushan,
    textStyle: { left: 220, top: 270, width: 200 },
    costumeData: {
      titleImage: textShoushan,
      images: [costumeShoushan1, costumeShoushan2, costumeShoushan3, costumeShoushan4, costumeShoushan5]
    },
    patternData: {
      title: '寿山福海',
      contentImage: contentShoushan
    }
  },
  { 
    id: 'zhezhihua', 
    name: '折枝花纹', 
    image: patternFlower,
    detailImage: detailFlower,
    textImage: textFlower,
    textStyle: { left: 280, top: 300, width: 60 },
    costumeData: {
      titleImage: textFlower, // Use pattern text as title
      images: [costumeShoushan1, costumeShoushan2, costumeShoushan3, costumeShoushan4, costumeShoushan5] // Placeholder
    },
    patternData: {
      title: '折枝花纹',
      contentImage: contentFlower
    }
  },
]

export function PatternExploration() {
  const { setPhase } = useAppStore()
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'none' | 'costume' | 'pattern' | 'action' | 'expansion'>('none')
  const [selectedItem, setSelectedItem] = useState<typeof PATTERNS[0] | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Fixed resolution scaling logic (Same as StorySlider/HubPage)
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      const targetRatio = 640 / 1136
      const windowRatio = windowWidth / windowHeight

      let newScale = 1
      if (windowRatio > targetRatio) {
        newScale = windowHeight / 1136
      } else {
        newScale = windowWidth / 640
      }
      setScale(newScale)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCostumeClick = (pattern: typeof PATTERNS[0]) => {
    if (pattern.costumeData) {
      setSelectedItem(pattern)
      setActiveModal('costume')
    }
  }

  const handlePatternClick = (pattern: typeof PATTERNS[0]) => {
    setSelectedItem(pattern)
    setActiveModal('pattern')
  }

  const closeModal = () => {
    setActiveModal('none')
    setTimeout(() => setSelectedItem(null), 300) // Clear after animation
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Content Container - Scaled to Maintain 640x1136 Ratio */}
      <div 
        ref={containerRef}
        className="absolute pointer-events-auto overflow-hidden"
        style={{ 
          width: 640, 
          height: 1136,
          left: '50%',
          top: '50%',
          transform: `translate(-50%, -50%) scale(${scale})`,
        }}
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
            {PATTERNS.map((pattern, index) => (
              <div 
                key={pattern.id}
                className="w-full h-full snap-start relative flex items-center justify-center overflow-hidden"
              >
                {/* Per-Page Background */}
                <img 
                  src={bgImage} 
                  alt="Background" 
                  className="absolute inset-0 w-full h-full object-cover z-0" 
                />

                {/* Pattern Image */}
                <motion.div 
                  className="w-[400px] z-10 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: false }}
                  onClick={() => setPreviewImage(pattern.detailImage)}
                >
                   <img src={pattern.image} alt={pattern.name} className="w-full h-auto drop-shadow-2xl" />
                </motion.div>

                {/* Pattern Text Name */}
                <motion.div
                  className="absolute z-20"
                  style={pattern.textStyle}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  viewport={{ once: false }}
                >
                  <img src={pattern.textImage} alt={pattern.name} className="w-full h-auto drop-shadow-lg" />
                </motion.div>

                {/* Bottom Buttons Area - Per Page */}
                
                {/* Left Button: Costume (本衣) - Always visible now */}
                <motion.div 
                  className="absolute z-30 cursor-pointer flex flex-col items-center gap-1"
                  style={{ left: 130, bottom: 100 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCostumeClick(pattern)}
                >
                  <img src={iconCostume} alt="本衣图标" className="w-[86px] h-auto drop-shadow-lg" />
                  <img src={textCostume} alt="本衣" className="w-[44px] h-auto mt-1" />
                </motion.div>

                {/* Generate Poster Button - Only on Last Slide */}
                {index === PATTERNS.length - 1 && (
                  <motion.div
                    className="absolute z-30 cursor-pointer bottom-10 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveModal('action')}
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
                  className="absolute z-30 cursor-pointer flex flex-col items-center gap-1"
                  style={{ right: 130, bottom: 100 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePatternClick(pattern)}
                >
                  <img src={iconPattern} alt="纹样图标" className="w-[72px] h-auto drop-shadow-lg" />
                  <img src={textPattern} alt="纹样" className="w-[44px] h-auto mt-1" />
                </motion.div>
              </div>
            ))}
          </div>
          
          {/* Modals */}
          <CostumeModal 
            isOpen={activeModal === 'costume'}
            onClose={closeModal}
            data={selectedItem ? selectedItem.costumeData : null}
          />
          
          <PatternModal
            isOpen={activeModal === 'pattern'}
            onClose={closeModal}
            data={selectedItem ? selectedItem.patternData : null}
          />

          <ActionMenuModal
            isOpen={activeModal === 'action'}
            onClose={closeModal}
            onExpansion={() => setActiveModal('expansion')}
          />

          <ExpansionModal
            isOpen={activeModal === 'expansion'}
            onClose={closeModal}
          />

          {/* Lightbox Modal */}
          <AnimatePresence>
            {previewImage && (
              <motion.div 
                className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 pointer-events-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPreviewImage(null)}
              >
                <motion.img 
                  src={previewImage} 
                  alt="Detail" 
                  className="max-w-full max-h-full object-contain rounded-lg drop-shadow-2xl"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                />
                {/* Close Button */}
                 <button 
                  className="absolute top-8 right-8 text-white/80 hover:text-white"
                  onClick={() => setPreviewImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

      </div>
    </div>
  )
}
