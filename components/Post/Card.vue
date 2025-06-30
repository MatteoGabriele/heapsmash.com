<script setup lang="ts">
const props = defineProps<{
  questionId: number;
}>();

const store = useStore();
const { data } = await store.questions.queryFirst({
  key: props.questionId,
});
</script>

<template>
  <article
    v-if="data"
    class="md:flex gap-4 p-4 md:pl-12 border-t border-b-0 border-neutral-700"
  >
    <div class="md:w-28 shrink-0 mb-2 md:mb-0 md:mt-1">
      <PostStats
        :has-accepted-answer="data.is_answered"
        :answers="data.answers.length"
        :views="data.views"
        :votes="data.votes.upvotes"
      />
    </div>
    <div>
      <header>
        <h2 class="text-lg">
          <NuxtLink
            class="text-sky-300 hover:text-sky-200"
            :to="`/questions/${data.id}/${data.slug}`"
          >
            {{ data.title }}
          </NuxtLink>
        </h2>
      </header>

      <p class="text-sm line-clamp-2">
        {{ data.body }}
      </p>

      <footer class="mt-2">
        <Tags :tags="data.tags" />
      </footer>
    </div>
  </article>
</template>
