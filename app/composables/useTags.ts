export async function useTagByName(name: string) {
  return useAsyncData(() => {
    return $fetch(`/api/tags/${name}`);
  });
}
