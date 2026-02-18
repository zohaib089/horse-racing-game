<template>
  <div class="empty-state">
    <div v-if="icon" class="empty-state-icon">{{ icon }}</div>
    <div class="empty-state-message">{{ message }}</div>
    <div v-if="$slots.action" class="empty-state-action">
      <slot name="action" />
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  message: string
  icon?: string
}
defineProps<Props>()
</script>
<style scoped>
.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
}
.empty-state-icon {
  font-size: 48px;
  margin-bottom: 16px;
}
.empty-state-message {
  font-size: 16px;
  margin-bottom: 16px;
}
.empty-state-action {
  margin-top: 20px;
}
</style>
