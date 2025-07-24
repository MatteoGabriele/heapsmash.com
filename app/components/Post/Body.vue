<script setup lang="ts">
import hljs from "highlight.js";
import { marked } from "marked";

const renderer = new marked.Renderer();
renderer.codespan = ({ text }) => `<code class="hljs">${text}</code>`;
renderer.code = ({ text, lang }) => {
  const highlighted = hljs.highlight(text, {
    language: lang ?? "text",
  });

  return `<pre><code class="hljs ${lang}">${highlighted.value}</code></pre>`;
};

marked.setOptions({ renderer });

const props = defineProps<{
  text: string;
}>();

const parsedText = computed(() => {
  const cleanedText = props.text.replace(/\\n/g, "\n");
  return marked.parse(cleanedText, { async: false });
});
</script>

<template>
  <div class="block">
    <div class="flex flex-col gap-4" v-html="parsedText"></div>
  </div>
</template>

<style lang="css">
@import "tailwindcss";

.block code {
  @apply whitespace-pre-wrap;
}
</style>
