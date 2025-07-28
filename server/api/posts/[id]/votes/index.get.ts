import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusMessage: "missing post id",
    });
  }

  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("votes")
    .select()
    .eq("target_id", Number(id))
    .eq("target_type", "question")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
