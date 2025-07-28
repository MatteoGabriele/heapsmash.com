type UseVotesReturn = {
  votes: Ref<number>;
  hasUpVoted: ComputedRef<boolean>;
  hasDownVoted: ComputedRef<boolean>;
  upVote: () => void;
  downVote: () => void;
};

export default function useVotes(votes: Ref<number>): UseVotesReturn {
  const localVotes = ref(votes);

  const hasUpVoted = computed<boolean>(() => {
    return localVotes.value === votes.value + 1;
  });

  const hasDownVoted = computed<boolean>(() => {
    return localVotes.value === votes.value - 1;
  });

  function upVote(): void {
    if (localVotes.value > votes.value) {
      localVotes.value = votes.value;
    } else {
      localVotes.value = votes.value + 1;
    }
  }

  function downVote(): void {
    if (localVotes.value < votes.value) {
      localVotes.value = votes.value;
    } else {
      localVotes.value = votes.value - 1;
    }
  }

  return {
    downVote,
    upVote,
    hasDownVoted,
    hasUpVoted,
    votes: readonly(localVotes),
  };
}
