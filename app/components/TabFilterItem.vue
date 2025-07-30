<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const props = defineProps<{
  tab: PostTab;
  isActive: boolean;
}>();

const classes = computed<string>(() => {
  return cn("rounded-sm px-2 py-1 flex text-xs", {
    "bg-black-700": props.isActive,
    "hover:bg-black-900": !props.isActive,
  });
});
</script>

<template>
  <NuxtLink :class="classes" :to="tab.to">
    {{ tab.label }}
  </NuxtLink>
</template>
