<script setup lang="ts">
defineProps<{
  tags: string[];
}>();
</script>

<template>
  <ul class="flex gap-2 flex-wrap">
    <li v-for="tag in tags" :key="tag">
      <TagLink :name="tag" />
    </li>
  </ul>
</template>
