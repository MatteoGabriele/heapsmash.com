<script setup lang="ts">
import type { PostFeed } from "~/types/post";

const props = defineProps<{
  post: PostFeed;
}>();

provide("post", props.post);
</script>

<template>
  <article
    class="md:flex gap-4 p-4 md:pl-12 border-t border-b-0 border-neutral-700"
  >
    <div class="md:w-28 shrink-0 mb-2 md:mb-0 md:mt-1">
      <PostStats />
    </div>
    <div>
      <header>
        <h2 class="text-lg">
          <NuxtLink
            class="text-sky-300 hover:text-sky-200"
            :to="`/questions/${post.id}/${post.slug}`"
          >
            {{ post.title }}
          </NuxtLink>
        </h2>
      </header>

      <p class="text-sm line-clamp-2">
        {{ post.body }}
      </p>

      <footer v-if="post.tags" class="mt-2">
        <PostTags />
      </footer>
    </div>
  </article>
</template>
