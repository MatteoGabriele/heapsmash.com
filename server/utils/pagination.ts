type GetPaginationReturn = {
  totalCount: number;
  totalPages: number;
  from: number;
  to: number;
  previousPage: number | null;
  nextPage: number | null;
};

type GetPaginationOptions = {
  totalCount: number;
  itemsPerPage: number;
  currentPage: number;
};

export function getPagination({
  totalCount = 0,
  itemsPerPage,
  currentPage,
}: GetPaginationOptions): GetPaginationReturn {
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const nextPage = currentPage >= totalPages ? null : currentPage + 1;
  const previousPage = currentPage <= 1 ? null : currentPage - 1;

  const validatedPage = Math.min(
    Math.max(1, currentPage),
    Math.max(1, totalPages),
  );

  const zeroBasedPage = validatedPage - 1;
  const from = zeroBasedPage * itemsPerPage;
  const to = from + itemsPerPage - 1;

  return {
    totalCount,
    totalPages,
    previousPage,
    nextPage,
    from,
    to,
  };
}
