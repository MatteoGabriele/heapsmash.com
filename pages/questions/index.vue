<script setup lang="ts">
const { data, error } = await useQuestions();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <QuestionsHeader />
  <QuestionCard v-for="q in data" :key="q.id" v-bind="q" />
</template>
