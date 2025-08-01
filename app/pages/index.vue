<script setup lang="ts">
const user = useSupabaseUser();

onMounted(() => {
  if (!user.value) {
    navigateTo("/questions");
  }
});
</script>

<template>
  <div class="p-4 md:pl-6">
    <h1>Welcome back, {{ user?.user_metadata.full_name }}</h1>
  </div>
</template>
