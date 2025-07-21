<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const route = useRoute();
const status = computed<PostStatus>(() => {
  const queryValue = route.query.status as PostStatus;
  return queryValue ?? "newest";
});

const filterOptions = computed(() => ({
  status: status.value,
}));

const { data, error } = await usePostsWithFilters(filterOptions);

if (error.value) {
  throw createError(error.value);
}

const title = computed<string>(() => `${status.value} questions`);
</script>

<template>
  <PostsHeader :title="title" :counter="data?.length" />
  <PostFeed v-for="post in data" :key="post.id" :post="post" />
</template>
