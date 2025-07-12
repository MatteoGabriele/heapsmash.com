import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({ statusMessage: "Missing user id" });
  }

  const client = await serverSupabaseClient<Database>(event);
  const { data, error } = await client
    .from("profiles")
    .select()
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw createError({ statusMessage: error.message });
  }

  return data;
});
