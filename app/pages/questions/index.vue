<script setup lang="ts">
import type { QuestionStatus } from "~/types/question";

const route = useRoute();

const status = computed<QuestionStatus>(() => {
  const tab = route.query.tab;

  if (!tab) {
    return "newest";
  }

  const value = Array.isArray(tab) ? tab[0] : tab;
  return value as QuestionStatus;
});

const { data: questions, error } = await useQuestionByStatus(status);

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
  <PostsHeader :title :count="questions?.length ?? 0" />
  <PostCard
    v-for="question in questions"
    :key="question.id"
    :question="question"
  />
</template>
