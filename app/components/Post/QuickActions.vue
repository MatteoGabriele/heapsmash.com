<script setup lang="ts">
const props = defineProps<{
  postId: number;
  answerId?: number;
}>();

const isAnswer = computed<boolean>(() => props.answerId !== undefined);

const {
  public: { siteUrl },
} = useRuntimeConfig();
const url = computed<string>(() => {
  if (isAnswer.value) {
    return `${siteUrl}/a/${props.postId}/${props.answerId}`;
  }

  return `${siteUrl}/q/${props.postId}`;
});

const sharePopoverLabel = computed<string>(() => {
  const context = isAnswer.value ? "answer" : "question";
  return `Share a link to this ${context}`;
});
</script>

<template>
  <ul class="flex items-center gap-2">
    <li>
      <SharePopover :label="sharePopoverLabel" :url="url" />
    </li>

    <li>
      <NuxtLink
        :to="`/posts/${answerId ?? postId}/edit`"
        class="text-sm text-black-300 hover:text-black-200"
      >
        Edit
      </NuxtLink>
    </li>
  </ul>
</template>
