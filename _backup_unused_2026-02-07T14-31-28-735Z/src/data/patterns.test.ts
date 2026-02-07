import { describe, it, expect } from 'vitest'
import { 
  skyPatterns, 
  earthPatterns, 
  waterPatterns, 
  allPatterns,
  getPatternsByRoute,
  getPatternById
} from './patterns'

describe('patterns 数据', () => {
  describe('纹样数据结构', () => {
    it('skyPatterns 应该包含正确的纹样', () => {
      expect(skyPatterns.length).toBe(3)
      expect(skyPatterns.map(p => p.id)).toEqual(['crane', 'phoenix', 'swallow'])
    })

    it('earthPatterns 应该包含正确的纹样', () => {
      expect(earthPatterns.length).toBe(3)
      expect(earthPatterns.map(p => p.id)).toEqual(['dragon', 'qilin', 'baize'])
    })

    it('waterPatterns 应该包含正确的纹样', () => {
      expect(waterPatterns.length).toBe(3)
      expect(waterPatterns.map(p => p.id)).toEqual(['wave', 'ruyi', 'flower'])
    })

    it('allPatterns 应该包含所有纹样', () => {
      expect(allPatterns.length).toBe(9)
    })
  })

  describe('纹样数据完整性', () => {
    it('每个纹样应该有完整的属性', () => {
      allPatterns.forEach(pattern => {
        expect(pattern.id).toBeDefined()
        expect(pattern.name).toBeDefined()
        expect(pattern.description).toBeDefined()
        expect(pattern.meaning).toBeDefined()
        expect(pattern.image).toBeDefined()
        expect(pattern.route).toBeDefined()
      })
    })

    it('每个纹样的 route 应该是有效值', () => {
      const validRoutes = ['sky', 'earth', 'water']
      allPatterns.forEach(pattern => {
        expect(validRoutes).toContain(pattern.route)
      })
    })
  })

  describe('getPatternsByRoute', () => {
    it('应该返回正确路线的纹样', () => {
      expect(getPatternsByRoute('sky')).toEqual(skyPatterns)
      expect(getPatternsByRoute('earth')).toEqual(earthPatterns)
      expect(getPatternsByRoute('water')).toEqual(waterPatterns)
    })

    it('无效路线应该返回空数组', () => {
      expect(getPatternsByRoute(null)).toEqual([])
    })
  })

  describe('getPatternById', () => {
    it('应该返回正确的纹样', () => {
      const crane = getPatternById('crane')
      expect(crane).toBeDefined()
      expect(crane?.name).toBe('仙鹤')

      const dragon = getPatternById('dragon')
      expect(dragon).toBeDefined()
      expect(dragon?.name).toBe('蟒龙')
    })

    it('无效 ID 应该返回 undefined', () => {
      expect(getPatternById('invalid')).toBeUndefined()
    })
  })
})

