import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../store/useAppStore'
import { analytics } from '../../utils/analytics'

// Assets
import bgImage from '../../assets/images/level2_hub/二级页面-背景.png'
import dragonImg from '../../assets/images/level2_hub/二级页面-龙.png'
import flowerImg from '../../assets/images/level2_hub/二级页面-花.png'
import craneImg from '../../assets/images/level2_hub/二级页面_02.png' // Assuming this is the Crane image based on visual inspection or naming convention
import btnBeast from '../../assets/images/level2_hub/二级页面-瑞兽护岁安按钮.png'
import btnFeather from '../../assets/images/level2_hub/二级页面-飞羽按钮.png'
import btnPattern from '../../assets/images/level2_hub/二级页面-祥纹饶衣行按钮.png'

export function HubPage() {
  const { selectRoute, setPhase } = useAppStore()

  useEffect(() => {
    analytics.logEvent('page_view', { page: 'hub' });
  }, []);

  const handleRouteSelect = (route: 'earth' | 'sky' | 'water') => {
    selectRoute(route)
    setPhase('exploration')
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url("${bgImage}")` }}
      />

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {/* 层级 1: 装饰元素 - 龙、鹤、花 */}
        
        {/* 龙 - 右上角 */}
        <motion.img 
          src={dragonImg} 
          alt="Dragon" 
          className="absolute will-change-transform"
          style={{ 
            left: 240, 
            top: -30, 
            width: 400, 
            height: 'auto',
            zIndex: 1
          }}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* 仙鹤 - 左中部，站在梅花枝上 */}
        <motion.img 
          src={craneImg} 
          alt="Crane" 
          className="absolute will-change-transform"
          style={{ 
            left: 0, 
            top: 380, 
            width: 320, 
            height: 'auto',
            zIndex: 1
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* 花卉 - 右下角牡丹花 */}
        <motion.img 
          src={flowerImg} 
          alt="Flowers" 
          className="absolute will-change-transform"
          style={{ 
            left: 260, // +20px from 150
            top: 780, 
            width: 400, 
            height: 'auto',
            zIndex: 1
          }}
          animate={{ scale: [1, 1.015, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* 层级 2: 按钮 - 最上层 */}
        
        {/* 瑞兽护岁安 - 右上角按钮 */}
        <motion.div
          className="absolute cursor-pointer"
          style={{ 
            left: 220, 
            top: 50,
            zIndex: 2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRouteSelect('earth')}
        >
          <img src={btnBeast} alt="瑞兽护岁安" className="w-[70px] h-auto drop-shadow-lg" />
        </motion.div>

        {/* 飞羽衔春至 - 左侧按钮 */}
        <motion.div
          className="absolute cursor-pointer"
          style={{ 
            left: 20, 
            top: 320,
            zIndex: 2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRouteSelect('sky')}
        >
          <img src={btnFeather} alt="飞羽衔春至" className="w-[70px] h-auto drop-shadow-lg" />
        </motion.div>

        {/* 祥纹绕衣行 - 右下角按钮 */}
        <motion.div
          className="absolute cursor-pointer"
          style={{ 
            left: 210, 
            top: 860,
            zIndex: 2
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleRouteSelect('water')}
        >
          <img src={btnPattern} alt="祥纹饶衣行" className="w-[70px] h-auto drop-shadow-lg" />
        </motion.div>
      </div>
    </div>
  )
}
