<script setup lang="ts">
const { data, error } = await usePostsFeed();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <PostsHeader title="Newest questions" :counter="data?.length" />
  <PostFeed v-for="post in data" :key="post.id" :post="post" />
</template>
