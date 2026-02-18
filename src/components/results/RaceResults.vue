<template>
    <BaseCard elevated>
        <template #header>Race Results 🏆</template>
        <EmptyState 
            v-if="Object.keys(results).length === 0" 
            message="Results will appear after each race"
            icon="⏳"
        />
        <div v-else class="results-container">
            <div v-for="(standings, roundId) in results" :key="roundId" class="result-round">
                <div class="round-title">
                    <span class="round-badge">Round {{ roundId }}</span>
                    <span class="round-distance">{{ getRoundDistance(Number(roundId)) }}m</span>
                </div>
                <div class="podium">
                    <div 
                        v-for="(horse, index) in standings.slice(0, 3)" 
                        :key="horse.id" 
                        class="podium-item"
                        :class="`position-${Number(index) + 1}`"
                    >
                        <div class="medal">{{ getMedal(index) }}</div>
                        <div class="horse-color" :style="{ backgroundColor: horse.color }"></div>
                        <div class="horse-details">
                            <div class="horse-name">{{ horse.name }}</div>
                            <div class="horse-stats">Condition: {{ horse.condition }}</div>
                        </div>
                    </div>
                </div>
                <details class="full-results">
                    <summary>View all {{ standings.length }} results</summary>
                    <div class="all-standings">
                        <div 
                            v-for="(horse, index) in standings" 
                            :key="horse.id" 
                            class="standing-row"
                        >
                            <span class="position">{{ Number(index) + 1 }}</span>
                            <div class="horse-color-small" :style="{ backgroundColor: horse.color }"></div>
                            <span class="horse-name-small">{{ horse.name }}</span>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    </BaseCard>
</template>

<script lang="ts" setup>
import BaseCard from '@/components/common/BaseCard.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useRaceController } from '@/controllers/useRaceController'

const { results, schedule } = useRaceController()

const getMedal = (index: number | string): string => {
    const medals = ['🥇', '🥈', '🥉']
    return medals[Number(index)] || ''
}

const getRoundDistance = (roundId: number): number => {
    const round = schedule.value.find((r: { id: number }) => r.id === roundId)
    return round?.distance || 0
}
</script>

<style scoped>
.results-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 600px;
    overflow-y: auto;
}

.result-round {
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    padding: 12px;
    background: #f8fafc;
}

.round-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.round-badge {
    background: #3b82f6;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 12px;
}

.round-distance {
    color: #64748b;
    font-size: 12px;
    font-weight: 600;
}

.podium {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 12px;
}

.podium-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px;
    border-radius: 6px;
    background: white;
    border: 2px solid #e2e8f0;
    transition: all 0.2s ease;
}

.position-1 {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-color: #f59e0b;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
}

.position-2 {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
    border-color: #9ca3af;
}

.position-3 {
    background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%);
    border-color: #f97316;
}

.medal {
    font-size: 24px;
    width: 32px;
    text-align: center;
}

.horse-color {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    flex-shrink: 0;
}

.horse-details {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.horse-name {
    font-weight: 600;
    color: #1e293b;
    font-size: 13px;
}

.horse-stats {
    font-size: 10px;
    color: #64748b;
}

.full-results {
    margin-top: 8px;
}

.full-results summary {
    cursor: pointer;
    font-size: 11px;
    color: #3b82f6;
    font-weight: 600;
    padding: 6px;
    border-radius: 4px;
    transition: background 0.2s;
}

.full-results summary:hover {
    background: #f1f5f9;
}

.all-standings {
    margin-top: 8px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.standing-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    background: white;
    border-radius: 4px;
    font-size: 11px;
}

.position {
    width: 20px;
    text-align: center;
    font-weight: 600;
    color: #64748b;
}

.horse-color-small {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid white;
    box-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.horse-name-small {
    color: #1e293b;
    font-weight: 500;
}
</style>