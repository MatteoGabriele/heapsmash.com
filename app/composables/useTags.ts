export async function useTagByName(name: MaybeRef<string>) {
  const nameRef = ref(name);

  return useAsyncData(nameRef, () => {
    return $fetch(`/api/tags/${nameRef.value}`);
  });
}
