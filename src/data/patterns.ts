import type { RouteType } from '../store/useAppStore'

// 纹样数据
export interface PatternData {
  id: string
  name: string
  description: string
  meaning: string
  image: string
  route: RouteType
  hotspotPosition?: { x: number; y: number }
}

// 飞禽类纹样 (天)
export const skyPatterns: PatternData[] = [
  {
    id: 'crane',
    name: '仙鹤',
    description: '鹤为仙禽，寓意长寿延年。其姿态优雅，常与松柏相伴，象征高洁与长寿。',
    meaning: '延年益寿，高洁脱俗',
    image: '/assets/patterns/crane.svg',
    route: 'sky',
    hotspotPosition: { x: 50, y: 30 }
  },
  {
    id: 'phoenix',
    name: '鸾凤',
    description: '凤凰为百鸟之王，象征祥瑞与美好。龙凤呈祥，是中华民族最崇高的吉祥图腾。',
    meaning: '吉祥如意，龙凤呈祥',
    image: '/assets/patterns/phoenix.svg',
    route: 'sky',
    hotspotPosition: { x: 50, y: 60 }
  },
  {
    id: 'swallow',
    name: '燕子',
    description: '燕子归来，春暖花开。燕子纹样寓意春回大地，家庭和睦，幸福美满。',
    meaning: '春回大地，阖家幸福',
    image: '/assets/patterns/swallow.svg',
    route: 'sky',
    hotspotPosition: { x: 50, y: 85 }
  }
]

// 瑞兽类纹样 (地)
export const earthPatterns: PatternData[] = [
  {
    id: 'dragon',
    name: '蟒龙',
    description: '龙为四灵之首，象征权威与尊贵。蟒龙纹是皇家御用纹样，代表至高无上的地位。',
    meaning: '权威尊贵，飞黄腾达',
    image: '/assets/patterns/dragon.svg',
    route: 'earth',
    hotspotPosition: { x: 50, y: 25 }
  },
  {
    id: 'qilin',
    name: '麒麟',
    description: '麒麟为仁兽，性情温和，不伤生灵。麒麟送子，是最美好的祝福之一。',
    meaning: '仁德祥瑞，麒麟送子',
    image: '/assets/patterns/qilin.svg',
    route: 'earth',
    hotspotPosition: { x: 50, y: 55 }
  },
  {
    id: 'baize',
    name: '白泽',
    description: '白泽能言，知万物之情。传说黄帝东巡遇白泽，得知天下鬼神之事，遂画图以示天下。',
    meaning: '驱邪避凶，智慧通达',
    image: '/assets/patterns/baize.svg',
    route: 'earth',
    hotspotPosition: { x: 50, y: 80 }
  }
]

// 器物/水纹类纹样 (水)
export const waterPatterns: PatternData[] = [
  {
    id: 'wave',
    name: '海水江崖',
    description: '海水江崖纹，寓意福山寿海，江山永固。波涛汹涌中山石屹立，象征坚定不移。',
    meaning: '福山寿海，江山永固',
    image: '/assets/patterns/wave.svg',
    route: 'water',
    hotspotPosition: { x: 50, y: 30 }
  },
  {
    id: 'ruyi',
    name: '四合如意',
    description: '如意纹取"如意"之名，四合如意更是四方皆顺，万事如意的美好寓意。',
    meaning: '万事如意，四方皆顺',
    image: '/assets/patterns/ruyi.svg',
    route: 'water',
    hotspotPosition: { x: 50, y: 55 }
  },
  {
    id: 'flower',
    name: '折枝花',
    description: '折枝花纹取花卉最美的姿态，牡丹富贵，莲花高洁，梅花傲骨，各有寓意。',
    meaning: '花开富贵，繁荣昌盛',
    image: '/assets/patterns/flower.svg',
    route: 'water',
    hotspotPosition: { x: 50, y: 80 }
  }
]

// 所有纹样
export const allPatterns: PatternData[] = [
  ...skyPatterns,
  ...earthPatterns,
  ...waterPatterns
]

// 获取所有纹样 (Fix for Preloader)
export const getAllPatterns = () => allPatterns

// 根据路线获取纹样
export const getPatternsByRoute = (route: RouteType): PatternData[] => {
  switch (route) {
    case 'sky':
      return skyPatterns
    case 'earth':
      return earthPatterns
    case 'water':
      return waterPatterns
    default:
      return []
  }
}

// 根据ID获取纹样
export const getPatternById = (id: string): PatternData | undefined => {
  return allPatterns.find(p => p.id === id)
}
