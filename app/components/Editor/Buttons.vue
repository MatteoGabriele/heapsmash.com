<script setup lang="ts">
import type { Editor } from "@tiptap/vue-3";

defineProps<{
  editor: Editor | undefined;
}>();
</script>

<template>
  <section
    class="flex items-center gap-2 rounded-xl rounded-b-none flex-wrap p-4 border border-black-600 border-b-0"
  >
    <EditorButton
      @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
      :selected="editor?.isActive('heading', { level: 1 })"
      :disabled="
        !editor?.can().chain().focus().toggleHeading({ level: 1 }).run()
      "
    >
      <Icon name="ph:text-h-one" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
      :selected="editor?.isActive('heading', { level: 2 })"
      :disabled="
        !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
      "
    >
      <Icon name="ph:text-h-two" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
      :selected="editor?.isActive('heading', { level: 3 })"
      :disabled="
        !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
      "
    >
      <Icon name="ph:text-h-three" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleBold().run()"
      :selected="editor?.isActive('bold')"
      :disabled="!editor?.can().chain().focus().toggleBold().run()"
    >
      <Icon name="ph:text-b" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleStrike().run()"
      :selected="editor?.isActive('strike')"
      :disabled="!editor?.can().chain().focus().toggleStrike().run()"
    >
      <Icon name="ph:text-strikethrough" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleItalic().run()"
      :selected="editor?.isActive('italic')"
      :disabled="!editor?.can().chain().focus().toggleItalic().run()"
    >
      <Icon name="ph:text-italic" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleBulletList().run()"
      :selected="editor?.isActive('bulletList')"
      :disabled="!editor?.can().chain().focus().toggleBulletList().run()"
    >
      <Icon name="ph:list-bullets" />
    </EditorButton>

    <EditorButton
      @click="editor?.chain().focus().toggleOrderedList().run()"
      :selected="editor?.isActive('orderedList')"
      :disabled="!editor?.can().chain().focus().toggleOrderedList().run()"
    >
      <Icon name="ph:list-numbers" />
    </EditorButton>
  </section>
</template>
