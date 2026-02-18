import type { RaceState } from "@/models/Race";

export const getters = {
    currentRound:(state: RaceState)=>
        state.schedule[state.currentRoundIndex],
    isRaceFinished:(state: RaceState)=>
        state.currentRoundIndex >= state.schedule.length
}