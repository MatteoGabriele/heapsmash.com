<script setup lang="ts">
import type { Question } from "~/composables/useQuestions";

defineProps<Question>();
</script>

<template>
  <article
    class="md:flex gap-4 p-4 md:pl-12 border-t border-b-0 border-neutral-700"
  >
    <div class="md:w-28 shrink-0 mb-2 md:mb-0 md:mt-1">
      <QuestionStats :votes :views :answers :answered :answer-correct />
    </div>
    <div>
      <header>
        <h2 class="text-lg">
          <NuxtLink
            class="text-sky-300 hover:text-sky-200"
            :to="`/questions/${id}/${slug}`"
            >{{ title }}</NuxtLink
          >
        </h2>
      </header>

      <p class="text-sm line-clamp-2">{{ excerpt }}</p>

      <footer class="mt-2">
        <ul class="flex gap-2">
          <li
            v-for="tag in tags"
            :key="tag"
            class="text-xs bg-neutral-700 text-neutral-200 rounded-lg px-2 py-1 hover:bg-neutral-600"
          >
            <NuxtLink :to="`/questions/tags/${tag}`">
              {{ tag }}
            </NuxtLink>
          </li>
        </ul>
      </footer>
    </div>
  </article>
</template>
