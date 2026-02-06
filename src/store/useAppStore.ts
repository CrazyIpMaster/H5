import { create } from 'zustand'

// 路线类型
export type RouteType = 'sky' | 'earth' | 'water' | null

// 阶段类型
export type PhaseType = 'intro' | 'hub' | 'exploration' | 'creation'

// 纹样数据
export interface Pattern {
  id: string
  name: string
  description: string
  image: string
  route: RouteType
}

// 祝福语数据
export interface Blessing {
  id: string
  text: string
  subtext?: string
}

// 应用状态接口
interface AppState {
  // 当前阶段
  currentPhase: PhaseType
  // 当前选择的路线
  selectedRoute: RouteType
  // 已探索的路线
  exploredRoutes: RouteType[]
  // 已解锁的纹样
  unlockedPatterns: string[]
  // DIY选择的纹样
  selectedPattern: string | null
  // DIY选择的祝福语
  selectedBlessing: string | null
  // 加载状态
  isLoading: boolean
  // 全局加载是否完成
  isAppLoaded: boolean
  // 加载进度
  loadingProgress: number
  // 错误信息
  error: string | null
  
  // 音乐状态
  isMuted: boolean
  introView: 'home' | 'story'

  // Actions
  setPhase: (phase: PhaseType) => void
  selectRoute: (route: RouteType) => void
  startExploration: (route: RouteType) => void
  finishExploration: () => void
  unlockPattern: (patternId: string) => void
  selectPattern: (patternId: string | null) => void
  selectBlessing: (blessingId: string | null) => void
  setLoading: (loading: boolean) => void
  setAppLoaded: (loaded: boolean) => void
  setLoadingProgress: (progress: number) => void
  setError: (error: string | null) => void
  toggleMute: () => void
  setIntroView: (view: 'home' | 'story') => void
  resetToHub: () => void
  resetAll: () => void
}

// 创建 Zustand Store
export const useAppStore = create<AppState>((set, get) => ({
  // 初始状态
  currentPhase: 'intro',
  selectedRoute: null,
  exploredRoutes: [],
  unlockedPatterns: [],
  selectedPattern: null,
  selectedBlessing: null,
  isLoading: false,
  isAppLoaded: false,
  loadingProgress: 0,
  error: null,
  isMuted: false,
  introView: 'home',

  // 设置当前阶段
  setPhase: (phase) => set({ currentPhase: phase }),

  // 选择路线
  selectRoute: (route) => set({ selectedRoute: route }),

  // 开始探索某条路线
  startExploration: (route) => set({
    currentPhase: 'exploration',
    selectedRoute: route
  }),

  // 完成探索，进入创作阶段
  finishExploration: () => {
    const { selectedRoute, exploredRoutes } = get()
    const newExploredRoutes = selectedRoute && !exploredRoutes.includes(selectedRoute)
      ? [...exploredRoutes, selectedRoute]
      : exploredRoutes
    
    set({
      currentPhase: 'creation',
      exploredRoutes: newExploredRoutes
    })
  },

  // 解锁纹样
  unlockPattern: (patternId) => {
    const { unlockedPatterns } = get()
    if (!unlockedPatterns.includes(patternId)) {
      set({ unlockedPatterns: [...unlockedPatterns, patternId] })
    }
  },

  // 选择纹样
  selectPattern: (patternId) => set({ selectedPattern: patternId }),

  // 选择祝福语
  selectBlessing: (blessingId) => set({ selectedBlessing: blessingId }),

  // 设置加载状态
  setLoading: (loading) => set({ isLoading: loading }),

  // 设置全局加载状态
  setAppLoaded: (loaded) => set({ isAppLoaded: loaded }),

  // 设置加载进度
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),

  // 设置错误
  setError: (error) => set({ error }),

  // 切换静音
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  // 设置Intro视图
  setIntroView: (view) => set({ introView: view }),

  // 返回大厅
  resetToHub: () => set({
    currentPhase: 'hub',
    selectedRoute: null,
    selectedPattern: null,
    selectedBlessing: null
  }),

  // 重置所有状态
  resetAll: () => set({
    currentPhase: 'intro',
    selectedRoute: null,
    exploredRoutes: [],
    unlockedPatterns: [],
    selectedPattern: null,
    selectedBlessing: null,
    isLoading: false,
    error: null
  })
}))

