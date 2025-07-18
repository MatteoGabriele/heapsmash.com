<script setup lang="ts">
const { data, error } = await useQuestionsFeed();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <NuxtLayout name="questions">
    <PostCard
      v-for="question in data"
      :key="question.id"
      :question="question"
    />
  </NuxtLayout>
</template>
