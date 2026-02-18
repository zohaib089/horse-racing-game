<template>
  <div class="layout">
    <h1 class="title">🏇 Horse Racing Game</h1>

    <RaceControls @start-race="handleStartRace" />

    <WinnersMarquee />

    <div class="content">
      <div class="left">
        <HorseList />
      </div>

      <div class="center">
        <HorseTrack />
      </div>


    </div>

    <Countdown :show="showCountdown" @complete="onCountdownComplete" />
  </div>
</template>

<script setup lang="ts">
import Countdown from '@/components/common/Countdown.vue'
import WinnersMarquee from '@/components/common/WinnersMarquee.vue'
import RaceControls from '@/components/controls/RaceControls.vue'
import HorseList from '@/components/horses/HorsesList.vue'
import HorseTrack from '@/components/horses/HorsesTrack.vue'
import { useRaceController } from '@/controllers/useRaceController'
import { ref } from 'vue'

const { startRace } = useRaceController()
const showCountdown = ref(false)

const handleStartRace = () => {
  showCountdown.value = true
}

const onCountdownComplete = () => {
  showCountdown.value = false
  startRace()
}
</script>

<style scoped>
.layout {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%);
  min-height: 100vh;
}

.title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 36px;
  color: #0c4a6e;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.content {
  display: grid;
  grid-template-columns: 280px 1fr 320px;
  gap: 20px;
  align-items: start;
}

.left,
.right {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 1200px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
