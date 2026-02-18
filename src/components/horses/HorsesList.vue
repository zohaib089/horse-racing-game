<template>
    <BaseCard elevated>
        <template #header>All Horses ({{ horses.length }})</template>
        <EmptyState 
            v-if="horses.length === 0" 
            message="Generate horses to start"
            icon="🐴"
        />
        <div v-else class="horses-grid">
            <div v-for="horse in horses" :key="horse.id" class="horse-card">
                <div class="horse-color" :style="{ backgroundColor: horse.color }"></div>
                <div class="horse-info">
                    <span class="horse-name">{{ horse.name }}</span>
                    <span class="horse-condition">{{ horse.condition }}</span>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script lang="ts" setup>
import BaseCard from '@/components/common/BaseCard.vue';
import EmptyState from '@/components/common/EmptyState.vue';
import { useRaceController } from '@/controllers/useRaceController';

const { horses } = useRaceController()
</script>

<style scoped>
.horses-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    max-height: 500px;
    overflow-y: auto;
}

.horse-card {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 6px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    transition: all 0.2s ease;
}

.horse-card:hover {
    background: #f1f5f9;
    transform: scale(1.02);
}

.horse-color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    flex-shrink: 0;
}

.horse-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
}

.horse-name {
    font-weight: 600;
    color: #1e293b;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.horse-condition {
    font-size: 10px;
    color: #64748b;
}
</style>