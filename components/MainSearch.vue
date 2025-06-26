<script setup lang="ts">
const query = ref<string>("");
</script>

<template>
  <div
    class="border border-neutral-700 w-full rounded-lg px-2 focus-within:border-neutral-500"
  >
    <form role="search" class="w-full">
      <label class="flex items-center">
        <Icon name="ph:magnifying-glass" />
        <input
          type="text"
          placeholder="Search..."
          class="w-full px-2 py-1 outline-0"
          v-model="query"
        />
      </label>
    </form>
  </div>
</template>
