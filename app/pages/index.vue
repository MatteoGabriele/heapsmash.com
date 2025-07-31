<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const currentPage = ref<number>(1);
const options = reactive({ currentPage });
const { data, error } = await usePostsFeed(options);

if (error.value) {
  throw createError(error.value);
}

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
  <PostsHeader title="Newest questions" :counter="data?.totalCount" />
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
      <li v-for="pageIndex in data.totalPages" :key="pageIndex">
        <button
          @click="setPage(pageIndex)"
          :class="
            cn('text-xs border border-black-700 px-3 py-2 rounded-md', {
              'bg-black-800': pageIndex === currentPage,
            })
          "
        >
          {{ pageIndex }}
        </button>
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
