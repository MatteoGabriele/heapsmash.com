<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const { variant = "default", active } = defineProps<{
  variant?: "default" | "minimal";
  direction: "up" | "down";
  active?: boolean;
}>();

const classes = computed<string>(() => {
  return cn(
    "transition-colors duration-300 rounded-full flex items-center justify-center",
    {
      "text-white hover:bg-yellow-800 border border-neutral-700 text-2xl size-11":
        variant === "default",
      "text-neutral-500 hover:text-amber-500": variant === "minimal",
      "bg-yellow-950 text-amber-500 border-amber-500": active,
    },
  );
});
</script>

<template>
  <button :class="classes">
    <Icon v-if="direction === 'up'" name="ph:caret-up-fill" />
    <Icon v-else name="ph:caret-down-fill" />
  </button>
</template>
