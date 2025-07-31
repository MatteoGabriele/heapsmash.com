import * as v from "valibot";
import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database";
import type { PostFeed } from "~/types/post";

const ITEMS_PER_PAGE = 10;
const FIRST_PAGE = 1;

const querySchema = v.object({
  status: v.optional(v.string()),
  tag: v.optional(v.string()),
  currentPage: v.optional(v.pipe(v.string(), v.decimal(), v.transform(Number))),
  itemsPerPage: v.optional(
    v.pipe(v.string(), v.decimal(), v.transform(Number)),
  ),
});

export default defineEventHandler(async (event) => {
  try {
    const {
      itemsPerPage = ITEMS_PER_PAGE,
      currentPage = FIRST_PAGE,
      status,
      tag,
    } = await getValidatedQuery(event, (data) => {
      return v.parse(querySchema, data);
    });

    const supabase = await serverSupabaseClient<Database>(event);
    const query = supabase
      .from("question_feed")
      .select("*", { count: "exact" });

    if (status === "unanswered") {
      query.eq("answers_count", 0);
    } else if (status === "answered") {
      query.eq("is_answered", true);
    }

    if (tag) {
      query.contains("tags", [tag]);
    }

    const { from, to } = getPageRanges(currentPage, {
      itemsPerPage,
    });

    const { data, error, count } = await query
      .order("created_at", { ascending: false })
      .range(from, to)
      .overrideTypes<PostFeed[]>();

    if (error) {
      throw createError({ statusMessage: error.message });
    }

    const totalItems = count ?? 0;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const nextPage: number | null =
      currentPage >= totalPages ? null : currentPage + 1;
    const previousPage: number | null =
      currentPage <= 1 ? null : currentPage - 1;

    return {
      result: data ?? ([] as PostFeed[]),
      totalItems,
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
