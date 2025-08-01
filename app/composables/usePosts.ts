import type { Vote } from "~/types/vote";

export async function usePostById(id: MaybeRef<number | string | undefined>) {
  const idRef = ref(id);

  if (idRef.value === undefined) {
    throw createError({
      statusMessage: "Cannot find this question",
      statusCode: 404,
    });
  }

  return useAsyncData(
    () => {
      return $fetch(`/api/posts/${idRef.value}`);
    },
    {
      watch: [idRef],
    },
  );
}

export type PostTab = {
  label: string;
  to: string;
};

type UsePostTabsReturn = {
  tabs: ComputedRef<PostTab[]>;
  activeTab: ComputedRef<PostTab>;
};

export function usePostTabs(): UsePostTabsReturn {
  const tabs = computed<PostTab[]>(() => {
    const path = `/questions?status=`;
    return [
      { label: "Newest", to: `${path}newest` },
      { label: "Answered", to: `${path}answered` },
      { label: "Unanswered", to: `${path}unanswered` },
    ];
  });

  const route = useRoute();
  const activeTab = computed<PostTab>(() => {
    const fallback = tabs.value[0] as PostTab;
    return tabs.value.find((tab) => tab.to === route.fullPath) ?? fallback;
  });

  return {
    tabs,
    activeTab,
  };
}

export function useTagTabs(): UsePostTabsReturn {
  const route = useRoute();

  const tabs = computed<PostTab[]>(() => {
    const path = `/questions/tags/${route.params.name}?status=`;
    return [
      { label: "Newest", to: `${path}newest` },
      { label: "Answered", to: `${path}answered` },
      { label: "Unanswered", to: `${path}unanswered` },
    ];
  });

  const activeTab = computed<PostTab>(() => {
    const fallback = tabs.value[0] as PostTab;
    return tabs.value.find((tab) => tab.to === route.fullPath) ?? fallback;
  });

  return {
    tabs,
    activeTab,
  };
}

type UsePostVoteReturn = {
  updateVote: (vote: Vote) => Promise<void>;
};

export function usePostVote(
  id: MaybeRef<number | string | undefined>,
): UsePostVoteReturn {
  const idRef = ref(id);

  function updateVote(vote: Vote): Promise<void> {
    return $fetch(`/api/posts/${idRef.value}`, {
      method: "POST",
      body: {
        vote,
      },
    });
  }

  return {
    updateVote,
  };
}
