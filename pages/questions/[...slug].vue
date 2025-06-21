<script setup lang="ts">
const { params } = useRoute();
const id = computed<string | undefined>(() => params.slug[0]);
const slug = computed<string | undefined>(() => params.slug[1]);

const { status, data, error } = await useQuestionById(id.value);

if (error.value) {
  throw createError(error.value);
}

if (!data.value) {
  throw createError({ statusCode: 404 });
}
</script>

<template>
  <div v-if="status === 'pending'">loading question....</div>
  <div v-else-if="data">
    <div>question id: {{ id }} and slug: {{ slug }}</div>
    <div>{{ data.title }}</div>
  </div>
</template>
