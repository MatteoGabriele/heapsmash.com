export const Votes = {
  up: 1,
  down: -1,
} as const;

export type VoteType = keyof typeof Votes;
export type Vote = (typeof Votes)[VoteType] | null;
