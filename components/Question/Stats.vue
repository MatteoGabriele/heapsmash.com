<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const props = defineProps<{
  votes: number;
  answers: number;
  views: number;
  answered?: boolean;
  answerCorrect?: boolean;
}>();
</script>

<template>
  <div>
    <ul class="flex gap-2 items-center md:flex-col md:items-end text-sm">
      <li>
        <span class="font-bold">{{ votes }}</span> votes
      </li>
      <li
        :class="
          cn({
            'border px-1.5 py-0.5 rounded-lg': answered || answerCorrect,
            ' border-emerald-800 text-emerald-500': answered,
            'bg-emerald-400 text-neutral-900': answerCorrect,
          })
        "
      >
        <div class="flex gap-1 items-center">
          <Icon v-if="answerCorrect" name="ph:check-bold" />
          <span class="font-bold">{{ answers }}</span> answers
        </div>
      </li>
      <li>
        <span class="font-bold">{{ views }}</span> views
      </li>
    </ul>
  </div>
</template>
