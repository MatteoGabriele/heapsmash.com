export function getQuerystring<T extends string>(
  queryValue: T | T[] | undefined,
): T | undefined {
  if (!queryValue) {
    return;
  }

  const value = queryValue as T | T[];
  return Array.isArray(value) ? value[0] : value;
}
