<script setup lang="ts">
const store = useStore();
const { data: questions } = await store.questions.queryMany();
</script>

<template>
  <QuestionsHeader title="Newest Questions" :count="questions.length" />
  <QuestionCard v-for="q in questions" :key="q.id" v-bind="q" />
</template>
