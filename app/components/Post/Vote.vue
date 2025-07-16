<script setup lang="ts">
const props = defineProps<{
  votes: number;
}>();
const emits = defineEmits<{
  voted: [votes: number];
}>();

const {
  votes: localVotes,
  upVote,
  downVote,
  hasDownVoted,
  hasUpVoted,
} = useVotes(props.votes);

watch(localVotes, (value) => {
  emits("voted", value);
});
</script>

<template>
  <div class="inline-flex flex-col items-center gap-2">
    <VoteButton @click="upVote" :active="hasUpVoted" direction="up" />
    <p class="font-bold">{{ localVotes || "Vote" }}</p>
    <VoteButton @click="downVote" :active="hasDownVoted" direction="down" />
  </div>
</template>
