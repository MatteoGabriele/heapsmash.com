<script setup lang="ts">
defineProps<{
  tags: string[];
}>();
</script>

<template>
  <ul class="flex gap-2 flex-wrap">
    <li v-for="tag in tags" :key="tag">
      <NuxtLink
        class="text-xs bg-black-700 text-black-200 rounded-sm px-2 py-1 hover:bg-black-600"
        :to="`/questions/tags/${tag}`"
      >
        {{ tag }}
      </NuxtLink>
    </li>
  </ul>
</template>
