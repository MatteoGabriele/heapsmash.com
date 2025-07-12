<script setup lang="ts">
const { data } = await useUserProfile();
const reputation = computed<number>(() => {
  return data.value?.reputation ?? 0;
});
</script>

<template>
  <div
    class="flex items-center gap-1"
    :title="`your reputation: ${reputation}`"
  >
    <span class="text-sm">{{ reputation }}</span>
    <Icon name="ph:medal-fill" class="text-xs text-neutral-400" />
  </div>
</template>
