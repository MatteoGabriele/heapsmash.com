<script setup lang="ts">
const isSignedIn = ref<boolean>(false);
</script>

<template>
  <header class="p-4 flex gap-6 items-center border-b border-neutral-600">
    <Logo />
    <div class="flex items-center justify-end w-full">
      <AccountMenu v-if="isSignedIn" />
      <MainNavigation v-else />
    </div>
  </header>
</template>
