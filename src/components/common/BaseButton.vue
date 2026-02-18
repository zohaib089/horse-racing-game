<template>
  <button
    :class="['btn', `btn-${variant}`, { 'btn-disabled': disabled }]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  disabled?: boolean
}
withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
})
const emit = defineEmits<{
  click: []
}>()
const handleClick = () => {
  emit('click')
}
</script>
<style scoped>
.btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-primary {
  background: #3b82f6;
  color: white;
}
.btn-primary:hover:not(.btn-disabled) {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}
.btn-secondary {
  background: #8b5cf6;
  color: white;
}
.btn-secondary:hover:not(.btn-disabled) {
  background: #7c3aed;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.3);
}
.btn-success {
  background: #10b981;
  color: white;
}
.btn-success:hover:not(.btn-disabled) {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
}
.btn-danger {
  background: #ef4444;
  color: white;
}
.btn-danger:hover:not(.btn-disabled) {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(239, 68, 68, 0.3);
}
</style>
