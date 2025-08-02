<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

const props = defineProps<{
  to: string;
  activeOnNested?: boolean;
}>();

const route = useRoute();
const isActiveOnNested = computed<boolean>(() => {
  return route.path.startsWith(props.to);
});
</script>

<template>
  <NuxtLink :to="to" v-slot="{ isActive, navigate, href }" custom>
    <a
      :class="
        cn(
          'flex hover:bg-black-900 p-2 rounded-l-lg items-center gap-2 text-xs',
          { 'bg-black-700': activeOnNested ? isActiveOnNested : isActive }
        )
      "
      :href="href"
      @click="navigate"
    >
      <slot />
    </a>
  </NuxtLink>
</template>
