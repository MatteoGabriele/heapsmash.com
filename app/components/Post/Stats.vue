<script setup lang="ts">
import { cn } from "clsx-for-tailwind";
import type { PostFeed } from "~/types/post";

const post = inject<PostFeed>("post");
const isAnswered = computed<boolean>(() => {
  const count: number | undefined = post?.answers_count;
  return count ? count > 0 : false;
});
const hasAcceptedAnswer = computed<boolean>(() => {
  return post?.accepted_answer_id != null;
});
</script>

<template>
  <div>
    <ul class="flex gap-2 items-center md:flex-col md:items-end text-sm">
      <li>
        <span class="font-bold">{{ post?.votes.upvotes }}</span> votes
      </li>
      <li
        :class="
          cn({
            'border px-1.5 py-0.5 rounded-lg': isAnswered || hasAcceptedAnswer,
            ' border-emerald-800 text-emerald-500': isAnswered,
            'bg-emerald-400 text-neutral-900': hasAcceptedAnswer,
          })
        "
      >
        <div class="flex gap-1 items-center">
          <Icon v-if="hasAcceptedAnswer" name="ph:check-bold" />
          <span class="font-bold">{{ post?.answers_count }}</span> answers
        </div>
      </li>
    </ul>
  </div>
</template>
