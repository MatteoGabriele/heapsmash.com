import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostFeed, PostStatus } from "~/types/post";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const status: PostStatus | undefined = Array.isArray(queryParams.status)
    ? queryParams.status[0]
    : queryParams.status;

  const supabase = await serverSupabaseClient<Database>(event);

  const query = supabase.from("question_feed").select();

  if (status === "unanswered") {
    query.eq("answers_count", 0);
  } else if (status === "active") {
    query.gt("views", 0);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .overrideTypes<PostFeed[]>();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data ?? ([] as PostFeed[]);
});
