import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostDetails } from "~/types/post";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusMessage: "missing post id",
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("question_detail")
    .select()
    .eq("id", Number(id))
    .maybeSingle()
    .overrideTypes<PostDetails>();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
