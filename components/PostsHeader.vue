<script setup lang="ts">
defineProps<{
  title: string;
  count: number;
}>();
</script>

<template>
  <header class="p-4 md:pl-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">{{ title }}</h1>
      <NuxtLink
        class="text-sm text-neutral-300 rounded-lg px-3 py-2 bg-sky-700 hover:bg-sky-600"
        to="questions/ask"
      >
        Ask Question
      </NuxtLink>
    </div>
    <div class="mt-8 flex justify-between">
      <p>{{ count }} questions</p>
      <PostTabFilters />
    </div>
  </header>
</template>
