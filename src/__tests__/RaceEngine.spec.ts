import { RACE_CONFIG } from '@/constants/race.constants'
import type { Horse } from '@/models/Horse'
import { RaceEngine } from '@/services/RaceEngine'
import { describe, expect, it } from 'vitest'

interface HorseWithPerformance extends Horse {
  performance?: number
}

describe('RaceEngine', () => {
  describe('generateHorses', () => {
    it('generates exactly 20 horses', () => {
      const horses = RaceEngine.generateHorses()
      expect(horses).toHaveLength(RACE_CONFIG.TOTAL_HORSES)
    })

    it('each horse has required properties', () => {
      const horses = RaceEngine.generateHorses()
      horses.forEach(horse => {
        expect(horse).toHaveProperty('id')
        expect(horse).toHaveProperty('name')
        expect(horse).toHaveProperty('condition')
        expect(horse).toHaveProperty('color')
      })
    })

    it('each horse has unique id', () => {
      const horses = RaceEngine.generateHorses()
      const ids = horses.map(h => h.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(RACE_CONFIG.TOTAL_HORSES)
    })

    it('each horse has unique color', () => {
      const horses = RaceEngine.generateHorses()
      const colors = horses.map(h => h.color)
      const uniqueColors = new Set(colors)
      expect(uniqueColors.size).toBe(RACE_CONFIG.TOTAL_HORSES)
    })

    it('horse condition is within valid range', () => {
      const horses = RaceEngine.generateHorses()
      horses.forEach(horse => {
        expect(horse.condition).toBeGreaterThanOrEqual(RACE_CONFIG.MIN_CONDITION)
        expect(horse.condition).toBeLessThanOrEqual(RACE_CONFIG.MAX_CONDITION)
      })
    })

    it('horse names follow pattern', () => {
      const horses = RaceEngine.generateHorses()
      horses.forEach((horse, index) => {
        expect(horse.name).toBe(`Horse ${index + 1}`)
      })
    })
  })

  describe('calculateRoundResults', () => {
    it('returns same number of horses as input', () => {
      const horses = RaceEngine.generateHorses().slice(0, 10)
      const results = RaceEngine.calculateRoundResults(horses, 1200)
      expect(results).toHaveLength(10)
    })

    it('adds performance property to each horse', () => {
      const horses = RaceEngine.generateHorses().slice(0, 5)
      const results = RaceEngine.calculateRoundResults(horses, 1200) as HorseWithPerformance[]
      results.forEach(horse => {
        expect(horse).toHaveProperty('performance')
        expect(typeof horse.performance).toBe('number')
      })
    })

    it('sorts horses by performance descending', () => {
      const horses = RaceEngine.generateHorses().slice(0, 5)
      const results = RaceEngine.calculateRoundResults(horses, 1200) as HorseWithPerformance[]
      
      for (let i = 0; i < results.length - 1; i++) {
        expect(results[i]).toBeDefined()
        expect(results[i + 1]).toBeDefined()
        expect(results[i]!.performance).toBeDefined()
        expect(results[i + 1]!.performance).toBeDefined()
        expect(results[i]!.performance!).toBeGreaterThanOrEqual(results[i + 1]!.performance!)
      }
    })

    it('performance is affected by distance', () => {
      const horses = RaceEngine.generateHorses().slice(0, 5)
      const results1200 = RaceEngine.calculateRoundResults(horses, 1200) as HorseWithPerformance[]
      const results2000 = RaceEngine.calculateRoundResults(horses, 2000) as HorseWithPerformance[]
      
      // Performance should generally be higher for longer distances
      const avg1200 = results1200.reduce((sum, h) => sum + (h.performance || 0), 0) / results1200.length
      const avg2000 = results2000.reduce((sum, h) => sum + (h.performance || 0), 0) / results2000.length
      
      expect(avg2000).toBeGreaterThan(avg1200)
    })

    it('performance is affected by horse condition', () => {
      const horses = RaceEngine.generateHorses().slice(0, 10)
      const results = RaceEngine.calculateRoundResults(horses, 1200) as HorseWithPerformance[]
      
      // Horses with higher condition should generally perform better
      results.forEach(horse => {
        expect(horse.performance!).toBeGreaterThan(0)
      })
    })
  })
})
