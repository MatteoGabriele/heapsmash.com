<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const { size = "sm", shape = "circle" } = defineProps<{
  image?: string | null;
  size?: "sm" | "md" | "lg";
  shape?: "square" | "circle";
}>();
</script>

<template>
  <div
    :class="
      cn('bg-black-700 overflow-hidden flex items-center justify-center', {
        'size-6': size === 'sm',
        'size-8': size === 'md',
        'size-10': size === 'lg',
        'rounded-full': shape === 'circle',
        'rounded-sm': shape === 'square',
      })
    "
  >
    <img v-if="image" :src="image" alt="user avatar" />
    <span v-else aria-label="user avatar">
      <Icon class="text-2xl text-black-300" name="mdi:account-circle-outline" />
    </span>
  </div>
</template>
