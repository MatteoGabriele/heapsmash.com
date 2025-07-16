export function getQuerystring(
  queryValue: string[] | string | undefined,
): string | undefined {
  if (!queryValue) {
    return;
  }

  return Array.isArray(queryValue) ? queryValue[0] : queryValue;
}
