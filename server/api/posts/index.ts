import * as z from "zod";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostFeed } from "~/types/post";

const ITEMS_PER_PAGE = 10;
const FIRST_PAGE = 1;

const querySchema = z.object({
  status: z.string().optional(),
  tag: z.string().optional(),
  currentPage: z.coerce.number().optional(),
  itemsPerPage: z.coerce.number().optional(),
});

type QuerySchema = z.infer<typeof querySchema>;

export default defineEventHandler(async (event) => {
  let query: QuerySchema = {};

  try {
    query = await getValidatedQuery(event, querySchema.parse);
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid query parameters",
    });
  }

  try {
    const {
      itemsPerPage = ITEMS_PER_PAGE,
      currentPage = FIRST_PAGE,
      status,
      tag,
    } = query;

    const supabase = await serverSupabaseClient<Database>(event);

    const { count, error: countError } = await supabase
      .from("question_feed")
      .select("*", { count: "exact", head: true });

    if (countError) {
      throw createError({ statusMessage: countError.message });
    }

    const totalCount = count ?? 0;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    const nextPage: number | null =
      currentPage >= totalPages ? null : currentPage + 1;
    const previousPage: number | null =
      currentPage <= 1 ? null : currentPage - 1;

    const validatedPage = Math.min(
      Math.min(1, currentPage),
      Math.min(1, totalPages),
    );

    const { from, to } = getPageRanges(validatedPage, { itemsPerPage });
    const db = supabase.from("question_feed").select();

    if (status === "unanswered") {
      db.eq("answers_count", 0);
    } else if (status === "answered") {
      db.eq("is_answered", true);
    }

    if (tag) {
      db.contains("tags", [tag]);
    }

    const { data: result, error } = await db
      .order("created_at", { ascending: false })
      .range(from, to)
      .overrideTypes<PostFeed[]>();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    return {
      result,
      totalCount,
      totalPages,
      previousPage,
      nextPage,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
});

type GetPageRangesReturn = {
  from: number;
  to: number;
};

type GetPageRangesParams = {
  itemsPerPage: number;
};

function getPageRanges(
  page: number,
  { itemsPerPage }: GetPageRangesParams,
): GetPageRangesReturn {
  const zeroBasedPage = page - 1;
  const from = zeroBasedPage * itemsPerPage;
  const to = from + itemsPerPage - 1;

  return {
    from,
    to,
  };
}
