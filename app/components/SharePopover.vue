<script setup lang="ts">
import { v4 } from "uuid";

const props = defineProps<{
  url: string;
  label: string;
}>();

const id = ref<string>("");
onMounted(() => {
  id.value = v4();
});

const uniqueId = computed<string>(() => `share_link_${id.value}`);
const anchorName = computed<string>(() => `--share-link-button-${id.value}`);
const buttonStyle = reactive({ anchorName });
const popoverStyle = reactive({
  positionAnchor: anchorName,
  top: "anchor(bottom)",
  left: "anchor(left)",
});

function copyLink(): void {
  navigator.clipboard.writeText(props.url);
}
</script>

<template>
  <div class="relative">
    <button
      class="text-sm text-neutral-400 hover:text-neutral-300"
      :style="buttonStyle"
      :popovertarget="uniqueId"
    >
      Share
    </button>
    <div
      class="absolute inset-auto mt-2 p-4 shadow-xl shadow-neutral-950 rounded-md bg-neutral-700"
      ref="popoverContainer"
      :id="uniqueId"
      popover
      :style="popoverStyle"
    >
      <form class="text-white">
        <label
          class="flex flex-col gap-2"
          aria-labelledby="share_url_label_text"
        >
          <span id="share_url_label_text" class="text-sm font-bold">
            {{ label }}
          </span>
          <input
            class="bg-neutral-900 px-3 py-1.5 text-sm border border-neutral-500 rounded-md min-w-80"
            autofocus
            name="shareUrl"
            type="text"
            readonly
            :value="url"
          />
        </label>
        <button
          @click="copyLink"
          type="button"
          class="mt-4 text-xs text-sky-400 hover:text-sky-300"
        >
          Copy link
        </button>
      </form>
    </div>
  </div>
</template>
