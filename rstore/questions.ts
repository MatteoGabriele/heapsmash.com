export type Question = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  votes: number;
  answers: number;
  answered: boolean;
  answerCorrect?: boolean;
  views: number;
  tags: string[];
  user: User;
  timestamp: string;
};

export type User = {
  name: string;
  reputation: number;
  avatar: string;
};

export default defineItemType<Question>().model({
  name: "questions",
});
