<script setup lang="ts">
const props = defineProps<{
  post: any;
}>();

const votes = computed<number>(() => {
  if (!props.post.votes) {
    return 0;
  }

  const { downvotes, upvotes } = props.post.votes;
  return upvotes - downvotes;
});

const tags = computed<string[]>(() => {
  return props.post.tags || [];
});
</script>

<template>
  <div class="py-6 flex gap-4">
    <PostVote :votes />
    <div>
      <PostCodeBlock :text="post.body" />
      <Tags v-if="tags.length" class="mt-4" :tags />
      <PostComments
        v-if="post.comments.length"
        class="mt-12"
        :comments="post.comments"
      />
    </div>
  </div>
</template>
