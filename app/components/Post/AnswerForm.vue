<script setup lang="ts">
defineProps<{
  postId: number;
}>();

const answer = ref<string | null>(null);
</script>

<template>
  <div>
    <h2>You answer</h2>
    <Editor class="mt-4" />
  </div>
</template>
