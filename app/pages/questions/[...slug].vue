<script setup lang="ts">
import { useI18n } from "kashyyyk";

const { params } = useRoute();
const id = computed<string | undefined>(() => params.slug[0]);

const store = useStore();
const { data, error } = await store.questions.queryFirst(() => ({
  key: id.value,
}));

if (error.value) {
  throw createError(error.value);
}

const votes = computed<number>(() => {
  if (!data.value) {
    return 0;
  }

  const { upvotes, downvotes } = data.value.votes;

  return upvotes - downvotes;
});

const { t } = useI18n({
  en: {
    answers: "0 Answers | 1 Answer | {count} Answers",
  },
});
</script>

<template>
  <div v-if="data" class="p-4 md:px-6">
    <header class="border-b pb-4 border-b-neutral-700">
      <h2 class="text-2xl">{{ data.title }}</h2>
      <ul class="flex gap-2 mt-2 text-sm text-neutral-300">
        <li>Asked <span class="text-white">today</span></li>
        <li>Modified <span class="text-white">today</span></li>
        <li>
          Viewed
          <span class="text-white">{{ data.views }} times</span>
        </li>
      </ul>
    </header>

    <Post :post="data" />

    <section aria-labelledby="answers_title" class="mt-12">
      <h2 id="answers_title" class="text-xl">
        {{ t("answers", { count: data.answers.length }) }}
      </h2>
      <Post v-for="answer in data.answers" :key="answer.id" :post="answer" />
    </section>
  </div>
</template>
