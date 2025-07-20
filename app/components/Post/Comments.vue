<script setup lang="ts">
import type { PostComment } from "~/types/post";

defineProps<{
  comments: PostComment[];
}>();
</script>

<template>
  <ul>
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="flex items-start gap-2 border-b border-neutral-700 py-2 first-of-type:border-t"
    >
      <div class="flex items-start gap-2">
        <div class="text-sm min-w-2">
          <span v-if="comment.votes">{{ comment.votes }}</span>
        </div>
        <div>
          <VoteButton direction="up" variant="minimal" />
          <button
            class="transition-colors duration-300 text-neutral-500 hover:text-red-500"
          >
            <Icon name="ph:flag-fill" />
          </button>
        </div>
      </div>
      <div class="text-sm space-x-1">
        <span>{{ comment.body }}</span>
        <span>-</span>
        <NuxtLink
          class="text-sky-400 underline hover:text-sky-300"
          :to="`/users/${comment.user.id}/${comment.user.username}`"
        >
          {{ comment.user.username }}
        </NuxtLink>

        <NuxtTime
          class="text-neutral-400"
          :datetime="comment.created_at"
          date-style="medium"
          time-style="short"
        />
      </div>
    </li>
  </ul>
</template>
