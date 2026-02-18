<template>
  <div class="game-view">
    <GameLayout />
  </div>
</template>

<script setup lang="ts">
import GameLayout from '@/components/layout/GameLayout.vue';
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
