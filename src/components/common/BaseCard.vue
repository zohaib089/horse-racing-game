<template>
  <div :class="['card', { 'card-elevated': elevated }]">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div class="card-body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  elevated?: boolean
}
withDefaults(defineProps<Props>(), {
  elevated: false
})
</script>
<style scoped>
.card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.card-elevated {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e2e8f0;
  font-weight: 600;
  font-size: 18px;
  color: #1e293b;
}
.card-body {
  padding: 20px;
}
.card-footer {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
}
</style>
