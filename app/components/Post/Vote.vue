<script setup lang="ts">
import { type Vote, Votes, type VoteType } from "~/types/vote";

const { votes, initialVote = null } = defineProps<{
  votes: number;
  initialVote?: Vote;
}>();

const emits = defineEmits<{
  voted: [vote: Vote];
}>();

const votedState = computed<VoteType | undefined>(() => {
  if (!initialVote) {
    return;
  }

  return initialVote === 1 ? "up" : "down";
});

function toggleVote(voteType: VoteType): void {
  let newVote: Vote = null;

  if (votedState.value !== voteType) {
    newVote = voteType === "up" ? 1 : -1;
  }

  emits("voted", newVote);
}
</script>

<template>
  <div class="inline-flex flex-col items-center gap-2">
    <VoteButton
      @click="toggleVote('up')"
      :active="votedState === 'up'"
      direction="up"
    />

    <p class="font-bold">{{ votes || "Vote" }}</p>

    <VoteButton
      @click="toggleVote('down')"
      :active="votedState === 'down'"
      direction="down"
    />
  </div>
</template>
