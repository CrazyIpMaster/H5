import { motion } from 'framer-motion'
import { useRef } from 'react'
import html2canvas from 'html2canvas'

// 导入背景图片 - 使用海报4的完整背景
import posterBg from '../../assets/images/level4_creation/海报/海报4/四级页面海报3.png'

// 导入装饰元素
import resetBtn from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-重新选择文字.png'
import shareBtn from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-分享好友文字.png'
import qrCode from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-二维码.png'
import museumLogo from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-博物馆logo.png'

// 导入纹样图片
import cranePattern from '../../assets/images/level4_creation/海报/海报4/四级页面海报3仙鹤.png'
import phoenixPattern from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-双鸟.png'
import mangPattern from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-蟒纹.png'
import flyfishPattern from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-飞鱼.png'
import qilinPattern from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-麒麟.png'

// 导入纹章图片
import craneBadge from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-鹤纹章.png'
import phoenixBadge from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-双鸟纹章.png'
import mangBadge from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-蟒纹章.png'
import flyfishBadge from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-飞鱼纹章.png'
import qilinBadge from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-麒麟纹章.png'

// 导入祝福语标题图片
import blessingTitle1 from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-马到成功标题.png'
import blessingTitle2 from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-万马迎福标题.png'
import blessingTitle3 from '../../assets/images/level4_creation/海报/海报4/四级页面海报3-马迎好运标题.png'

interface PosterResultProps {
  selectedPattern: string | null
  selectedTexture: string | null
  selectedBlessing: string | null
  onReset: () => void
  onBack?: () => void
}

// 纹样映射
const PATTERN_MAP: Record<string, { img: string; badge: string }> = {
  crane: { img: cranePattern, badge: craneBadge },
  phoenix: { img: phoenixPattern, badge: phoenixBadge },
  mang: { img: mangPattern, badge: mangBadge },
  flyfish: { img: flyfishPattern, badge: flyfishBadge },
  qilin: { img: qilinPattern, badge: qilinBadge },
}

// 祝福语映射
const BLESSING_MAP: Record<string, string> = {
  madaochenggong: blessingTitle1,
  wanmayingfu: blessingTitle2,
  mayinghaoyun: blessingTitle3,
}

export const PosterResult = ({ selectedPattern, selectedBlessing, onReset }: PosterResultProps) => {
  const posterRef = useRef<HTMLDivElement>(null)

  // 获取选中的图片
  const patternData = selectedPattern ? PATTERN_MAP[selectedPattern] : null
  const blessingTitle = selectedBlessing ? BLESSING_MAP[selectedBlessing] : null

  // 生成海报图片
  const handleGeneratePoster = async () => {
    if (!posterRef.current) return

    try {
      const canvas = await html2canvas(posterRef.current, {
        useCORS: true,
        scale: 2, // 提高清晰度
        backgroundColor: null,
        width: 640,
        height: 1136,
        // 忽略 scale 变换，以原始尺寸捕获
        ignoreElements: (element) => {
          return element.classList.contains('ignore-capture')
        }
      })

      const image = canvas.toDataURL('image/png')
      
      // 创建下载链接
      const link = document.createElement('a')
      link.href = image
      link.download = `国潮海报-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('海报生成失败:', error)
      alert('海报生成失败，请重试')
    }
  }

  return (
    <div className="absolute inset-0 w-[640px] h-[1136px] overflow-hidden bg-black">
      <div 
        ref={posterRef}
        className="absolute inset-0 overflow-hidden bg-white"
      >
        {/* 背景海报 */}
        <img src={posterBg} alt="海报背景" className="absolute inset-0 w-full h-full object-cover z-0" />
        
        {/* 内容容器 - 同样使用绝对定位确保位置准确 */}
        <div className="absolute inset-0 z-10">

        {/* 左侧祝福语标题 - 竖排 */}
        {blessingTitle && (
          <motion.img
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            src={blessingTitle}
            alt="祝福语"
            className="absolute"
            style={{ 
              left: 30,
              top: 30,
              width: 120,
              height: 'auto',
              zIndex: 10
            }}
          />
        )}

        {/* 中心纹样大图 */}
        {patternData && (
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            src={patternData.img}
            alt="纹样"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ 
              marginTop: 20,
              width: 500,
              height: 'auto',
              zIndex: 30
            }}
          />
        )}

        {/* 右下角纹章 */}
        {patternData && (
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            src={patternData.badge}
            alt="纹章"
            className="absolute"
            style={{ 
              right: 80,
              bottom: 320,
              width: 50,
              height: 'auto',
              zIndex: 10
            }}
          />
        )}

        {/* 底部操作区域 */}
        <div 
          className="absolute w-full flex justify-center items-center ignore-capture"
          style={{ bottom: 220, zIndex: 20 }}
          data-html2canvas-ignore="true"
        >
          <div className="flex items-center" style={{ gap: 80 }}>
            {/* 重新选择按钮 */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
            >
              <img 
                src={resetBtn} 
                alt="重新选择" 
                style={{ width: 140, height: 'auto' }}
                className="drop-shadow-xl"
              />
            </motion.button>

            {/* 分享好友按钮 */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleGeneratePoster}
            >
              <img 
                src={shareBtn} 
                alt="分享好友" 
                style={{ width: 140, height: 'auto' }}
                className="drop-shadow-xl"
              />
            </motion.button>
          </div>
        </div>

        {/* 底部品牌区域 */}
        {/* 博物馆 logo - 居中 */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          src={museumLogo}
          alt="博物馆logo"
          className="absolute left-1/2 -translate-x-1/2"
          style={{ 
            bottom: 60, 
            width: 160, 
            height: 'auto',
            zIndex: 20
          }}
        />

        {/* 二维码 - 向左移动一点 */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          src={qrCode}
          alt="二维码"
          className="absolute"
          style={{ 
            right: 60,
            bottom: 50,
            width: 130, 
            height: 'auto',
            zIndex: 20
          }}
        />
      </div>
      </div>
    </div>
  )
}
