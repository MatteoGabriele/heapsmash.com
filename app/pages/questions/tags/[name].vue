<script setup lang="ts">
import type { PostStatus } from "~/types/post";

const route = useRoute();
const { data, error } = await useTagByName(route.params.name as string);

if (error.value) {
  throw createError(error.value);
}

if (!data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `No tag found named "${route.params.name}"`,
  });
}

const { tabs, activeTab } = useTagTabs();

const filterOptions = computed(() => ({
  tag: route.params.name as string,
  status: route.query.status as PostStatus,
}));

const { data: posts, error: postsError } = await useFetch("/api/posts", {
  query: filterOptions,
  watch: [filterOptions],
});

if (postsError.value) {
  throw createError(postsError.value);
}
</script>

<template>
  <div class="p-4 md:pl-6">
    <header>
      <div class="flex gap-2 items-center">
        <h1 class="text-2xl">[{{ data?.name }}]</h1>
      </div>

      <p class="mt-2" v-if="data?.description">{{ data.description }}</p>
    </header>
    <div class="mt-8 flex justify-between">
      <p>{{ posts?.totalCount ?? 0 }} questions</p>
      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>
  <PostFeed v-for="post in posts?.result" :key="post.id" :post="post" />
</template>
