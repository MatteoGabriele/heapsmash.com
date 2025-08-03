import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusMessage: "missing post id",
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("questions_comments")
    .select(`
      id,
      body,
      created_at,
      profiles!user_id ( id, username, avatar_url )
    `)
    .eq("question_id", Number(id))
    .order("created_at", { ascending: true });

  console.log(data);

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
