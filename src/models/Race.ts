import type { Horse } from "./Horse"
import type { Round } from "./Round"


export type RaceStatus = 'idle' | 'generated' | 'running' | 'finished'

export interface RaceState {
   horses: Horse[]
   schedule: Round[]
   results: Record<number, Horse[]>
   currentRoundIndex: number
   raceStatus: RaceStatus
}