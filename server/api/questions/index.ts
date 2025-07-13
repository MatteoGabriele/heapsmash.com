import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("question_feed")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
