export function getQuerystring<T extends string>(
  queryValue: T | T[] | undefined,
): string | undefined {
  if (!queryValue) {
    return;
  }

  const value = queryValue as T | T[];
  return Array.isArray(value) ? value[0] : value;
}

export function createQueryStringFromObject<T>(obj: Record<string, T>): string {
  return Object.entries(obj)
    .reduce((acc: string[], [key, value]) => {
      if (value) {
        acc.push(`${key}=${value}`);
      }
      return acc;
    }, [])
    .join("&");
}
