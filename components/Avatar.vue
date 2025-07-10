<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <div class="size-8 rounded-full overflow-hidden" v-if="user?.user_metadata">
    <img
      :src="user.user_metadata.avatar_url"
      alt="logged-in user avatar avatar"
    />
  </div>
  <div
    v-else
    class="bg-neutral-600 rounded-full overflow-hidden flex size-8 items-center justify-center"
    aria-label="logged-in user avatar"
  >
    <Icon class="text-2xl text-neutral-300" name="mdi:account-circle-outline" />
  </div>
</template>
