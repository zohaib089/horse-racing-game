import { describe, it, expect, beforeEach } from 'vitest'
import { createStore } from 'vuex'
import { raceModule } from '@/store/race/race.module'
import { RaceEngine } from '@/services/RaceEngine'
import type { RootState } from '@/store'

describe('Race Store', () => {
  let store: any

  beforeEach(() => {
    store = createStore<RootState>({
      modules: {
        race: raceModule
      }
    })
  })

  describe('Initial State', () => {
    it('has empty horses array', () => {
      expect(store.state.race.horses).toEqual([])
    })

    it('has empty schedule array', () => {
      expect(store.state.race.schedule).toEqual([])
    })

    it('has empty results object', () => {
      expect(store.state.race.results).toEqual({})
    })

    it('has currentRoundIndex set to 0', () => {
      expect(store.state.race.currentRoundIndex).toBe(0)
    })

    it('has raceStatus set to idle', () => {
      expect(store.state.race.raceStatus).toBe('idle')
    })
  })

  describe('Mutations', () => {
    describe('setHorses', () => {
      it('sets horses in state', () => {
        const horses = RaceEngine.generateHorses()
        store.commit('race/setHorses', horses)
        expect(store.state.race.horses).toEqual(horses)
        expect(store.state.race.horses).toHaveLength(20)
      })
    })

    describe('setSchedule', () => {
      it('sets schedule in state', () => {
        const schedule = [
          { id: 1, distance: 1200, horses: [] },
          { id: 2, distance: 1400, horses: [] }
        ]
        store.commit('race/setSchedule', schedule)
        expect(store.state.race.schedule).toEqual(schedule)
      })
    })

    describe('setResults', () => {
      it('adds results for a round', () => {
        const horses = RaceEngine.generateHorses().slice(0, 3)
        store.commit('race/setResults', {
          roundId: 1,
          standings: horses
        })
        expect(store.state.race.results[1]).toEqual(horses)
      })

      it('can store multiple round results', () => {
        const horses1 = RaceEngine.generateHorses().slice(0, 3)
        const horses2 = RaceEngine.generateHorses().slice(3, 6)
        
        store.commit('race/setResults', { roundId: 1, standings: horses1 })
        store.commit('race/setResults', { roundId: 2, standings: horses2 })
        
        expect(store.state.race.results[1]).toEqual(horses1)
        expect(store.state.race.results[2]).toEqual(horses2)
      })
    })

    describe('setStatus', () => {
      it('updates race status', () => {
        store.commit('race/setStatus', 'generated')
        expect(store.state.race.raceStatus).toBe('generated')
      })

      it('can transition through all statuses', () => {
        store.commit('race/setStatus', 'idle')
        expect(store.state.race.raceStatus).toBe('idle')
        
        store.commit('race/setStatus', 'generated')
        expect(store.state.race.raceStatus).toBe('generated')
        
        store.commit('race/setStatus', 'running')
        expect(store.state.race.raceStatus).toBe('running')
        
        store.commit('race/setStatus', 'finished')
        expect(store.state.race.raceStatus).toBe('finished')
      })
    })

    describe('advanceRound', () => {
      it('increments currentRoundIndex', () => {
        expect(store.state.race.currentRoundIndex).toBe(0)
        store.commit('race/advanceRound')
        expect(store.state.race.currentRoundIndex).toBe(1)
        store.commit('race/advanceRound')
        expect(store.state.race.currentRoundIndex).toBe(2)
      })
    })

    describe('resetRounds', () => {
      it('resets round index and results', () => {
        store.commit('race/advanceRound')
        store.commit('race/advanceRound')
        store.commit('race/setResults', { roundId: 1, standings: [] })
        
        store.commit('race/resetRounds')
        
        expect(store.state.race.currentRoundIndex).toBe(0)
        expect(store.state.race.results).toEqual({})
      })
    })

    describe('resetGame', () => {
      it('resets all state to initial values', () => {
        const horses = RaceEngine.generateHorses()
        store.commit('race/setHorses', horses)
        store.commit('race/setSchedule', [{ id: 1, distance: 1200, horses: [] }])
        store.commit('race/setResults', { roundId: 1, standings: [] })
        store.commit('race/advanceRound')
        store.commit('race/setStatus', 'running')
        
        store.commit('race/resetGame')
        
        expect(store.state.race.horses).toEqual([])
        expect(store.state.race.schedule).toEqual([])
        expect(store.state.race.results).toEqual({})
        expect(store.state.race.currentRoundIndex).toBe(0)
        expect(store.state.race.raceStatus).toBe('idle')
      })
    })
  })

  describe('Getters', () => {
    describe('currentRound', () => {
      it('returns undefined when no schedule', () => {
        const currentRound = store.getters['race/currentRound']
        expect(currentRound).toBeUndefined()
      })

      it('returns first round initially', () => {
        const schedule = [
          { id: 1, distance: 1200, horses: [] },
          { id: 2, distance: 1400, horses: [] }
        ]
        store.commit('race/setSchedule', schedule)
        
        const currentRound = store.getters['race/currentRound']
        expect(currentRound).toEqual(schedule[0])
      })

      it('returns correct round after advancing', () => {
        const schedule = [
          { id: 1, distance: 1200, horses: [] },
          { id: 2, distance: 1400, horses: [] },
          { id: 3, distance: 1600, horses: [] }
        ]
        store.commit('race/setSchedule', schedule)
        store.commit('race/advanceRound')
        
        const currentRound = store.getters['race/currentRound']
        expect(currentRound).toEqual(schedule[1])
      })
    })

    describe('isRaceFinished', () => {
      it('returns false when no schedule', () => {
        expect(store.getters['race/isRaceFinished']).toBe(false)
      })

      it('returns false when rounds remaining', () => {
        const schedule = [
          { id: 1, distance: 1200, horses: [] },
          { id: 2, distance: 1400, horses: [] }
        ]
        store.commit('race/setSchedule', schedule)
        expect(store.getters['race/isRaceFinished']).toBe(false)
      })

      it('returns true when all rounds completed', () => {
        const schedule = [
          { id: 1, distance: 1200, horses: [] },
          { id: 2, distance: 1400, horses: [] }
        ]
        store.commit('race/setSchedule', schedule)
        store.commit('race/advanceRound')
        store.commit('race/advanceRound')
        
        expect(store.getters['race/isRaceFinished']).toBe(true)
      })
    })
  })
})
