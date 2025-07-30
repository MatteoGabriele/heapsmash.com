<script setup lang="ts">
const route = useRoute();
const userId = computed<string | undefined>(() => route.params.slug?.[0]);

if (!userId.value) {
  throw createError({
    statusCode: 404,
  });
}

const { data, error } = await useUserProfile();

if (error.value) {
  throw createError(error.value);
}

const supabase = useSupabaseClient();
const router = useRouter();
async function handleLogout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw createError(error);
  }

  router.push("/");
}
</script>

<template>
  <div class="px-6 py-2 inline-flex flex-col gap-4">
    <h2 class="text-xl mb-2">{{ data?.full_name }}</h2>
    <img
      class="rounded-lg size-48"
      v-if="data?.avatar_url"
      :src="data.avatar_url"
      alt="user avatar"
    />
    <button
      @click="handleLogout"
      class="px-4 py-2 bg-black-800 hover:bg-black-700"
    >
      Logout
    </button>
  </div>
</template>
