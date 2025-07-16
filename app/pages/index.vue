<script setup lang="ts">
const { data, error } = await useQuestionsFeed();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <PostsHeader title="Newest Questions" :count="data?.length ?? 0" />
  <PostCard v-for="question in data" :key="question.id" :question="question" />
</template>
