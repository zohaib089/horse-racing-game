import type { RaceState } from '@/models/Race'

export const state: RaceState = {
    horses: [],
    schedule: [],
    results: {},
    currentRoundIndex: 0,
    raceStatus: 'idle'
}