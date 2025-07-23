<script setup lang="ts">
import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {
  Editor,
  EditorContent,
  useEditor,
  VueNodeViewRenderer,
} from "@tiptap/vue-3";
import { cn } from "clsx-for-tailwind";
import { all, createLowlight } from "lowlight";
import EditorCodeBlock from "./EditorCodeBlock.vue";

const lowlight = createLowlight(all);

const editor: Ref<Editor | undefined> = useEditor({
  editorProps: {
    attributes: {
      spellcheck: "false",
      class: cn([
        "flex-1 p-4 rounded-xl rounded-t-none focus:outline-none",
        "border border-neutral-700 focus:border-neutral-500",
        "resize overflow-hidden",
      ]),
    },
  },
  extensions: [
    Bold,
    Document,
    Paragraph,
    Text,
    BulletList,
    ListItem,
    OrderedList,
    CodeBlockLowlight.extend({
      addKeyboardShortcuts() {
        return {
          Tab: () => {
            if (editor.value?.isActive("codeBlock")) {
              return editor.value?.commands.insertContent("\t");
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
</script>

<template>
  <div>
    <section
      v-if="editor"
      class="flex items-center rounded-xl rounded-b-none flex-wrap p-4 border border-neutral-700 border-b-0"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()"
      >
        bold
      </button>
    </section>
    <editor-content class="rounded-xl min-h-56 flex" :editor="editor" />
  </div>
</template>
