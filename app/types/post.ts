export type PostStatus = "newest" | "active" | "unanswered";

type BasePost = {
  id: number;
  title: string;
  slug: string;
  body: string;
  created_at: string;
  user: User;
  tags: string[];
  votes: Votes;
  answers_count: number;
  accepted_answer_id: number | null;
  is_answered: boolean;
  last_activity_at: string | null;
  views: number;
};

export type Post = BasePost & {
  comments: Comment[];
  answers: Answer[];
};

export type User = {
  id: string;
  username: string;
  avatar_url: string | null;
};

export type Answer = {
  id: number;
  body: string;
  user: User;
  created_at: string;
  is_accepted: boolean;
  votes: Votes;
  comments: Comment[];
};

export type Comment = {
  id: number;
  body: string;
  user: User;
  votes: number;
  created_at: string;
};

export type Votes = {
  upvotes: number;
  downvotes: number;
};

export type PostFeed = BasePost;
