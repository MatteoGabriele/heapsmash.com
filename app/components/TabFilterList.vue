<script setup lang="ts">
import type { Tab } from "./TabFilterItem.vue";

defineProps<{
  tabs: Tab[];
  activeTab: Tab;
}>();
</script>

<template>
  <div class="border border-neutral-700 rounded-lg p-1">
    <ul class="flex">
      <li v-for="tab in tabs" :key="tab.label">
        <TabFilterItem :is-active="activeTab.to === tab.to" :tab="tab" />
      </li>
    </ul>
  </div>
</template>
