<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3";

defineProps<{
  editor: Editor | undefined;
}>();
</script>

<template>
  <section
    class="flex items-center rounded-xl rounded-b-none flex-wrap p-4 border border-neutral-700 border-b-0"
  >
    <button
      @click="editor?.chain().focus().toggleBold().run()"
      :disabled="!editor?.can().chain().focus().toggleBold().run()"
    >
      bold
    </button>
  </section>
</template>
