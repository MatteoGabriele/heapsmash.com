<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const props = defineProps<{
  tab: QuestionTab;
  isActive: boolean;
}>();

const classes = computed<string>(() => {
  return cn("rounded-sm px-2 py-1 flex text-xs", {
    "bg-neutral-700": props.isActive,
    "hover:bg-neutral-800": !props.isActive,
  });
});
</script>

<template>
  <NuxtLink :class="classes" :to="tab.to">
    {{ tab.label }}
  </NuxtLink>
</template>
