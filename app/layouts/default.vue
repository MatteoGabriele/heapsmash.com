<script setup lang="ts"></script>

<template>
  <div class="min-h-svh flex flex-col">
    <MainHeader />
    <CenterContainer class="flex flex-1">
      <div>
        <PageNavigation
          class="sticky top-16 hidden md:shrink-0 py-6 md:block w-50"
        />
      </div>
      <main class="max-w-3xl md:border-l pt-4 border-black-600 w-full pb-12">
        <slot />
      </main>
      <aside class="hidden ml-6 lg:block py-6">
        <NewsFeed class="sticky top-16 w-80" />
      </aside>
    </CenterContainer>
  </div>
</template>
