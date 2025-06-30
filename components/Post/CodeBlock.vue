<script setup lang="ts">
import { codeToHtml, codeToTokens, type BundledLanguage } from "shiki";

const props = defineProps<{
  text: string;
}>();

type Block = {
  type: "text" | "code";
  content: string;
};

async function getCode(value: string, lang?: BundledLanguage): Promise<string> {
  console.log(
    await codeToTokens(value, {
      lang: lang || "text",
      theme: "dark-plus",
    })
  );
  return await codeToHtml(value, {
    lang: lang || "text",
    theme: "dark-plus",
  });
}

const regex = /```(\w+)?\s*([\s\S]*?)```/g;

async function createBlocks(): Promise<Block[]> {
  const parts: Block[] = [];
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
      content: await getCode(code.trim(), lang as BundledLanguage),
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

const blocks: Block[] = await createBlocks();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(content, index) in blocks" :key="index">
      <span v-if="content.type === 'text'">{{ content.content }}</span>
      <span v-else v-html="content.content"></span>
    </div>
  </div>
</template>

<style lang="css">
@import "tailwindcss";

pre.shiki {
  @apply p-4;
}
</style>
