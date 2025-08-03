<script setup lang="ts">
const { data } = await useFetch("/api/feed");
</script>

<template>
  <div class="bg-gold-500 border border-gold-300 rounded-md text-black-100">
    <NuxtErrorBoundary>
      <div class="p-4">
        <h2 class="mb-4 text-base font-bold">Top HackerNews Picks</h2>
        <ul class="space-y-2">
          <li
            v-for="article in data?.hackernews"
            :key="article.title"
            class="flex gap-2"
          >
            <Icon name="ph:arrow-square-out" class="mt-0.5 shrink-0" />
            <a
              class="text-sm hover:underline hover:text-white"
              :href="article.link"
              target="_blank"
            >
              <span>{{ article.title }}</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="border-t w-full border-gold-300"></div>

      <div class="p-4">
        <h2 class="mb-4 text-base font-bold">
          Top HackerNews Job Opportunities
        </h2>
        <ul class="space-y-2">
          <li
            v-for="article in data?.jobs"
            :key="article.title"
            class="flex gap-2"
          >
            <Icon name="ph:arrow-square-out" class="mt-0.5 shrink-0" />
            <a
              class="text-sm hover:underline hover:text-white"
              :href="article.link"
              target="_blank"
            >
              <span>{{ article.title }}</span>
            </a>
          </li>
        </ul>
      </div>
      <template #error="{ error, clearError }">
        <p>An error occurred: {{ error }}</p>
        <button @click="clearError">Clear error</button>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>
