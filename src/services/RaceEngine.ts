import { RACE_CONFIG } from '@/constants/race.constants'
import type { Horse } from '@/models/Horse'

export class RaceEngine {  
    static generateHorses(): Horse[] {
        const colors = Array.from({ length: RACE_CONFIG.TOTAL_HORSES }, (_, i) => 
            `hsl(${i * 18}, 70%, 50%)`
        )
        return Array.from({ length: RACE_CONFIG.TOTAL_HORSES }, (_, i) => ({
            id: i + 1,
            name: `Horse ${i + 1}`,
            condition: Math.floor(
                Math.random() * (RACE_CONFIG.MAX_CONDITION - RACE_CONFIG.MIN_CONDITION + 1)
            ) + RACE_CONFIG.MIN_CONDITION,
            color: colors[i]!
        }))
    }

    static calculateRoundResults(horses: Horse[], distance: number): Horse[] {
        return horses
            .map(horse => ({
                ...horse,
                performance: horse.condition * Math.random() * distance
            }))
            .sort((a, b) => b.performance - a.performance)
    }
}