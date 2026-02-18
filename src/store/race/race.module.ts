import { getters } from './race.getters'
import { mutations } from './race.mutations'
import { state } from './race.state'

export const raceModule = {
    namespaced: true,
    state,
    mutations,
    getters
}