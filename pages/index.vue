<script setup lang="ts">
const store = useStore();
const { data: questions } = await store.questions.queryMany();
</script>

<template>
  <PostsHeader title="Newest Questions" :count="questions.length" />
  <PostCard
    v-for="question in questions"
    :key="question.id"
    :question-id="question.id"
  />
</template>
