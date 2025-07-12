<script setup lang="ts">
const route = useRoute();
const userId = computed<string | undefined>(() => route.params.slug[0]);
// const userName = computed<string | undefined>(() => route.params.slug[1]);

if (!userId.value) {
  throw createError({
    statusCode: 404,
  });
}

const { data, error } = await useUserProfile();

if (error.value) {
  throw createError(error.value);
}
</script>

<template>
  <div class="px-6 py-2">
    <h2 class="text-xl mb-2">{{ data?.full_name }}</h2>
    <img
      class="rounded-lg size-48"
      v-if="data?.avatar_url"
      :src="data.avatar_url"
      alt="user avatar"
    />
  </div>
</template>
