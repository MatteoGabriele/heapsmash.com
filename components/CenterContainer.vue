<script setup lang="ts">
const { as = "div" } = defineProps<{
  as?: string;
}>();
</script>

<template>
  <Component :is="as" class="w-full max-w-7xl mx-auto">
    <slot />
  </Component>
</template>
