<script setup lang="ts">
import type { TabName } from "../../components/Question/TabFilters.vue";

const store = useStore();
const route = useRoute();

const { error, data: questions } = await store.questions.queryMany(() => ({
  filter: (question) => {
    const tab = route.query.tab as TabName;

    if (tab === "unanswered") {
      return !question.answers.length;
    } else if (tab === "active") {
      return question.views > 0;
    }

    return question;
  },
  sort: (question) => {
    return new Date(question.created_at).getTime();
  },
}));

if (error.value) {
  throw createError(error.value);
}

const title = computed<string>(() => {
  const tab = route.query.tab;

  if (!tab) {
    return "All questions";
  }

  const [first, ...all] = tab;
  return `${first?.toUpperCase()}${all.join("")} questions`;
});
</script>

<template>
  <QuestionsHeader :title :count="questions.length" />
  <QuestionCard
    v-for="question in questions"
    :key="question.id"
    :question-id="question.id"
  />
</template>
