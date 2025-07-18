<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const route = useRoute();
const status = computed<PostStatus>(() => {
  return getQuerystring<PostStatus>(route.query.status) ?? "newest";
});

const { data, error } = await usePostByStatus(status);

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <PostsHeader title="Newest questions" :counter="data?.length" />
  <PostCard v-for="post in data" :key="post.id" :post="post" />
</template>
