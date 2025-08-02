import * as z from "zod";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";

const ITEMS_PER_PAGE = 16;
const FIRST_PAGE = 1;

const querySchema = z.object({
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
    const { currentPage = FIRST_PAGE } = query;

    const supabase = await serverSupabaseClient<Database>(event);

    const { count, error: errorCount } = await supabase
      .from("tags")
      .select("*", { count: "exact", head: true });

    if (errorCount) {
      throw createError({ statusMessage: errorCount.message });
    }

    const pagination = getPagination({
      totalCount: count ?? 0,
      itemsPerPage: ITEMS_PER_PAGE,
      currentPage,
    });

    const { data, error } = await supabase
      .from("tags")
      .select(`
        id,
        name,
        description,
        question_tags(count)
      `)
      .order("name")
      .range(pagination.from, pagination.to);

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    const result = data
      .map((tag) => ({
        id: tag.id,
        name: tag.name,
        description: tag.description,
        questions_count: tag.question_tags[0]?.count ?? 0,
      }))
      .sort((a, b) => b.questions_count - a.questions_count);

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
