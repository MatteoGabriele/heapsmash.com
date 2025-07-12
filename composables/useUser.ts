export function useUser() {
  return useSupabaseUser();
}

export async function useUserProfile() {
  const user = useSupabaseUser();
  const userId = user.value?.id;

  return useAsyncData(
    `user-${userId}`,
    () => {
      return $fetch(`/api/user/${userId}`);
    },
    {
      getCachedData(key, nuxtApp) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
      },
    },
  );
}
