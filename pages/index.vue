<script setup lang="ts">
const store = useStore();
const { data: questions } = await store.questions.queryMany();
</script>

<template>
  <QuestionsHeader title="Newest Questions" :count="questions.length" />
  <QuestionCard
    v-for="question in questions"
    :key="question.id"
    :question-id="question.id"
  />
</template>
