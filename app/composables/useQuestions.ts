import type { QuestionStatus } from "~/types/question";

export async function useQuestionsFeed() {
  return useAsyncData(() => {
    return $fetch("/api/questions");
  });
}

export async function useQuestionByStatus(status: Ref<QuestionStatus>) {
  return useAsyncData(
    () => {
      return $fetch(`/api/questions?status=${status.value}`);
    },
    {
      watch: [status],
    },
  );
}

export type QuestionTab = {
  label: string;
  to: string;
};

type UseQuestionTabsReturn = {
  tabs: ComputedRef<QuestionTab[]>;
  activeTab: ComputedRef<QuestionTab>;
};

export function useQuestionTabs(): UseQuestionTabsReturn {
  const tabs = computed<QuestionTab[]>(() => {
    const path = `/questions?status=`;
    return [
      { label: "Newest", to: `${path}newest` },
      { label: "Active", to: `${path}active` },
      { label: "Unanswered", to: `${path}unanswered` },
    ];
  });

  const route = useRoute();
  const activeTab = computed<QuestionTab>(() => {
    const fallback = tabs.value[0] as QuestionTab;
    return tabs.value.find((tab) => tab.to === route.fullPath) ?? fallback;
  });

  return {
    tabs,
    activeTab,
  };
}
