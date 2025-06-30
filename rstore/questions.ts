export interface Question {
  id: number;
  slug: string;
  title: string;
  body: string;
  user: AnswerUser;
  tags: string[];
  votes: Votes;
  created_at: Date;
  last_activity_at: Date;
  views: number;
  is_answered: boolean;
  accepted_answer_id: number;
  comments: Comment[];
  answers: Answer[];
}

export interface Answer {
  id: number;
  body: string;
  user: AnswerUser;
  created_at: Date;
  is_accepted: boolean;
  votes: Votes;
  comments: Comment[];
}

export interface Comment {
  id: number;
  body: string;
  user: CommentUser;
  votes: number;
  created_at: Date;
}

export interface CommentUser {
  id: number;
  username: string;
}

export interface AnswerUser {
  id: number;
  username: string;
  reputation: number;
  profile_image?: string;
}

export interface Votes {
  upvotes: number;
  downvotes: number;
}

export default defineItemType<Question>().model({
  name: "questions",
});
