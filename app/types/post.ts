export type PostStatus = "newest" | "active" | "unanswered";

type BasePost = {
  id: number;
  title: string;
  slug: string;
  body: string;
  created_at: string;
  user: PostUser;
  tags: string[];
  votes: PostVotes;
  answers_count: number;
  accepted_answer_id: number | null;
  is_answered: boolean;
  last_activity_at: string | null;
  views: number;
};

export type PostDetails = BasePost & {
  comments: PostComment[];
  answers: PostAnswer[];
};

export type PostUser = {
  id: string;
  username: string;
  avatar_url: string | null;
};

export type PostAnswer = {
  id: number;
  body: string;
  user: PostUser;
  created_at: string;
  is_accepted: boolean;
  votes: PostVotes;
  comments: PostComment[];
};

export type PostComment = {
  id: number;
  body: string;
  user: PostUser;
  created_at: string;
};

export type PostVotes = {
  upvotes: number;
  downvotes: number;
};

export type PostFeed = BasePost;
