<script setup lang="ts">
const route = useRoute();

defineProps<{
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  totalCount: number;
  totalPages: number;
}>();
</script>

<template>
  <ul class="flex gap-1 items-center">
    <li v-if="previousPage !== null">
      <PostFeedPaginationLink
        :to="{
          query: { ...route.query, page: previousPage },
        }"
      >
        Prev
      </PostFeedPaginationLink>
    </li>
    <li v-for="page in totalPages" :key="page">
      <PostFeedPaginationLink
        :is-active="page === currentPage"
        :to="{ query: { ...route.query, page } }"
      >
        {{ page }}
      </PostFeedPaginationLink>
    </li>
    <li v-if="nextPage !== null">
      <PostFeedPaginationLink
        :to="{
          query: { ...route.query, page: nextPage },
        }"
      >
        Next
      </PostFeedPaginationLink>
    </li>
  </ul>
</template>
