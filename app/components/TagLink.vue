<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <NuxtLink
    :to="`/questions/tagged/${name}`"
    class="text-xs bg-black-700 text-black-200 rounded-sm px-2 py-1 hover:bg-black-600"
  >
    {{ name }}
  </NuxtLink>
</template>
