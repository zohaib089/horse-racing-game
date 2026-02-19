import { createStore } from 'vuex'
import { raceModule } from '@/store/race/race.module'
import type { RootState } from '@/store'

export const createTestStore = () => {
  return createStore<RootState>({
    modules: {
      race: {
        namespaced: true,
        state: () => ({
          horses: [],
          schedule: [],
          results: {},
          currentRoundIndex: 0,
          raceStatus: 'idle'
        }),
        mutations: raceModule.mutations,
        getters: raceModule.getters
      }
    }
  })
}
