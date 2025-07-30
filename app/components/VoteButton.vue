<script setup lang="ts">
import { cn } from "clsx-for-tailwind";
import type { VoteType } from "~/types/vote";

const { variant = "default", active } = defineProps<{
  variant?: "default" | "minimal";
  direction: VoteType;
  active?: boolean;
}>();

const classes = computed<string>(() => {
  return cn(
    "transition-colors duration-300 rounded-full flex items-center justify-center",
    {
      "text-white hover:bg-yellow-800 border border-black-600 text-2xl size-11":
        variant === "default",
      "text-black-500 hover:text-amber-500": variant === "minimal",
      "bg-yellow-950 text-amber-500 border-amber-500": active,
    }
  );
});
</script>

<template>
  <button :class="classes">
    <Icon v-if="direction === 'up'" name="ph:caret-up-fill" />
    <Icon v-else name="ph:caret-down-fill" />
  </button>
</template>
