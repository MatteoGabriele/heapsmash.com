<script setup lang="ts">
const { data, error } = await useQuestions();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <header class="p-4 md:pl-8">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl">Newest Questions</h1>
      <NuxtLink
        class="text-sm text-neutral-300 rounded-lg px-3 py-2 bg-sky-700 hover:bg-sky-600"
        to="questions/ask"
      >
        Ask Question
      </NuxtLink>
    </div>
    <div class="mt-8 flex justify-between">
      <p>{{ data?.length }} questions</p>
      <QuestionTabFilters />
    </div>
  </header>
</template>
