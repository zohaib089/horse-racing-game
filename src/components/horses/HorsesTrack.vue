<template>
  <div class="track-container">
    <h2 class="track-title">Race Track</h2>
    <EmptyState 
      v-if="!currentRound" 
      message="Generate schedule and start race to see horses compete!"
      icon="🏇"
    />
    <div v-else class="track" ref="trackRef">
      <div class="finish-line"></div>
      <div
        v-for="(horse, index) in currentRound.horses"
        :key="horse.id"
        class="lane"
      >
        <div
          class="horse"
          :style="{
            backgroundColor: horse.color,
            left: `${horseProgress[horse.id] || 0}px`,
            transition: `left ${ANIMATION_CONFIG.FRAME_DURATION_MS}ms linear`
          }"
        >
          <span class="horse-icon">🐴</span>
        </div>
        <div class="lane-number">{{ Number(index) + 1 }}</div>
      </div>
    </div>
    <div v-if="raceStatus === 'running'" class="race-info">
      <div class="round-info">
        Round {{ Number(currentRoundIndex) + 1 }} / {{ schedule.length }} - {{ currentRound?.distance }}m
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EmptyState from '@/components/common/EmptyState.vue'
import { ANIMATION_CONFIG, RACE_CONFIG } from '@/constants/race.constants'
import { useRaceController } from '@/controllers/useRaceController'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const { currentRound, raceStatus, currentRoundIndex, schedule } = useRaceController()

const trackRef = ref<HTMLElement | null>(null)
const horseProgress = ref<Record<number, number>>({})
const horseSpeed = ref<Record<number, number>>({})
let animationFrameId: number | null = null
let startTime: number | null = null
let trackWidth = 0

onMounted(() => {
  if (trackRef.value) {
    trackWidth = trackRef.value.offsetWidth - 80
  }
})

const animate = (timestamp: number) => {
  if (!startTime) startTime = timestamp
  const elapsed = timestamp - startTime
  const baseProgress = Math.min(elapsed / RACE_CONFIG.RACE_DURATION_MS, 1)

  if (currentRound.value && trackWidth > 0) {
    currentRound.value.horses.forEach((horse: { id: number }) => {
      const speed = horseSpeed.value[horse.id] || 1
      const maxDistance = trackWidth * ANIMATION_CONFIG.TRACK_COMPLETION_PERCENTAGE
      horseProgress.value[horse.id] = baseProgress * speed * maxDistance
    })
  }

  if (baseProgress < 1 && raceStatus.value === 'running') {
    animationFrameId = requestAnimationFrame(animate)
  }
}

const startRace = () => {
  if (trackRef.value) {
    trackWidth = trackRef.value.offsetWidth - 80
  }
  
  startTime = null
  horseProgress.value = {}
  horseSpeed.value = {}
  
  if (currentRound.value) {
    currentRound.value.horses.forEach((horse: { id: number }) => {
      horseSpeed.value[horse.id] = 
        ANIMATION_CONFIG.MIN_SPEED_FACTOR + 
        Math.random() * (ANIMATION_CONFIG.MAX_SPEED_FACTOR - ANIMATION_CONFIG.MIN_SPEED_FACTOR)
    })
  }
  
  animationFrameId = requestAnimationFrame(animate)
}

watch(raceStatus, (newStatus) => {
  if (newStatus === 'running' && currentRound.value) {
    startRace()
  } else if (newStatus !== 'running' && animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

watch(currentRoundIndex, () => {
  if (raceStatus.value === 'running') {
    startRace()
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.track-container {
  background: linear-gradient(to bottom, #e0f2fe 0%, #bae6fd 100%);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.track-title {
  text-align: center;
  color: #0c4a6e;
  margin-bottom: 20px;
  font-size: 24px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 18px;
}

.track {
  position: relative;
  background: linear-gradient(to right, #86efac 0%, #86efac 95%, #fbbf24 95%, #fbbf24 100%);
  padding: 20px;
  border-radius: 8px;
  min-height: 400px;
}

.finish-line {
  position: absolute;
  right: 5%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    0deg,
    #000,
    #000 10px,
    #fff 10px,
    #fff 20px
  );
  z-index: 1;
}

.lane {
  position: relative;
  height: 50px;
  margin: 8px 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  overflow: visible;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.horse {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  z-index: 2;
}

.horse-icon {
  font-size: 24px;
}

.lane-number {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background: #0c4a6e;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 12px;
}

.race-info {
  margin-top: 20px;
  text-align: center;
}

.round-info {
  background: #0c4a6e;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  display: inline-block;
}
</style>
