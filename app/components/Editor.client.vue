<script setup lang="ts">
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent, VueNodeViewRenderer } from "@tiptap/vue-3";
import { cn } from "clsx-for-tailwind";
import { all, createLowlight } from "lowlight";
import EditorCodeBlock from "./EditorCodeBlock.vue";

const lowlight = createLowlight(all);

const editor: Editor = new Editor({
  editorProps: {
    attributes: {
      spellcheck: "false",
      class: cn([
        "flex-1 p-4 rounded-xl focus:outline-none",
        "border border-neutral-700 focus:border-neutral-500",
        "resize overflow-hidden",
      ]),
    },
  },
  extensions: [
    Document,
    Paragraph,
    Text,
    CodeBlockLowlight.extend({
      addKeyboardShortcuts() {
        return {
          Tab: () => {
            if (editor.isActive("codeBlock")) {
              return editor.commands.insertContent("\t");
            }
          },
        };
      },
      addNodeView() {
        return VueNodeViewRenderer(EditorCodeBlock);
      },
    }).configure({
      lowlight,
      HTMLAttributes: { class: "hljs" },
      languageClassPrefix: "",
    }),
  ],
});

onUnmounted(() => {
  editor?.destroy();
});
</script>

<template>
  <editor-content
    :editor="editor"
    id="editor"
    class="rounded-xl min-h-56 flex"
  />
</template>

<style>
.tiptap:first-child {
  margin-top: 0;
}

.tiptap pre {
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.tiptap pre code {
  padding: 0;
}
</style>
