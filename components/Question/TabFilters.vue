<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

type Tab = {
  label: string;
  name: string;
  isActive?: boolean;
};

const tabs: Tab[] = [
  { label: "Newest", name: "newest" },
  { label: "Active", name: "active" },
  { label: "Unanswered", name: "unanswered" },
];

const route = useRoute();
const displayTabs = computed<Tab[]>(() => {
  return tabs.map((tab) => {
    const queryValue: string | null = Array.isArray(route.query.tab)
      ? route.query.tab[0]
      : route.query.tab;

    const tabName: string = queryValue || "newest";

    return {
      isActive: tabName === tab.name,
      ...tab,
    };
  });
});
</script>

<template>
  <div class="border border-neutral-700 rounded-lg p-1">
    <ul class="flex">
      <li v-for="tab in displayTabs" :key="tab.name">
        <NuxtLink
          :class="
            cn('rounded-sm px-2 py-1 flex text-xs', {
              'bg-neutral-700': tab.isActive,
              'hover:bg-neutral-800': !tab.isActive,
            })
          "
          :to="`/questions?tab=${tab.name}`"
        >
          {{ tab.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
