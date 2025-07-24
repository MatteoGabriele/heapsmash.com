import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostFeed } from "~/types/post";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const { status, tag } = queryParams;

  const supabase = await serverSupabaseClient<Database>(event);
  const query = supabase.from("question_feed").select();

  if (status === "unanswered") {
    query.eq("answers_count", 0);
  }

  if (tag) {
    query.contains("tags", [tag]);
  }

  const { data, error } = await query
    .order("created_at", { ascending: false })
    .overrideTypes<PostFeed[]>();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data ?? ([] as PostFeed[]);
});
