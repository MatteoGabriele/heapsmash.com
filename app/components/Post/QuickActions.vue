<script setup lang="ts">
defineProps<{
  postId: number;
}>();
</script>

<template>
  <ul class="flex items-center gap-2">
    <li>
      <button class="text-sm text-neutral-400 hover:text-neutral-300">
        Share
      </button>
    </li>

    <li>
      <NuxtLink
        :to="`/posts/${postId}/edit`"
        class="text-sm text-neutral-400 hover:text-neutral-300"
      >
        Edit
      </NuxtLink>
    </li>
  </ul>
</template>
