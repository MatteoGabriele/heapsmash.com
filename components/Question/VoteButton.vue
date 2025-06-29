<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const props = defineProps<{
  direction: "up" | "down";
  active?: boolean;
}>();

const classes = computed<string>(() => {
  return cn(
    "transition-colors duration-300 border border-neutral-700 text-white hover:bg-yellow-800 text-2xl size-10 rounded-full flex items-center justify-center",
    {
      "bg-yellow-950 text-amber-500 border-amber-500": props.active,
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
