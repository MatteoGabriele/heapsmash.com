import type { PostFeed, PostStatus } from "~/types/post";

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

type UsePostsWithFiltersOptions = {
  status: PostStatus;
  tag: string;
};

export async function usePostsWithFilters(
  options: MaybeRef<Partial<UsePostsWithFiltersOptions>> = {},
) {
  const filtersQuery = computed<string>(() => {
    const object = unref(options);
    return createQueryStringFromObject(object);
  });

  const url = computed<string>(() => `/api/posts?${filtersQuery.value}`);

  return useFetch<PostFeed[]>(url, {
    key: filtersQuery,
  });
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
