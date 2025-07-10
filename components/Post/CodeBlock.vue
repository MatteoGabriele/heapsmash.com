<script setup lang="ts">
const props = defineProps<{
  text: string;
}>();

type PostSection = {
  type: "text" | "code";
  content: string;
};

const regex = /```(\w+)?\s*([\s\S]*?)```/g;

async function splitPostToSections(): Promise<PostSection[]> {
  const parts: PostSection[] = [];
  let lastIndex = 0;
  let text = props.text;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, lang, code] = match;
    const offset = match.index;

    if (offset > lastIndex) {
      parts.push({
        type: "text",
        content: text.slice(lastIndex, offset).trim(),
      });
    }

    parts.push({
      type: "code",
      content: code.trim(),
    });

    lastIndex = offset + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.slice(lastIndex).trim(),
    });
  }

  return parts;
}

const postSections: PostSection[] = await splitPostToSections();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(content, index) in postSections" :key="index">
      <div v-if="content.type === 'text'">{{ content.content }}</div>
      <code v-else class="text-neutral-500 block">
        <pre class="whitespace-pre-wrap" v-html="content.content"></pre>
      </code>
    </div>
  </div>
</template>

<style lang="css">
@import "tailwindcss";

pre.shiki {
  @apply p-4;
}
</style>
