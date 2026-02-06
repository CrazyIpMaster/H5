import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { CostumeModal } from './CostumeModal'
import { PatternModal } from './PatternModal'
import { ActionMenuModal } from './ActionMenuModal'
import { ExpansionModal } from './ExpansionModal'

// Assets
import bgImage from '../../assets/images/level3_exploration/飞羽/三级界面-飞羽衔春至-长图背景.png'
import backBtn from '../../assets/images/level3_exploration/通用/三级界面- 瑞兽护岁安-长图-返回键.png'
import iconCostume from '../../assets/images/level3_exploration/飞羽/三级界面-飞羽衔春至-长图_对应服饰介绍图标.png'
import iconPattern from '../../assets/images/level3_exploration/通用/三级界面-瑞兽护岁安-长图-纹饰图标.png'
import textCostume from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-本衣文字.png'
import textPattern from '../../assets/images/level3_exploration/通用/三级界面-飞羽衔春至-长图-纹样文字.png'

// Feiyu Text Images
import textCrane from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-仙鹤纹文字.png'
import textSwallow from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-燕子纹文字.png'
import textKingfisher from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-翠鸟纹文字.png'
import textPhoenix from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-鸾凤纹文字.png'
import textPeacock from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-孔雀纹文字.png'

// Feiyu Images
import beastCrane from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-仙鹤纹.png'
import beastSwallow from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-燕子纹.png'
import beastKingfisher from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-翠鸟纹.png'
import beastPhoenix from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-鸾凤纹.png'
import beastPeacock from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-孔雀纹.png'

// Costume Titles
import titleCrane from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-大红色暗花纱缀绣云鹤方补圆领文字.png'
import titleFlower from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙文字.png'
import titlePhoenix from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花缎缀绣鸾凤圆补女袍文字.png'
import titlePeacock from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-青地织金妆花纱孔雀方补女短衫文字.png'

// Costume Images - Crane
import craneCostume1 from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-大红色暗花纱缀绣云鹤方补圆领.png'
import craneCostume2 from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-大红色暗花纱缀背面.png'
import craneCostume3 from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-大红色暗花纱缀细节1.png'
import craneCostume4 from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-大红色暗花纱缀细节2.png'
import craneCostume5 from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-大红色暗花纱缀细节3.png'

// Costume Images - Flower (Swallow/Kingfisher)
import flowerCostume1 from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙.png'
import flowerCostume2 from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙细节1.png'
import flowerCostume3 from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙细节2.png'
import flowerCostume4 from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙细节3.png'
import flowerCostume5 from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙细节4.png'
import flowerCostume6 from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-白色暗花纱绣花鸟纹裙细节5.png'

// Costume Images - Phoenix
import phoenixCostume1 from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花缎缀绣鸾凤圆补女袍.png'
import phoenixCostume2 from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花缎缀绣鸾凤圆补女袍背面.png'
import phoenixCostume3 from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花细节1.png'
import phoenixCostume4 from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花细节2.png'
import phoenixCostume5 from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花细节3.png'
import phoenixCostume6 from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-赭红色暗花细节4.png'

// Costume Images - Peacock
import peacockCostume1 from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-青地织金妆花纱孔雀方补女短衫.png'
import peacockCostume2 from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-黑色孔雀方纹细节.png'
import peacockCostume3 from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-黑色孔雀方纹背面细节.png'

// Pattern Content Images
import contentCrane from '../../assets/images/level3_exploration/飞羽/仙鹤纹/三级界面-飞羽衔春至-长图-仙鹤纹文字内容.png'
import contentSwallow from '../../assets/images/level3_exploration/飞羽/翠鸟纹和燕子纹/三级界面-飞羽衔春至-长图-燕子纹文字内容.png'
import contentPhoenix from '../../assets/images/level3_exploration/飞羽/鸾凤纹/三级界面-飞羽衔春至-长图-鸾凤纹文字内容.png'
import contentPeacock from '../../assets/images/level3_exploration/飞羽/孔雀纹/三级界面-飞羽衔春至-长图-孔雀纹文字内容.png'

const BEASTS = [
  { 
    id: 'crane', 
    name: '仙鹤纹', 
    image: beastCrane,
    textImage: textCrane,
    textStyle: { right: 400, top: 300, width: 40 },
    costumeData: {
      titleImage: titleCrane,
      images: [craneCostume1, craneCostume2, craneCostume3, craneCostume4, craneCostume5]
    },
    patternData: {
      title: '仙鹤纹',
      contentImage: contentCrane
    }
  },
  { 
    id: 'swallow_kingfisher', 
    name: '燕子纹 & 翠鸟纹', 
    // Composite type
    isComposite: true,
    elements: [
      {
        id: 'swallow',
        image: beastSwallow,
        textImage: textSwallow,
        style: { left: 60, bottom: 380, width: 300 }, // Adjusted position for bottom-left flying right
        textStyle: { left: 60, bottom: 550, width: 40 }
      },
      {
        id: 'kingfisher',
        image: beastKingfisher,
        textImage: textKingfisher,
        style: { right: 60, top: 320, width: 300 }, // Adjusted position for top-right flying left
        imageStyle: { transform: 'scaleX(-1) rotate(80deg)' },
        textStyle: { right: 50, top: 400, width: 50 }
      }
    ],
    costumeData: {
      titleImage: titleFlower,
      images: [flowerCostume1, flowerCostume2, flowerCostume3, flowerCostume4, flowerCostume5, flowerCostume6]
    },
    patternData: {
      title: '燕子纹 & 翠鸟纹',
      contentImage: contentSwallow // Using Swallow content as representative or could toggle
    }
  },
  { 
    id: 'phoenix', 
    name: '鸾凤纹', 
    image: beastPhoenix,
    textImage: textPhoenix,
    textStyle: { left: 360, top: 700, width: 50 },
    costumeData: {
      titleImage: titlePhoenix,
      images: [phoenixCostume1, phoenixCostume2, phoenixCostume3, phoenixCostume4, phoenixCostume5, phoenixCostume6]
    },
    patternData: {
      title: '鸾凤纹',
      contentImage: contentPhoenix
    }
  },
  { 
    id: 'peacock', 
    name: '孔雀纹', 
    image: beastPeacock,
    textImage: textPeacock,
    textStyle: { left: 100, top: 350, width: 40 },
    costumeData: {
      titleImage: titlePeacock,
      images: [peacockCostume1, peacockCostume2, peacockCostume3]
    },
    patternData: {
      title: '孔雀纹',
      contentImage: contentPeacock
    }
  },
]

export function FeiyuExploration() {
  const { setPhase } = useAppStore()
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Modal State
  const [activeModal, setActiveModal] = useState<'none' | 'costume' | 'pattern' | 'action' | 'expansion'>('none')
  const [selectedItem, setSelectedItem] = useState<typeof BEASTS[0] | null>(null)

  const handleCostumeClick = (beast: typeof BEASTS[0]) => {
    setSelectedItem(beast)
    setActiveModal('costume')
  }

  const handlePatternClick = (beast: typeof BEASTS[0]) => {
    setSelectedItem(beast)
    setActiveModal('pattern')
  }

  const closeModal = () => {
    setActiveModal('none')
    setTimeout(() => setSelectedItem(null), 300) // Clear after animation
  }

  return (
    <div className="absolute inset-0 w-[640px] h-[1136px] overflow-hidden bg-black">
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

                {/* Beast Image & Text Rendering */}
                {/* @ts-ignore - handling composite vs single beast */}
                {beast.isComposite ? (
                  // Composite View (Swallow & Kingfisher)
                  <>
                    {/* @ts-ignore */}
                    {beast.elements.map((element: any) => (
                      <div key={element.id}>
                        <motion.div 
                          className="absolute z-10"
                          style={element.style}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          viewport={{ once: false }}
                        >
                           <img src={element.image} alt={element.id} className="w-full h-auto drop-shadow-2xl" style={element.imageStyle} />
                        </motion.div>
                        <motion.div
                          className="absolute z-20"
                          style={element.textStyle}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                          viewport={{ once: false }}
                        >
                          <img src={element.textImage} alt={element.id} className="w-full h-auto drop-shadow-lg" />
                        </motion.div>
                      </div>
                    ))}
                  </>
                ) : (
                  // Single Beast View
                  <>
                    <motion.div 
                      className="w-[500px] -mt-20 z-10"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      viewport={{ once: false }}
                    >
                       {/* @ts-ignore */}
                       <img src={beast.image} alt={beast.name} className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>

                    <motion.div
                      className="absolute z-20"
                      // @ts-ignore
                      style={beast.textStyle}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                      viewport={{ once: false }}
                    >
                      {/* @ts-ignore */}
                      <img src={beast.textImage} alt={beast.name} className="w-full h-auto drop-shadow-lg" />
                    </motion.div>
                  </>
                )}

                {/* Bottom Buttons Area - Per Page */}
                
                {/* Left Button: Costume (本衣) - Bottom Left */}
                <motion.div 
                  className="absolute z-30 cursor-pointer flex flex-col items-center gap-1"
                  style={{ left: 130, bottom: 100 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCostumeClick(beast)}
                >
                  <img src={iconCostume} alt="本衣图标" className="w-[86px] h-auto drop-shadow-lg" />
                  <img src={textCostume} alt="本衣" className="w-[44px] h-auto mt-1" />
                </motion.div>

                {/* Generate Poster Button - Only on Last Slide */}
                {index === BEASTS.length - 1 && (
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
                  onClick={() => handlePatternClick(beast)}
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

      </div>
    </div>
  )
}
