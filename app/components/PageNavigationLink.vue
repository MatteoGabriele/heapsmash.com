<script setup lang="ts">
import { cn } from "clsx-for-tailwind";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<{
  to?: string;
  activeOnNested?: boolean;
}>();

const route = useRoute();
const isActiveOnNested = computed<boolean>(() => {
  return props.to !== undefined && route.path.startsWith(props.to);
});

const baseClasses =
  "flex w-full hover:bg-black-900 p-2 rounded-l-lg items-center gap-2 text-xs";
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    v-slot="{ isActive, navigate, href }"
    custom
    v-bind="$attrs"
  >
    <a
      :class="
        cn(baseClasses, {
          'bg-black-700 hover:bg-black-600': activeOnNested
            ? isActiveOnNested
            : isActive,
        })
      "
      :href="href"
      @click="navigate"
    >
      <slot />
    </a>
  </NuxtLink>
  <button v-else v-bind="$attrs" :class="baseClasses">
    <slot />
  </button>
</template>
