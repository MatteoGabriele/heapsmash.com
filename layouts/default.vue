<script setup lang="ts"></script>

<template>
  <div>
    <MainHeader />
    <CenterContainer class="flex">
      <aside
        class="hidden border-r md:shrink-0 border-neutral-600 p-4 md:block w-50"
      >
        asd
      </aside>
      <main>
        <slot />
      </main>
    </CenterContainer>
  </div>
</template>
