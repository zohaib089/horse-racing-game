<template>
    <BaseCard elevated>
        <template #header>Race Schedule</template>
        <EmptyState 
            v-if="schedule.length === 0" 
            message="Generate schedule to see rounds"
            icon="📝"
        />
        <div v-else class="rounds">
            <div 
                v-for="round in schedule" 
                :key="round.id" 
                class="round"
                :class="{ active: currentRoundIndex + 1 === round.id, completed: currentRoundIndex + 1 > round.id }"
            >
                <div class="round-header">
                    <span class="round-number">🏁 Round {{ round.id }}</span>
                    <span class="round-distance">{{ round.distance }}m</span>
                </div>
                <div class="round-horses">
                    {{ round.horses.length }} horses racing
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script lang="ts" setup>
import BaseCard from '@/components/common/BaseCard.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useRaceController } from '@/controllers/useRaceController';

const { schedule, currentRoundIndex } = useRaceController()
</script>

<style scoped>
.rounds {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.round {
    padding: 12px;
    border-radius: 6px;
    background: #f8fafc;
    border: 2px solid #e2e8f0;
    transition: all 0.3s ease;
}

.round.active {
    background: #dbeafe;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    animation: pulse 2s ease-in-out infinite;
}

.round.completed {
    background: #dcfce7;
    border-color: #10b981;
    opacity: 0.8;
}

@keyframes pulse {
    0%, 100% {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    50% {
        box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.2);
    }
}

.round-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
}

.round-number {
    font-weight: 600;
    color: #1e293b;
    font-size: 14px;
}

.round-distance {
    font-weight: 700;
    color: #3b82f6;
    font-size: 14px;
}

.round-horses {
    font-size: 11px;
    color: #64748b;
}
</style>