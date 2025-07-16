<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
  <NuxtLink
    class="hover:bg-neutral-700 py-1 px-2 rounded-sm flex items-center gap-2"
    :to="`/users/${user?.id}/${user?.user_metadata.user_name}`"
  >
    <Avatar :image="user?.user_metadata.avatar_url" />
    <ReputationCounter />
  </NuxtLink>
</template>
