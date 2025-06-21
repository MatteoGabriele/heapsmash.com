<script setup lang="ts">
const isSignedIn = ref<boolean>(false);
</script>

<template>
  <div class="border-b border-neutral-600">
    <CenterContainer as="header" class="p-4 flex gap-6 items-center">
      <Logo />
      <div class="flex items-center justify-end w-full">
        <AccountMenu v-if="isSignedIn" />
        <MainNavigation v-else />
      </div>
    </CenterContainer>
  </div>
</template>
