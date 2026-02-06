import { describe, it, expect, beforeEach } from 'vitest'
import { useAppStore } from './useAppStore'

describe('useAppStore', () => {
  beforeEach(() => {
    // 重置 store 状态
    useAppStore.getState().resetAll()
  })

  describe('初始状态', () => {
    it('应该有正确的初始状态', () => {
      const state = useAppStore.getState()
      
      expect(state.currentPhase).toBe('intro')
      expect(state.selectedRoute).toBeNull()
      expect(state.exploredRoutes).toEqual([])
      expect(state.unlockedPatterns).toEqual([])
      expect(state.selectedPattern).toBeNull()
      expect(state.selectedBlessing).toBeNull()
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })
  })

  describe('setPhase', () => {
    it('应该正确设置当前阶段', () => {
      const { setPhase } = useAppStore.getState()
      
      setPhase('hub')
      expect(useAppStore.getState().currentPhase).toBe('hub')
      
      setPhase('exploration')
      expect(useAppStore.getState().currentPhase).toBe('exploration')
      
      setPhase('creation')
      expect(useAppStore.getState().currentPhase).toBe('creation')
    })
  })

  describe('startExploration', () => {
    it('应该正确开始探索并设置路线', () => {
      const { startExploration } = useAppStore.getState()
      
      startExploration('sky')
      
      const state = useAppStore.getState()
      expect(state.currentPhase).toBe('exploration')
      expect(state.selectedRoute).toBe('sky')
    })

    it('应该支持不同的路线', () => {
      const { startExploration } = useAppStore.getState()
      
      startExploration('earth')
      expect(useAppStore.getState().selectedRoute).toBe('earth')
      
      startExploration('water')
      expect(useAppStore.getState().selectedRoute).toBe('water')
    })
  })

  describe('finishExploration', () => {
    it('应该完成探索并记录已探索路线', () => {
      const { startExploration, finishExploration } = useAppStore.getState()
      
      startExploration('sky')
      finishExploration()
      
      const state = useAppStore.getState()
      expect(state.currentPhase).toBe('creation')
      expect(state.exploredRoutes).toContain('sky')
    })

    it('不应该重复记录已探索的路线', () => {
      const { startExploration, finishExploration, setPhase } = useAppStore.getState()
      
      startExploration('sky')
      finishExploration()
      
      setPhase('hub')
      startExploration('sky')
      finishExploration()
      
      const state = useAppStore.getState()
      expect(state.exploredRoutes.filter(r => r === 'sky').length).toBe(1)
    })
  })

  describe('unlockPattern', () => {
    it('应该正确解锁纹样', () => {
      const { unlockPattern } = useAppStore.getState()
      
      unlockPattern('crane')
      expect(useAppStore.getState().unlockedPatterns).toContain('crane')
      
      unlockPattern('dragon')
      expect(useAppStore.getState().unlockedPatterns).toContain('dragon')
    })

    it('不应该重复解锁同一纹样', () => {
      const { unlockPattern } = useAppStore.getState()
      
      unlockPattern('crane')
      unlockPattern('crane')
      
      const state = useAppStore.getState()
      expect(state.unlockedPatterns.filter(p => p === 'crane').length).toBe(1)
    })
  })

  describe('selectPattern', () => {
    it('应该正确选择纹样', () => {
      const { selectPattern } = useAppStore.getState()
      
      selectPattern('phoenix')
      expect(useAppStore.getState().selectedPattern).toBe('phoenix')
    })

    it('应该能够取消选择', () => {
      const { selectPattern } = useAppStore.getState()
      
      selectPattern('phoenix')
      selectPattern(null)
      expect(useAppStore.getState().selectedPattern).toBeNull()
    })
  })

  describe('selectBlessing', () => {
    it('应该正确选择祝福语', () => {
      const { selectBlessing } = useAppStore.getState()
      
      selectBlessing('madaochenggong')
      expect(useAppStore.getState().selectedBlessing).toBe('madaochenggong')
    })

    it('应该能够取消选择', () => {
      const { selectBlessing } = useAppStore.getState()
      
      selectBlessing('madaochenggong')
      selectBlessing(null)
      expect(useAppStore.getState().selectedBlessing).toBeNull()
    })
  })

  describe('setLoading', () => {
    it('应该正确设置加载状态', () => {
      const { setLoading } = useAppStore.getState()
      
      setLoading(true)
      expect(useAppStore.getState().isLoading).toBe(true)
      
      setLoading(false)
      expect(useAppStore.getState().isLoading).toBe(false)
    })
  })

  describe('setError', () => {
    it('应该正确设置错误信息', () => {
      const { setError } = useAppStore.getState()
      
      setError('测试错误')
      expect(useAppStore.getState().error).toBe('测试错误')
      
      setError(null)
      expect(useAppStore.getState().error).toBeNull()
    })
  })

  describe('resetToHub', () => {
    it('应该重置到大厅状态', () => {
      const { startExploration, selectPattern, selectBlessing, resetToHub } = useAppStore.getState()
      
      startExploration('sky')
      selectPattern('crane')
      selectBlessing('madaochenggong')
      
      resetToHub()
      
      const state = useAppStore.getState()
      expect(state.currentPhase).toBe('hub')
      expect(state.selectedRoute).toBeNull()
      expect(state.selectedPattern).toBeNull()
      expect(state.selectedBlessing).toBeNull()
    })
  })

  describe('resetAll', () => {
    it('应该重置所有状态', () => {
      const { startExploration, finishExploration, unlockPattern, selectPattern, selectBlessing, setLoading, setError, resetAll } = useAppStore.getState()
      
      startExploration('sky')
      finishExploration()
      unlockPattern('crane')
      selectPattern('crane')
      selectBlessing('madaochenggong')
      setLoading(true)
      setError('测试错误')
      
      resetAll()
      
      const state = useAppStore.getState()
      expect(state.currentPhase).toBe('intro')
      expect(state.selectedRoute).toBeNull()
      expect(state.exploredRoutes).toEqual([])
      expect(state.unlockedPatterns).toEqual([])
      expect(state.selectedPattern).toBeNull()
      expect(state.selectedBlessing).toBeNull()
      expect(state.isLoading).toBe(false)
      expect(state.error).toBeNull()
    })
  })
})

