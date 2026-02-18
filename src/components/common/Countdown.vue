<template>
  <div v-if="show" class="countdown-overlay">
    <div class="countdown-content">
      <div v-if="count > 0" class="countdown-number">{{ count }}</div>
      <div v-else class="countdown-go">GO!</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{
  show: boolean
}>()
const emit = defineEmits<{
  complete: []
}>()
const count = ref(3)
let interval: number | null = null
watch(() => props.show, (newShow) => {
  if (newShow) {
    count.value = 3
    if (interval) clearInterval(interval)
    
    interval = window.setInterval(() => {
      count.value--
      if (count.value < 0) {
        if (interval) clearInterval(interval)
        setTimeout(() => {
          emit('complete')
        }, 500)
      }
    }, 1000)
  }
})
</script>
<style scoped>
.countdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.countdown-content {
  text-align: center;
}
.countdown-number {
  font-size: 120px;
  font-weight: bold;
  color: white;
  animation: pulse 1s ease;
}
.countdown-go {
  font-size: 80px;
  font-weight: bold;
  color: #10b981;
  animation: scaleUp 0.5s ease;
}
@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes scaleUp {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
