<template>
  <div v-if="winners.length > 0" class="marquee-container">
    <div class="marquee-content">
      <span v-for="(winner, index) in winners" :key="index" class="winner-item">
        🏆 Round {{ winner.roundId }}: {{ winner.horse.name }} ({{ winner.horse.condition }}) 
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRaceController } from '@/controllers/useRaceController'
import type { Horse } from '@/models/Horse'
import { computed } from 'vue'

const { results } = useRaceController()

interface Winner {
  roundId: number
  horse: Horse
}

const winners = computed<Winner[]>(() => {
  const winnersList: Winner[] = []
  Object.entries(results.value).forEach(([roundId, standings]) => {
    if ((standings as Horse[]).length > 0) {
      winnersList.push({
        roundId: Number(roundId),
        horse: (standings as Horse[])[0]!
      })
    }
  })
  return winnersList
})
</script>

<style scoped>
.marquee-container {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  padding: 12px 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}

.marquee-content {
  display: flex;
  white-space: nowrap;
  animation: marquee 20s linear infinite;
}

.winner-item {
  display: inline-block;
  padding: 0 40px;
  font-weight: 600;
  color: #78350f;
  font-size: 16px;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.marquee-content::after {
  content: attr(data-content);
}
</style>
