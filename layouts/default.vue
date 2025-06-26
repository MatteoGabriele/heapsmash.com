<script setup lang="ts"></script>

<template>
  <div class="min-h-svh flex flex-col">
    <MainHeader />
    <CenterContainer class="flex flex-1">
      <div>
        <PageNavigation class="sticky top-16" />
      </div>
      <main class="max-w-3xl md:border-l border-neutral-700 h-full">
        <slot />
      </main>
    </CenterContainer>
  </div>
</template>
