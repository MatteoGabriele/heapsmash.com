import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostDetails } from "~/types/post";

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const questionId = Number(getRouterParam(event, "id"));

  const body = await readBody<{ vote?: number }>(event);
  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("votes")
    .upsert(
      {
        user_id: user.id,
        target_id: questionId,
        target_type: "question",
        vote: body.vote ?? null,
      },
      {
        onConflict: "user_id, target_id, target_type",
      },
    )
    .select()
    .overrideTypes<PostDetails>();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
