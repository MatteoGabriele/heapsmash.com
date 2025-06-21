import questions from "~/assets/static/questions.json";

export type Question = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  user: {
    name: string;
    reputation: number;
    avatar: string;
  };
  timestamp: string;
};

export async function useQuestions() {
  return useAsyncData<Question[]>(async () => questions);
}

export async function useQuestionById(id: string | undefined) {
  return useAsyncData<Question | undefined>(async () => {
    return questions.find((question) => question.id === id);
  });
}
