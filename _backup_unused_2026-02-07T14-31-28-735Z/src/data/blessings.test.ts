import { describe, it, expect } from 'vitest'
import { 
  blessings, 
  getBlessingById, 
  getBlessingsByCategory 
} from './blessings'

describe('blessings 数据', () => {
  describe('祝福语数据结构', () => {
    it('应该包含正确数量的祝福语', () => {
      expect(blessings.length).toBe(8)
    })

    it('每个祝福语应该有完整的属性', () => {
      blessings.forEach(blessing => {
        expect(blessing.id).toBeDefined()
        expect(blessing.text).toBeDefined()
        expect(blessing.subtext).toBeDefined()
        expect(blessing.category).toBeDefined()
      })
    })

    it('每个祝福语的 category 应该是有效值', () => {
      const validCategories = ['fortune', 'career', 'family', 'health']
      blessings.forEach(blessing => {
        expect(validCategories).toContain(blessing.category)
      })
    })
  })

  describe('getBlessingById', () => {
    it('应该返回正确的祝福语', () => {
      const blessing = getBlessingById('madaochenggong')
      expect(blessing).toBeDefined()
      expect(blessing?.text).toBe('马到成功')
    })

    it('无效 ID 应该返回 undefined', () => {
      expect(getBlessingById('invalid')).toBeUndefined()
    })
  })

  describe('getBlessingsByCategory', () => {
    it('应该返回正确分类的祝福语', () => {
      const fortuneBlessings = getBlessingsByCategory('fortune')
      expect(fortuneBlessings.length).toBeGreaterThan(0)
      fortuneBlessings.forEach(b => {
        expect(b.category).toBe('fortune')
      })

      const careerBlessings = getBlessingsByCategory('career')
      expect(careerBlessings.length).toBeGreaterThan(0)
      careerBlessings.forEach(b => {
        expect(b.category).toBe('career')
      })
    })
  })
})

