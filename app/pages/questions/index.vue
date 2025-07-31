<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const route = useRoute();
const status = computed<PostStatus>(() => {
  const queryValue = route.query.status as PostStatus;
  return queryValue ?? "newest";
});

const currentPage = ref<number>(
  route.query.page ? Number.parseInt(route.query.page as string) : 1
);
const filterOptions = reactive({
  status,
  currentPage,
});

const { data, error } = await usePostsFeed(filterOptions);

if (error.value) {
  throw createError(error.value);
}

const title = computed<string>(() => `${status.value} questions`);

function setPage(page: number): void {
  currentPage.value = page;
}

function prevPage(): void {
  if (data.value?.previousPage == null) {
    return;
  }

  setPage(data.value.previousPage);
}

function nextPage(): void {
  if (data.value?.nextPage == null) {
    return;
  }

  setPage(data.value.nextPage);
}
</script>

<template>
  <PostsHeader :title="title" :counter="data?.totalCount" />
  <ul>
    <li v-for="post in data?.result" :key="post.id">
      <PostFeed :post="post" />
    </li>
  </ul>

  <div class="flex gap-4">
    <button
      class="disabled:text-black-400"
      v-if="data?.previousPage !== null"
      @click="prevPage"
    >
      prev
    </button>

    <ul class="flex gap-1" v-if="data?.totalCount && data.totalCount > 1">
      <li v-for="page in data.totalPages" :key="page">
        <NuxtLink
          :to="{ name: 'questions', query: { ...route.query, page } }"
          @click="setPage(page)"
        >
          {{ page }}
        </NuxtLink>
      </li>
    </ul>

    <button
      v-if="data?.nextPage !== null"
      class="disabled:text-black-400"
      @click="nextPage"
    >
      next
    </button>
  </div>
</template>
