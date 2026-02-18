import type { Horse } from "@/models/Horse";
import type { RaceState, RaceStatus } from "@/models/Race";
import type { Round } from "@/models/Round";

export const mutations = {
    setHorses(state: RaceState, horses: Horse[]) {
        state.horses = horses;
    },
    setSchedule(state: RaceState, schedule: Round[]) {
        state.schedule = schedule;
    },
    setResults(state: RaceState, payload: {
        roundId: number,
        standings: Horse[]
    }) {
        state.results[payload.roundId] = payload.standings;
    },
    setStatus(state: RaceState, status: RaceStatus) {
        state.raceStatus = status;
    },
    advanceRound(state: RaceState) {
        state.currentRoundIndex++;
    },
    resetRounds(state: RaceState) {
        state.currentRoundIndex = 0;
        state.results = {};
    },
    resetGame(state: RaceState) {
        state.horses = [];
        state.schedule = [];
        state.results = {};
        state.currentRoundIndex = 0;
        state.raceStatus = 'idle';
    }
}