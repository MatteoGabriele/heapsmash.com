<script setup lang="ts">
import type { Editor, EditorEvents } from "@tiptap/vue-3";
import { cn } from "clsx-for-tailwind";

defineProps<{
  selected?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :class="
      cn('hover:bg-sky-600 p-1 rounded-sm', {
        'bg-sky-700': selected,
      })
    "
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
