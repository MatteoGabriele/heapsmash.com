<script setup lang="ts">
import type { QuestionFeed } from "~/types/question";

const question = inject<QuestionFeed>("question");
const tags = computed<string[]>(() => {
  return question?.tags || [];
});
</script>

<template>
  <Tags :tags />
</template>
