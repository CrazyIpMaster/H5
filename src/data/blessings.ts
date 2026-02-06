// 祝福语数据
export interface BlessingData {
  id: string
  text: string
  subtext: string
  category: 'fortune' | 'career' | 'family' | 'health'
}

export const blessings: BlessingData[] = [
  {
    id: 'madaochenggong',
    text: '马到成功',
    subtext: '事业顺遂，一帆风顺',
    category: 'career'
  },
  {
    id: 'wanmayingfu',
    text: '万马迎福',
    subtext: '福气满门，喜气洋洋',
    category: 'fortune'
  },
  {
    id: 'longtenghuye',
    text: '龙腾虎跃',
    subtext: '生龙活虎，朝气蓬勃',
    category: 'health'
  },
  {
    id: 'jixiangruyi',
    text: '吉祥如意',
    subtext: '诸事顺心，万事如意',
    category: 'fortune'
  },
  {
    id: 'fushoulukang',
    text: '福寿康宁',
    subtext: '福寿绑身，健康安宁',
    category: 'health'
  },
  {
    id: 'hejiahuanle',
    text: '阖家欢乐',
    subtext: '家庭和睦，幸福美满',
    category: 'family'
  },
  {
    id: 'jingyusheng',
    text: '鲤跃龙门',
    subtext: '金榜题名，前程似锦',
    category: 'career'
  },
  {
    id: 'huakaifu',
    text: '花开富贵',
    subtext: '繁花似锦，富贵荣华',
    category: 'fortune'
  }
]

// 根据ID获取祝福语
export const getBlessingById = (id: string): BlessingData | undefined => {
  return blessings.find(b => b.id === id)
}

// 根据分类获取祝福语
export const getBlessingsByCategory = (category: BlessingData['category']): BlessingData[] => {
  return blessings.filter(b => b.category === category)
}

