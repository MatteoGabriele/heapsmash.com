import * as z from "zod";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostFeed } from "~/types/post";
import { getPagination } from "~~/server/utils/pagination";

const ITEMS_PER_PAGE = 10;
const FIRST_PAGE = 1;

const querySchema = z.object({
  status: z.string().optional(),
  tag: z.string().optional(),
  currentPage: z.coerce.number().optional(),
});

type QuerySchema = z.infer<typeof querySchema>;

export default defineEventHandler(async (event) => {
  let query: QuerySchema = {};

  try {
    query = await getValidatedQuery(event, querySchema.parse);
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid query parameters",
    });
  }

  try {
    const { currentPage = FIRST_PAGE, status, tag } = query;

    const supabase = await serverSupabaseClient<Database>(event);

    const dbQueryCount = supabase
      .from("question_feed")
      .select("*", { count: "exact", head: true });

    if (status === "unanswered") {
      dbQueryCount.eq("answers_count", 0);
    } else if (status === "answered") {
      dbQueryCount.eq("is_answered", true);
    }

    if (tag) {
      dbQueryCount.contains("tags", [tag]);
    }

    const { count, error: countError } = await dbQueryCount;

    if (countError) {
      throw createError({ statusMessage: countError.message });
    }

    const pagination = getPagination({
      totalCount: count ?? 0,
      itemsPerPage: ITEMS_PER_PAGE,
      currentPage,
    });

    const dbQueryFeed = supabase.from("question_feed").select();

    if (status === "unanswered") {
      dbQueryFeed.eq("answers_count", 0);
    } else if (status === "answered") {
      dbQueryFeed.eq("is_answered", true);
    }

    if (tag) {
      dbQueryFeed.contains("tags", [tag]);
    }

    const { data: result, error } = await dbQueryFeed
      .order("created_at", { ascending: false })
      .range(pagination.from, pagination.to)
      .overrideTypes<PostFeed[]>();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    return {
      ...pagination,
      result,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});
