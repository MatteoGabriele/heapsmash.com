import type { PostStatus } from "~/types/post";

export async function usePostsFeed() {
  return useAsyncData(() => {
    return $fetch("/api/posts");
  });
}

export async function usePostByStatus(status: Ref<PostStatus>) {
  return useAsyncData(
    () => {
      return $fetch(`/api/posts?status=${status.value}`);
    },
    {
      watch: [status],
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
