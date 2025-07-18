<script setup lang="ts">
import type { QuestionStatus } from "~/types/question";

const route = useRoute();
const status = computed<QuestionStatus>(() => {
  return getQuerystring<QuestionStatus>(route.query.status) ?? "newest";
});

const { data, error } = await useQuestionByStatus(status);

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <PostsHeader title="Newest questions" :counter="data?.length" />
  <PostCard v-for="question in data" :key="question.id" :question="question" />
</template>
