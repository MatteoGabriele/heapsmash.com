import type { LocationQueryValue } from "vue-router";

export function getQuerystring<T extends string>(
  queryValue: LocationQueryValue | LocationQueryValue[] | undefined,
): T | undefined {
  if (!queryValue) {
    return;
  }

  const value = queryValue as T | T[];
  return Array.isArray(value) ? value[0] : value;
}
