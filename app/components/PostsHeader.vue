<script setup lang="ts">
defineProps<{
  title: string;
  counter?: number;
}>();

const { tabs, activeTab } = useQuestionTabs();
</script>

<template>
  <div class="p-4 md:pl-8">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl">{{ title }}</h1>
      <NuxtLink
        class="text-sm text-neutral-300 rounded-lg px-3 py-2 bg-sky-700 hover:bg-sky-600"
        to="questions/ask"
      >
        Ask Question
      </NuxtLink>
    </header>
    <div class="mt-8 flex justify-between">
      <p v-if="counter">{{ counter }} questions</p>
      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>
</template>
