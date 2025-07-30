<script setup lang="ts"></script>

<template>
  <aside>
    <nav aria-role="Pages">
      <ul>
        <li>
          <NuxtLink
            v-slot="{ isActive }"
            class="flex bg-neutral-700 p-2 rounded-l-lg items-center gap-2 text-xs"
            to="/"
          >
            <Icon name="material-symbols:live-help" class="text-lg" />
            Questions
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            class="flex items-center hover:bg-neutral-800 rounded-l-lg gap-2 p-2 text-xs"
            to="/questions/tags"
          >
            <Icon name="ion:md-pricetags" class="text-lg" />
            Tags
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
