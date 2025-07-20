import type { PostStatus } from "~/types/post";

export async function usePostsFeed() {
  return useAsyncData(() => {
    return $fetch("/api/posts");
  });
}

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

export async function usePostByStatus(status: MaybeRef<PostStatus>) {
  const statusRef = ref(status);
  return useAsyncData(
    () => {
      return $fetch(`/api/posts?status=${statusRef.value}`);
    },
    {
      watch: [statusRef],
    },
  );
}

export async function useAnswersByPostId(
  postId: MaybeRef<number | string | undefined>,
) {
  const postIdRef = ref(postId);
  return useAsyncData(
    () => {
      return $fetch(`/api/posts/${postIdRef.value}/answers`);
    },
    {
      watch: [postIdRef],
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
      { label: "Active", to: `${path}active` },
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
