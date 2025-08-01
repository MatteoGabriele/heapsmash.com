<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const route = useRoute();
const status = computed<PostStatus>(() => {
  const queryValue = route.query.status as PostStatus;
  return queryValue ?? "newest";
});

const currentPage = computed<number>(() => {
  return route.query.page ? Number.parseInt(route.query.page as string) : 1;
});

const filterOptions = computed(() => {
  return {
    status: status.value,
    currentPage: currentPage.value,
  };
});

const { data, error } = await useFetch("/api/posts", {
  query: filterOptions,
  watch: [filterOptions],
});

if (error.value) {
  throw createError(error.value);
}

const title = computed<string>(() => `${status.value} questions`);
</script>

<template>
  <PostsHeader :title="title" :counter="data?.totalCount" />

  <ul>
    <li v-for="post in data?.result" :key="post.id">
      <PostFeed :post="post" />
    </li>
  </ul>

  <div v-if="data?.totalCount && data.totalCount > 1" class="mt-12 p-4 md:pl-6">
    <PostFeedPagination
      :current-page="currentPage"
      :next-page="data.nextPage"
      :previous-page="data.previousPage"
      :total-count="data.totalCount"
      :total-pages="data.totalPages"
    />
  </div>
</template>
