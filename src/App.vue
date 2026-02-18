<template>
  <GameView />
</template>

<script setup lang="ts">
import GameView from '@/views/GameView.vue';
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background: #f1f5f9;
}

#app {
  min-height: 100vh;
}
</style>