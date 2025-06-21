<script setup lang="ts">
const { data, error } = await useQuestions();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <div class="max-w-3xl md:border-l border-neutral-600">
    <header class="p-4 md:px-8">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl">Newest Questions</h1>
        <NuxtLink
          class="text-sm text-neutral-300 rounded-lg px-3 py-2 bg-sky-700 hover:bg-sky-600"
          to="questions/ask"
        >
          Ask Question
        </NuxtLink>
      </div>
      <div class="mt-8">
        <p>{{ data?.length }} questions</p>
      </div>
    </header>

    <div>
      <article
        v-for="q in data"
        :key="q.id"
        class="md:flex gap-4 p-4 md:pl-12 border-t border-b-0 border-neutral-600"
      >
        <div class="shrink-0 mb-2 md:mb-0 md:mt-1">
          <ul class="flex gap-2 md:block md:text-right text-sm">
            <li>
              <span class="font-bold">{{ q.votes }}</span> votes
            </li>
            <li>
              <span class="font-bold">{{ q.answers }}</span> answers
            </li>
            <li>
              <span class="font-bold">{{ q.views }}</span> views
            </li>
          </ul>
        </div>
        <div>
          <header>
            <h2 class="text-lg">
              <NuxtLink
                class="text-sky-300 hover:text-sky-200"
                :to="`/questions/${q.id}/${q.slug}`"
                >{{ q.title }}</NuxtLink
              >
            </h2>
          </header>

          <p class="text-sm line-clamp-2">{{ q.excerpt }}</p>

          <footer class="mt-2">
            <ul class="flex gap-2">
              <li
                v-for="tag in q.tags"
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
    </div>
  </div>
</template>
