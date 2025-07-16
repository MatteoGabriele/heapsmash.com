type UseVotesReturn = {
  votes: Ref<number>;
  hasUpVoted: ComputedRef<boolean>;
  hasDownVoted: ComputedRef<boolean>;
  upVote: () => void;
  downVote: () => void;
};

export default function useVotes(votes: number): UseVotesReturn {
  const localVotes = ref<number>(votes);

  const hasUpVoted = computed<boolean>(() => {
    return localVotes.value === votes + 1;
  });

  const hasDownVoted = computed<boolean>(() => {
    return localVotes.value === votes - 1;
  });

  function upVote(): void {
    if (localVotes.value > votes) {
      localVotes.value = votes;
    } else {
      localVotes.value = votes + 1;
    }
  }

  function downVote(): void {
    if (localVotes.value < votes) {
      localVotes.value = votes;
    } else {
      localVotes.value = votes - 1;
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
