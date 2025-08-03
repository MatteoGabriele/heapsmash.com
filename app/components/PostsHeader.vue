<script setup lang="ts">
defineProps<{
  title: string;
  counter?: number | undefined | null;
}>();

const { tabs, activeTab } = usePostTabs();
</script>

<template>
  <div class="@container">
    <header class="flex justify-between items-center">
      <h1 class="text-2xl first-letter:uppercase">{{ title }}</h1>
      <NuxtLink
        class="text-sm text-black-200 rounded-lg px-3 py-2 bg-sky-700 hover:bg-sky-600"
        to="questions/ask"
      >
        Ask Question
      </NuxtLink>
    </header>
    <div
      class="mt-8 inline-flex flex-col @md:flex @md:flex-row gap-4 justify-between"
    >
      <p v-if="counter">{{ counter }} questions</p>

      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>
</template>
