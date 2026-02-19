import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useRaceController } from '@/controllers/useRaceController'
import { RACE_CONFIG } from '@/constants/race.constants'
import { createTestStore } from '../helpers/testStore'

// Mock Vuex useStore
vi.mock('vuex', async () => {
  const actual = await vi.importActual('vuex')
  return {
    ...actual,
    useStore: () => store
  }
})

let store: any

describe('useRaceController', () => {
  beforeEach(() => {
    store = createTestStore()
  })

  describe('Computed Properties', () => {
    it('exposes horses from store', () => {
      const { horses } = useRaceController()
      expect(horses.value).toEqual([])
    })

    it('exposes schedule from store', () => {
      const { schedule } = useRaceController()
      expect(schedule.value).toEqual([])
    })

    it('exposes currentRoundIndex from store', () => {
      const { currentRoundIndex } = useRaceController()
      expect(currentRoundIndex.value).toBe(0)
    })

    it('exposes raceStatus from store', () => {
      const { raceStatus } = useRaceController()
      expect(raceStatus.value).toBe('idle')
    })

    it('exposes results from store', () => {
      const { results } = useRaceController()
      expect(results.value).toEqual({})
    })

    it('exposes currentRound getter', () => {
      const { currentRound } = useRaceController()
      expect(currentRound.value).toBeUndefined()
    })
  })

  describe('canGenerateSchedule', () => {
    it('returns false when no horses', () => {
      const { canGenerateSchedule } = useRaceController()
      expect(canGenerateSchedule.value).toBe(false)
    })

    it('returns true when horses generated and status is idle', () => {
      const { generateHorses, canGenerateSchedule } = useRaceController()
      generateHorses()
      expect(canGenerateSchedule.value).toBe(true)
    })

    it('returns false when race is running', () => {
      const { generateHorses, canGenerateSchedule } = useRaceController()
      generateHorses()
      store.commit('race/setStatus', 'running')
      expect(canGenerateSchedule.value).toBe(false)
    })

    it('returns true when race is finished', () => {
      const { generateHorses, canGenerateSchedule } = useRaceController()
      generateHorses()
      store.commit('race/setStatus', 'finished')
      expect(canGenerateSchedule.value).toBe(true)
    })
  })

  describe('canStartRace', () => {
    it('returns false initially', () => {
      const { canStartRace } = useRaceController()
      expect(canStartRace.value).toBe(false)
    })

    it('returns true when schedule generated', () => {
      const { generateHorses, generateSchedule, canStartRace } = useRaceController()
      generateHorses()
      generateSchedule()
      expect(canStartRace.value).toBe(true)
    })

    it('returns false when status is not generated', () => {
      const { generateHorses, generateSchedule, canStartRace } = useRaceController()
      generateHorses()
      generateSchedule()
      store.commit('race/setStatus', 'running')
      expect(canStartRace.value).toBe(false)
    })
  })

  describe('generateHorses', () => {
    it('generates 20 horses', () => {
      const { generateHorses, horses } = useRaceController()
      generateHorses()
      expect(horses.value).toHaveLength(RACE_CONFIG.TOTAL_HORSES)
    })

    it('sets status to idle after generation', () => {
      const { generateHorses, raceStatus } = useRaceController()
      generateHorses()
      expect(raceStatus.value).toBe('idle')
    })
  })

  describe('generateSchedule', () => {
    it('generates 6 rounds', () => {
      const { generateHorses, generateSchedule, schedule } = useRaceController()
      generateHorses()
      generateSchedule()
      expect(schedule.value).toHaveLength(RACE_CONFIG.TOTAL_ROUNDS)
    })

    it('each round has 10 horses', () => {
      const { generateHorses, generateSchedule, schedule } = useRaceController()
      generateHorses()
      generateSchedule()
      schedule.value.forEach((round: { horses: any[] }) => {
        expect(round.horses).toHaveLength(RACE_CONFIG.HORSES_PER_ROUND)
      })
    })

    it('sets correct distances', () => {
      const { generateHorses, generateSchedule, schedule } = useRaceController()
      generateHorses()
      generateSchedule()
      const distances = [1200, 1400, 1600, 1800, 2000, 2200]
      schedule.value.forEach((round: { distance: number }, index: number) => {
        expect(round.distance).toBe(distances[index])
      })
    })

    it('sets status to generated', () => {
      const { generateHorses, generateSchedule, raceStatus } = useRaceController()
      generateHorses()
      generateSchedule()
      expect(raceStatus.value).toBe('generated')
    })

    it('resets round index when generating new schedule', () => {
      const { generateHorses, generateSchedule, currentRoundIndex } = useRaceController()
      generateHorses()
      generateSchedule()
      store.commit('race/advanceRound')
      expect(currentRoundIndex.value).toBe(1)
      
      store.commit('race/setStatus', 'finished')
      generateSchedule()
      expect(currentRoundIndex.value).toBe(0)
    })
  })

  describe('resetRace', () => {
    it('resets all state', () => {
      const { generateHorses, generateSchedule, resetRace, horses, schedule, raceStatus } = useRaceController()
      generateHorses()
      generateSchedule()
      
      resetRace()
      
      expect(horses.value).toEqual([])
      expect(schedule.value).toEqual([])
      expect(raceStatus.value).toBe('idle')
    })
  })

  describe('Round Transitions', () => {
    it('supports between_rounds status', () => {
      store.commit('race/setStatus', 'between_rounds')
      const { raceStatus } = useRaceController()
      expect(raceStatus.value).toBe('between_rounds')
    })

    it('transitions from running to between_rounds', () => {
      const { raceStatus } = useRaceController()
      store.commit('race/setStatus', 'running')
      expect(raceStatus.value).toBe('running')
      
      store.commit('race/setStatus', 'between_rounds')
      expect(raceStatus.value).toBe('between_rounds')
    })

    it('transitions from between_rounds to running', () => {
      const { raceStatus } = useRaceController()
      store.commit('race/setStatus', 'between_rounds')
      expect(raceStatus.value).toBe('between_rounds')
      
      store.commit('race/setStatus', 'running')
      expect(raceStatus.value).toBe('running')
    })
  })
})
