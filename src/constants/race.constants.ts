/** Race configuration constants*/
export const RACE_CONFIG = {
  TOTAL_HORSES: 20,
  HORSES_PER_ROUND: 10,
  TOTAL_ROUNDS: 6,
  RACE_DURATION_MS: 3000,
  MIN_CONDITION: 1,
  MAX_CONDITION: 100
} as const

/** Round distances in meters*/
export const ROUND_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200] as const

/** Race status types*/
export const RACE_STATUS = {
  IDLE: 'idle',
  GENERATED: 'generated',
  RUNNING: 'running',
  BETWEEN_ROUNDS: 'between_rounds',
  FINISHED: 'finished'
} as const

/**Animation configuration*/
export const ANIMATION_CONFIG = {
  FRAME_DURATION_MS: 50,
  TRACK_COMPLETION_PERCENTAGE: 0.92,
  MIN_SPEED_FACTOR: 0.95,
  MAX_SPEED_FACTOR: 1.05
} as const
