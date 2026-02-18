<template>
    <div class="controls">
        <BaseButton 
            v-for="button in buttons"
            :key="button.label"
            :variant="button.variant" 
            :disabled="button.disabled" 
            @click="button.action"
        >
            {{ button.label }}
        </BaseButton>
    </div>
</template>

<script lang="ts" setup>
import BaseButton from '@/components/common/BaseButton.vue';
import { useRaceController } from '@/controllers/useRaceController';
import { computed } from 'vue';

const emit = defineEmits<{
  startRace: []
}>()

const {
    generateHorses,
    generateSchedule,
    resetRace,
    raceStatus,
    canGenerateSchedule,
    canStartRace
} = useRaceController()

const handleStartRace = () => {
    emit('startRace')
}

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

interface ButtonConfig {
    label: string;
    variant: ButtonVariant;
    disabled: boolean;
    action: () => void;
}

const buttons = computed<ButtonConfig[]>(() => [
    {
        label: 'Generate Horses',
        variant: 'primary',
        disabled: raceStatus.value !== 'idle',
        action: generateHorses
    },
    {
        label: 'Generate Schedule',
        variant: 'secondary',
        disabled: !canGenerateSchedule.value,
        action: generateSchedule
    },
    {
        label: 'Start Race',
        variant: 'success',
        disabled: !canStartRace.value,
        action: handleStartRace
    },
    {
        label: 'Reset',
        variant: 'danger',
        disabled: raceStatus.value === 'idle',
        action: resetRace
    }
])
</script>

<style scoped>
.controls {
    display: flex;
    gap: 10px;
    justify-content: center;
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
}
</style>
