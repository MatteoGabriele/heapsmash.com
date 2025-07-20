<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const route = useRoute();
const status = computed<PostStatus>(() => {
  const queryValue = getQuerystring<PostStatus>(
    route.query.status as PostStatus
  );

  return queryValue ?? "newest";
});

const { data, error } = await usePostsWithFilters(
  reactive({
    status,
  })
);

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <PostsHeader title="Newest questions" :counter="data?.length" />
  <PostFeed v-for="post in data" :key="post.id" :post="post" />
</template>
