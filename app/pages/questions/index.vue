<script setup lang="ts">
import type { QuestionStatus } from "~/types/question";
import type { Tab } from "../../components/TabFilterItem.vue";

const route = useRoute();
const status = computed<QuestionStatus>(() => {
  return getQuerystring<QuestionStatus>(route.query.status) ?? "newest";
});

const tabs: Tab[] = [
  { label: "Newest", to: "/questions?status=newest" },
  { label: "Active", to: "/questions?status=active" },
  { label: "Unanswered", to: "/questions?status=unanswered" },
];

const activeTab = computed<Tab>(() => {
  const fallback = tabs[0] as Tab;
  return tabs.find((tab) => tab.to === route.fullPath) ?? fallback;
});

const { data: questions, error } = await useQuestionByStatus(status);

if (error.value) {
  throw createError(error.value);
}

const title = computed<string>(() => {
  const [first, ...all] = status.value;
  return `${first?.toUpperCase()}${all.join("")} questions`;
});
</script>

<template>
  <div class="p-4 md:pl-8">
    <PostsHeader :title />
    <div class="mt-8 flex justify-between">
      <p>{{ questions?.length ?? 0 }} questions</p>
      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>

  <PostCard
    v-for="question in questions"
    :key="question.id"
    :question="question"
  />
</template>
