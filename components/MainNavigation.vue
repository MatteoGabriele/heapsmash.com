<script setup lang="ts">
const user = useUser();
</script>

<template>
  <nav aria-label="Main">
    <ul v-if="user">
      <li>
        <UserProfileButton />
      </li>
    </ul>
    <ul v-else class="flex items-center gap-2">
      <li>
        <NuxtLink
          class="text-sm text-neutral-300 rounded-lg px-3 py-2 hover:bg-neutral-700"
          to="/login"
        >
          Log in
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="text-sm text-neutral-300 rounded-lg px-3 py-2 bg-sky-700 hover:bg-sky-600"
          to="/signup"
        >
          Sign up
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
