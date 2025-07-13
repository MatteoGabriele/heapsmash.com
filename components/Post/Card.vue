<script setup lang="ts">
import type { QuestionFeed } from "../../composables/useQuestions";

defineProps<{
  question: QuestionFeed;
}>();
</script>

<template>
  <article
    class="md:flex gap-4 p-4 md:pl-12 border-t border-b-0 border-neutral-700"
  >
    <div class="md:w-28 shrink-0 mb-2 md:mb-0 md:mt-1">
      <PostStats
        :has-accepted-answer="question.is_answered"
        :answers="question.answers_count"
        :views="question.views"
        :votes="question.votes.upvotes"
      />
    </div>
    <div>
      <header>
        <h2 class="text-lg">
          <NuxtLink
            class="text-sky-300 hover:text-sky-200"
            :to="`/questions/${question.id}/${question.slug}`"
          >
            {{ question.title }}
          </NuxtLink>
        </h2>
      </header>

      <p class="text-sm line-clamp-2">
        {{ question.body }}
      </p>

      <footer class="mt-2">
        <Tags :tags="question.tags" />
      </footer>
    </div>
  </article>
</template>
