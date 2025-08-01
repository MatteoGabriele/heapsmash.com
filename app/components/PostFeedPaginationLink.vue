<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

defineProps<{
  isActive?: boolean;
}>();
</script>

<template>
  <NuxtLink
    :class="
      cn(
        'text-sm px-3 py-2 rounded-md border border-black-800 hover:bg-black-900',
        {
          'bg-black-500 hover:bg-black-400': isActive,
        }
      )
    "
  >
    <slot />
  </NuxtLink>
</template>
