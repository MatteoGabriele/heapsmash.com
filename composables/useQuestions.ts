export type QuestionFeed = {
  id: number;
  title: string;
  slug: string;
  body: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string | null;
  };
  tags: string[];
  votes: {
    upvotes: number;
    downvotes: number;
  };
  answers_count: number;
  accepted_answer_id: number | null;
  is_answered: boolean;
  last_activity_at: string | null;
  views: number;
};

export async function useQuestionsFeed() {
  return useAsyncData<QuestionFeed[]>(() => {
    return $fetch("/api/questions");
  });
}
