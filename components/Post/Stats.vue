<script setup lang="ts">
import { cn } from "clsx-for-tailwind";
import type { QuestionFeed } from "~/types/question";

const question = inject<QuestionFeed>("question");
const isAnswered = computed<boolean>(() => {
  const count: number | undefined = question?.answers_count;
  return count ? count > 0 : false;
});
const hasAcceptedAnswer = computed<boolean>(() => {
  return question?.accepted_answer_id != null;
});
</script>

<template>
  <div>
    <ul class="flex gap-2 items-center md:flex-col md:items-end text-sm">
      <li>
        <span class="font-bold">{{ question?.votes.upvotes }}</span> votes
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
          <span class="font-bold">{{ question?.answers_count }}</span> answers
        </div>
      </li>
      <li>
        <span class="font-bold">{{ question?.views }}</span> views
      </li>
    </ul>
  </div>
</template>
