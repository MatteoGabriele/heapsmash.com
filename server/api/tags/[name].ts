import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, "name");

  if (!name) {
    throw createError({
      statusMessage: "missing tag name",
    });
  }

  const supabase = await serverSupabaseClient<Database>(event);

  const { data, error } = await supabase
    .from("tags")
    .select()
    .eq("name", name)
    .maybeSingle();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
