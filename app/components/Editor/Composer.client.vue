<script setup lang="ts">
import { EditorContent } from "@tiptap/vue-3";

const { editor } = useEditor();
</script>

<template>
  <div>
    <EditorButtons :editor="editor" />
    <EditorContent class="rounded-xl min-h-56 flex" :editor="editor" />
  </div>
</template>
