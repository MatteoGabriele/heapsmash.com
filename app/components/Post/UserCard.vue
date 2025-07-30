<script setup lang="ts">
import { cn } from "clsx-for-tailwind";
import type { PostUser } from "~/types/post";

defineProps<{
  user: PostUser;
  date: string;
  isPostAnswer?: boolean;
  isPostOwner?: boolean;
}>();
</script>

<template>
  <div
    :class="
      cn('inline-flex flex-col gap-2 py-2 px-4 rounded-md', {
        'bg-sky-950': isPostOwner,
      })
    "
  >
    <p class="text-xs text-black-300">
      {{ isPostAnswer ? "answered" : "asked" }}
      <NuxtTime :datetime="date" date-style="medium" time-style="short" />
    </p>
    <div class="flex gap-2">
      <Avatar shape="square" size="md" :image="user.avatar_url" />
      <NuxtLink
        class="text-sky-500 underline hover:text-sky-400 text-sm"
        :to="`/users/${user.id}/${user.username}`"
      >
        {{ user.username }}
      </NuxtLink>
    </div>
  </div>
</template>
