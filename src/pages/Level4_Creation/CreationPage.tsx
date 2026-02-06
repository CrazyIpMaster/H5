import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PatternSelector } from './PatternSelector'
import { TextSelector } from './TextSelector'
import { PosterResult } from './PosterResult'

// Common Assets
import bgImage from '../../assets/images/level4_creation/海报/通用/一级页面-背景.png'
import nextBtn from '../../assets/images/level4_creation/海报/通用/四级页面海报修改-下一步按键.png'

import titleMain from '../../assets/images/level4_creation/海报/通用/四级页面海报(修改1-生成你的好彩头文字.png'
import titleSub from '../../assets/images/level4_creation/海报/通用/四级页面海报(修改1-选择一款你喜欢的纹饰文字.png'
import selectFrame from '../../assets/images/level4_creation/海报/海报1/四级页面海报(修改-选择框.png'

// Step 1 Assets (Patterns) - 从海报1文件夹导入
import p1_crane_img from '../../assets/images/level4_creation/海报/海报1/四级页面海报修改-仙鹤纹.png'
import p1_phoenix_img from '../../assets/images/level4_creation/海报/海报1/四级页面海报修改-鸾凤纹.png'
import p1_mang_img from '../../assets/images/level4_creation/海报/海报1/四级页面海报修改-蟒纹.png'
import p1_flyfish_img from '../../assets/images/level4_creation/海报/海报1/四级页面海报修改-飞鱼纹.png'
import p1_qilin_img from '../../assets/images/level4_creation/海报/海报1/四级页面海报修改-麒麟纹.png'

// Data Definitions
const PATTERNS = [
  { id: 'crane', name: '仙鹤纹', img: p1_crane_img },
  { id: 'phoenix', name: '鸾凤纹', img: p1_phoenix_img },
  { id: 'mang', name: '蟒纹', img: p1_mang_img },
  { id: 'flyfish', name: '飞鱼纹', img: p1_flyfish_img },
  { id: 'qilin', name: '麒麟纹', img: p1_qilin_img },
]

export function CreationPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
  const [selectedTexture, setSelectedTexture] = useState<string | null>(null)
  const [selectedBlessing, setSelectedBlessing] = useState<string | null>(null)

  // Step 1: Pattern Selection

  const handleNextStep1 = () => {
    if (selectedPattern) {
      setStep(2)
    }
  }

  const handleNextStep2 = () => {
    if (selectedTexture) {
      setStep(3)
    }
  }

  const handleNextStep3 = () => {
    if (selectedBlessing) {
      setStep(4)
    }
  }

  const handleBackToStep1 = () => {
    setStep(1)
  }

  const handleBackToStep2 = () => {
    setStep(2)
  }

  // 如果在步骤2，显示 PatternSelector
  if (step === 2) {
    return (
      <PatternSelector
        selectedPattern={selectedTexture}
        onSelect={setSelectedTexture}
        onNext={handleNextStep2}
        onBack={handleBackToStep1}
      />
    )
  }

  // 如果在步骤3，显示 TextSelector（祝福语选择）
  if (step === 3) {
    return (
      <TextSelector
        selectedBlessing={selectedBlessing}
        onSelect={setSelectedBlessing}
        onNext={handleNextStep3}
        onBack={handleBackToStep2}
      />
    )
  }

  // 如果在步骤4，显示 PosterResult（最终海报）
  if (step === 4) {
    return (
      <PosterResult
        selectedPattern={selectedPattern}
        selectedTexture={selectedTexture}
        selectedBlessing={selectedBlessing}
        onReset={() => {
          setSelectedPattern(null)
          setSelectedTexture(null)
          setSelectedBlessing(null)
          setStep(1)
        }}
      />
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background - Same for all steps */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full h-full">
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            {/* 标题区域 */}
            <div 
              className="absolute w-full flex flex-col items-center"
              style={{ top: 140 }}
            >
              <img src={titleMain} alt="生成你的好彩头" style={{ width: 300, height: 'auto' }} />
              <img src={titleSub} alt="选择一款你喜欢的纹饰" style={{ width: 240, height: 'auto', marginTop: 16 }} />
            </div>

            {/* 第一行: 仙鹤纹 & 鸾凤纹 */}
            <div 
              className="absolute w-full flex justify-center"
              style={{ top: 290 }}
            >
              <div className="flex justify-center items-start" style={{ gap: 100 }}>
                {PATTERNS.slice(0, 2).map((p) => (
                  <motion.div 
                    key={p.id} 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setSelectedPattern(p.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* 图片和选择框容器 - 只包含纹理图片，不包含文字 */}
                    <div className="relative" style={{ width: 200, height: 200 }}>
                      {/* 选中时的底纹选择框 - 与纹理图片垂直水平居中 */}
                      {selectedPattern === p.id && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                          style={{ 
                            width: 230,
                            height: 230,
                          }}
                          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.4,
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                          }}
                        >
                          <img 
                            src={selectFrame} 
                            alt="选择框" 
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      )}

                      {/* 纹饰图片 - 与选择框完美对齐 */}
                      <motion.img 
                        src={p.img} 
                        alt={p.name} 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl z-10"
                        style={{ width: 200, height: 'auto' }}
                        animate={selectedPattern === p.id ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* 纹饰名称 - 使用 style 直接设置间距 */}
                    <span 
                      className="text-[#4A1A1A] text-[16px] tracking-wider"
                      style={{ fontFamily: 'serif', marginTop: 40 }}
                    >
                      {p.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 第二行: 蟒纹, 飞鱼纹, 麒麟纹 */}
            <div 
              className="absolute w-full flex justify-center"
              style={{ top: 630 }}
            >
              <div className="flex justify-center items-start" style={{ gap: 30 }}>
                {PATTERNS.slice(2, 5).map((p) => (
                  <motion.div 
                    key={p.id} 
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setSelectedPattern(p.id)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* 图片和选择框容器 - 只包含纹理图片，不包含文字 */}
                    <div className="relative" style={{ width: 180, height: 180 }}>
                      {/* 选中时的底纹选择框 - 与纹理图片垂直水平居中 */}
                      {selectedPattern === p.id && (
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                          style={{ 
                            width: 220,
                            height: 220,
                          }}
                          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: 0.4,
                            type: "spring",
                            stiffness: 200,
                            damping: 15
                          }}
                        >
                          <img 
                            src={selectFrame} 
                            alt="选择框" 
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      )}

                      {/* 纹饰图片 - 与选择框完美对齐 */}
                      <motion.img 
                        src={p.img} 
                        alt={p.name} 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-2xl z-10"
                        style={{ width: 180, height: 'auto' }}
                        animate={selectedPattern === p.id ? { scale: 1.05 } : { scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* 纹饰名称 - 使用 style 直接设置间距 */}
                    <span 
                      className="text-[#4A1A1A] text-[16px] tracking-wider"
                      style={{ fontFamily: 'serif', marginTop: 35 }}
                    >
                      {p.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 下一步按钮 */}
            <motion.button 
              className="absolute left-1/2 -translate-x-1/2"
              style={{ bottom: 140 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextStep1}
              disabled={!selectedPattern}
            >
              <img 
                src={nextBtn} 
                alt="下一步" 
                style={{ width: 150, opacity: selectedPattern ? 1 : 0.5 }} 
                className="drop-shadow-xl" 
              />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
