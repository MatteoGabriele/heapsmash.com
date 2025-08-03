import * as z from "zod";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

const paramsSchema = z.object({
  id: z.coerce.number(),
});

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, paramsSchema.parse);

  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("questions")
    .select(`
      id,
      title,
      body,
      slug,
      views,
      is_answered,
      accepted_answer_id,
      last_activity_at,
      created_at,
      profiles ( id, username, avatar_url ),
      question_tags ( tags ( name ) )
    `)
    .eq("id", params.id)
    .single();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
