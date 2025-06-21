<script setup lang="ts"></script>

<template>
  <nav aria-label="Main">
    <ul class="flex items-center gap-2">
      <li>
        <NuxtLink
          class="text-sm text-neutral-300 rounded-2xl px-3 py-2 hover:bg-neutral-700"
          to="/users/login"
        >
          Log in
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="text-sm text-neutral-300 rounded-2xl px-3 py-2 bg-sky-700 hover:bg-sky-600"
          to="/users/signup"
        >
          Sign up
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
