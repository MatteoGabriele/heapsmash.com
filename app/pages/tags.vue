<script setup lang="ts">
import { useI18n } from "kashyyyk";

definePageMeta({
  layout: "full-width",
});

const route = useRoute();
const currentPage = computed<number>(() => {
  return route.query.page ? Number.parseInt(route.query.page as string) : 1;
});
const filterOptions = computed(() => {
  return {
    currentPage: currentPage.value,
  };
});
const { data, error } = await useFetch("/api/tags", {
  query: filterOptions,
  watch: [filterOptions],
});

if (error.value) {
  throw createError(error.value);
}

const { t } = useI18n({
  en: {
    questionCount: "questions 0 | question 1 | questions {count}",
  },
});
</script>

<template>
  <div class="p-4 md:pl-6">
    <header>
      <h1 class="text-2xl">Tags</h1>
    </header>
    <div class="mt-8">
      <ul class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <li
          v-for="tag in data?.result"
          :key="tag.id"
          class="border rounded-md border-black-600 p-4 h-50 flex flex-col"
        >
          <div class="flex flex-col gap-4">
            <div>
              <TagLink :name="tag.name" />
            </div>
            <p v-if="tag.description" class="line-clamp-4 text-sm">
              {{ tag.description }}
            </p>
          </div>

          <div class="mt-auto flex justify-end">
            <p class="text-sm">
              {{ t("questionCount", { count: tag.questions_count }) }}
            </p>
          </div>
        </li>
      </ul>

      <div
        v-if="data?.totalPages && data.totalPages > 1"
        class="mt-12 p-4 md:pl-6"
      >
        <PostFeedPagination
          :current-page="currentPage"
          :next-page="data.nextPage"
          :previous-page="data.previousPage"
          :total-count="data.totalCount"
          :total-pages="data.totalPages"
        />
      </div>
    </div>
  </div>
</template>
