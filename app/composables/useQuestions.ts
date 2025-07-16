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
