<script setup lang="ts">
import type { PostFeed } from "~/types/post";

const post = inject<PostFeed>("post");
const tags = computed<string[]>(() => {
  return post?.tags || [];
});
</script>

<template>
  <Tags :tags />
</template>
