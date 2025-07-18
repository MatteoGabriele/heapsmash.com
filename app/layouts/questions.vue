<script setup lang="ts">
const { data, error } = await useQuestionsFeed();

if (error.value) {
  throw createError(error.value);
}

const { tabs, activeTab } = useQuestionTabs();
</script>

<template>
  <div class="p-4 md:pl-8">
    <PostsHeader title="Newest questions" />
    <div class="mt-8 flex justify-between">
      <p>{{ data?.length ?? 0 }} questions</p>
      <TabFilterList :active-tab="activeTab" :tabs="tabs" />
    </div>
  </div>

  <slot />
</template>
