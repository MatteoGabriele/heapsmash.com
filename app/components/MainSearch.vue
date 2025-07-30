<script setup lang="ts">
const query = ref<string>("");
</script>

<template>
  <div
    class="border border-black-600 w-full rounded-lg px-2 focus-within:border-black-400"
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
