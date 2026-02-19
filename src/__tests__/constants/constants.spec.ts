import { describe, it, expect } from 'vitest'
import { RACE_CONFIG, ROUND_DISTANCES, RACE_STATUS, ANIMATION_CONFIG } from '@/constants/race.constants'

describe('Race Constants', () => {
  describe('RACE_CONFIG', () => {
    it('has correct total horses', () => {
      expect(RACE_CONFIG.TOTAL_HORSES).toBe(20)
    })

    it('has correct horses per round', () => {
      expect(RACE_CONFIG.HORSES_PER_ROUND).toBe(10)
    })

    it('has correct total rounds', () => {
      expect(RACE_CONFIG.TOTAL_ROUNDS).toBe(6)
    })

    it('has valid race duration', () => {
      expect(RACE_CONFIG.RACE_DURATION_MS).toBeGreaterThan(0)
    })

    it('has valid condition range', () => {
      expect(RACE_CONFIG.MIN_CONDITION).toBe(1)
      expect(RACE_CONFIG.MAX_CONDITION).toBe(100)
      expect(RACE_CONFIG.MIN_CONDITION).toBeLessThan(RACE_CONFIG.MAX_CONDITION)
    })
  })

  describe('ROUND_DISTANCES', () => {
    it('has 6 distances', () => {
      expect(ROUND_DISTANCES).toHaveLength(6)
    })

    it('has correct distance values', () => {
      expect(ROUND_DISTANCES).toEqual([1200, 1400, 1600, 1800, 2000, 2200])
    })

    it('distances are in ascending order', () => {
      for (let i = 0; i < ROUND_DISTANCES.length - 1; i++) {
        expect(ROUND_DISTANCES[i]!).toBeLessThan(ROUND_DISTANCES[i + 1]!)
      }
    })
  })

  describe('RACE_STATUS', () => {
    it('has all required statuses', () => {
      expect(RACE_STATUS.IDLE).toBe('idle')
      expect(RACE_STATUS.GENERATED).toBe('generated')
      expect(RACE_STATUS.RUNNING).toBe('running')
      expect(RACE_STATUS.BETWEEN_ROUNDS).toBe('between_rounds')
      expect(RACE_STATUS.FINISHED).toBe('finished')
    })

    it('has unique status values', () => {
      const statuses = Object.values(RACE_STATUS)
      const uniqueStatuses = new Set(statuses)
      expect(uniqueStatuses.size).toBe(statuses.length)
    })
  })

  describe('ANIMATION_CONFIG', () => {
    it('has valid frame duration', () => {
      expect(ANIMATION_CONFIG.FRAME_DURATION_MS).toBeGreaterThan(0)
    })

    it('has valid track completion percentage', () => {
      expect(ANIMATION_CONFIG.TRACK_COMPLETION_PERCENTAGE).toBeGreaterThan(0)
      expect(ANIMATION_CONFIG.TRACK_COMPLETION_PERCENTAGE).toBeLessThanOrEqual(1)
    })

    it('has valid speed factor range', () => {
      expect(ANIMATION_CONFIG.MIN_SPEED_FACTOR).toBeGreaterThan(0)
      expect(ANIMATION_CONFIG.MAX_SPEED_FACTOR).toBeGreaterThan(ANIMATION_CONFIG.MIN_SPEED_FACTOR)
    })
  })
})
