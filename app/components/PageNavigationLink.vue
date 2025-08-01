<script setup lang="ts">
import { cn } from "clsx-for-tailwind";
</script>

<template>
  <NuxtLink v-slot="{ isActive, navigate, href }" custom>
    <a
      :class="
        cn(
          'flex hover:bg-black-900 p-2 rounded-l-lg items-center gap-2 text-xs',
          { 'bg-black-700': isActive }
        )
      "
      :href="href"
      @click="navigate"
    >
      <slot />
    </a>
  </NuxtLink>
</template>
