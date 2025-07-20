<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const { query, params } = useRoute();
const { data, error } = await useTagByName(params.name as string);

if (error.value) {
  throw createError(error.value);
}

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `No tag found named "${params.name}"`,
  });
}

const { tabs, activeTab } = useTagTabs();

const { data: posts, error: postsError } = await usePostsWithFilters(
  reactive({
    tag: params.name as string,
    status: query.status as PostStatus,
  })
);

if (postsError.value) {
  throw createError(postsError.value);
}
</script>

<template>
  <div class="p-4 md:pl-6">
    <header>
      <h1 class="text-2xl">[{{ data?.name }}]</h1>
      <p class="mt-2" v-if="data?.description">{{ data.description }}</p>
    </header>
    <div class="mt-8 flex justify-between">
      <p>{{ posts?.length ?? 0 }} questions</p>
      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>
  <PostFeed v-for="post in posts" :key="post.id" :post="post" />
</template>
