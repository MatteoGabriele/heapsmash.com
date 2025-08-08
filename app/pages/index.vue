<script setup lang="ts">
const user = useSupabaseUser();
const userName = computed<string | undefined>(() => {
  if (!user.value) {
    return;
  }
  const data = user.value.user_metadata;
  return data.preferred_username || data.user_name || data.name;
});
</script>

<template>
  <div>
    <p>Welcome back, {{ userName }}</p>
  </div>
</template>
