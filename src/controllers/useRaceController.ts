import { RACE_CONFIG, RACE_STATUS, ROUND_DISTANCES } from '@/constants/race.constants'
import type { Round } from '@/models/Round'
import { RaceEngine } from '@/services/RaceEngine'
import { computed } from 'vue'
import { useStore } from 'vuex'

export const useRaceController = () => {
    const store = useStore()

    const horses = computed(() => store.state.race.horses)
    const schedule = computed(() => store.state.race.schedule)
    const currentRoundIndex = computed(() => store.state.race.currentRoundIndex)
    const raceStatus = computed(() => store.state.race.raceStatus)
    const results = computed(() => store.state.race.results)
    const currentRound = computed(() => store.getters['race/currentRound'])

    const canGenerateSchedule = computed(() => 
        horses.value.length === RACE_CONFIG.TOTAL_HORSES && 
        (raceStatus.value === RACE_STATUS.IDLE || raceStatus.value === RACE_STATUS.FINISHED)
    )

    const canStartRace = computed(() => 
        raceStatus.value === RACE_STATUS.GENERATED && 
        schedule.value.length === RACE_CONFIG.TOTAL_ROUNDS
    )

    const generateHorses = () => {
        if (raceStatus.value !== RACE_STATUS.IDLE) return
        const newHorses = RaceEngine.generateHorses()
        store.commit('race/setHorses', newHorses)
        store.commit('race/setStatus', RACE_STATUS.IDLE)
    }

    const generateSchedule = () => {
        if (!canGenerateSchedule.value) {
            console.warn('Cannot generate schedule: horses not ready or race running')
            return
        }
        
        // Reset round index when generating new schedule
        store.commit('race/resetRounds')
        
        const rounds: Round[] = ROUND_DISTANCES.map((distance, index) => {
            const selected = [...horses.value]
                .sort(() => 0.5 - Math.random())
                .slice(0, RACE_CONFIG.HORSES_PER_ROUND)
            return {
                id: index + 1,
                distance,
                horses: selected
            }
        })
        store.commit('race/setSchedule', rounds)
        store.commit('race/setStatus', RACE_STATUS.GENERATED)
    }

    const startRace = () => {
        if (!canStartRace.value) {
            console.warn('Cannot start race: schedule not ready')
            return
        }
        store.commit('race/setStatus', RACE_STATUS.RUNNING)
        runNextRound()
    }

    const runNextRound = () => {
        const round = schedule.value[currentRoundIndex.value]
        if (!round) {
            store.commit('race/setStatus', RACE_STATUS.FINISHED)
            return
        }

        const result = RaceEngine.calculateRoundResults(
            round.horses,
            round.distance
        )
        setTimeout(() => {
            store.commit('race/setResults', {
                roundId: round.id,
                standings: result
            })
            store.commit('race/advanceRound')
            runNextRound()
        }, RACE_CONFIG.RACE_DURATION_MS)
    }

    const resetRace = () => {
        store.commit('race/resetGame')
    }

    return {
        horses,
        schedule,
        currentRoundIndex,
        raceStatus,
        results,
        currentRound,
        canGenerateSchedule,
        canStartRace,
        generateHorses,
        generateSchedule,
        startRace,
        resetRace
    }
} 