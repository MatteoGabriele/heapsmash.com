<script setup lang="ts">
defineProps<{
  image?: string;
}>();
</script>

<template>
  <div
    class="bg-neutral-600 rounded-full overflow-hidden flex size-6 items-center justify-center"
  >
    <img v-if="image" :src="image" alt="user avatar" />
    <span v-else aria-label="user avatar">
      <Icon
        class="text-2xl text-neutral-300"
        name="mdi:account-circle-outline"
      />
    </span>
  </div>
</template>
