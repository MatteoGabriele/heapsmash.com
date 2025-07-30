<script setup lang="ts">
import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/vue-3";

const props = defineProps<NodeViewProps>();

const languages = computed(() => {
  return props.extension.options.lowlight.listLanguages();
});

const selectedLanguage = computed({
  get: () => props.node.attrs.language,
  set: (language) => {
    props.updateAttributes({ language });
  },
});
</script>

<template>
  <NodeViewWrapper class="relative hljs">
    <select
      class="absolute bg-white text-black-500 right-4 top-4"
      contenteditable="false"
      v-model="selectedLanguage"
    >
      <option :value="null">auto</option>
      <option disabled>—</option>
      <option
        v-for="(language, index) in languages"
        :value="language"
        :key="index"
      >
        {{ language }}
      </option>
    </select>
    <pre class="my-2 p-4">
      <code>
        <NodeViewContent />
      </code>
    </pre>
  </NodeViewWrapper>
</template>
