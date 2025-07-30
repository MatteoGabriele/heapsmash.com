<script setup lang="ts">
defineProps<{
  tabs: PostTab[];
  activeTab: PostTab;
}>();
</script>

<template>
  <div class="border border-black-600 rounded-lg p-1">
    <ul class="flex">
      <li v-for="tab in tabs" :key="tab.label">
        <TabFilterItem :is-active="activeTab.to === tab.to" :tab="tab" />
      </li>
    </ul>
  </div>
</template>
