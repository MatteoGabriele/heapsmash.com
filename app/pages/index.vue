<script setup lang="ts">
const { data, error } = await useQuestionsFeed();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <PostsHeader title="Newest questions" :counter="data?.length" />
  <PostCard v-for="question in data" :key="question.id" :question="question" />
</template>
