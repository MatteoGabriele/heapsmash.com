<script setup lang="ts">
import type { Tab } from "../components/TabFilterItem.vue";

const { data, error } = await useQuestionsFeed();

if (error.value) {
  throw createError(error.value);
}

const tabs: Tab[] = [
  { label: "Newest", to: "/questions?status=newest" },
  { label: "Active", to: "/questions?status=active" },
  { label: "Unanswered", to: "/questions?status=unanswered" },
];

const activeTab = tabs[0] as Tab;
</script>

<template>
  <div class="p-4 md:pl-8">
    <PostsHeader title="Newest Questions" />
    <div class="mt-8 flex justify-between">
      <p>{{ data?.length ?? 0 }} questions</p>
      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>

  <PostCard v-for="question in data" :key="question.id" :question="question" />
</template>
