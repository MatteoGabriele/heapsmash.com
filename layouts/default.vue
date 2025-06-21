<script setup lang="ts"></script>

<template>
  <div>
    <MainHeader />
    <CenterContainer class="flex">
      <aside class="hidden md:shrink-0 p-4 md:block w-50">
        <nav>
          <ul>
            <li>
              <NuxtLink to="/">Questions</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/questions/tags">tags</NuxtLink>
            </li>
          </ul>
        </nav>
      </aside>
      <main>
        <slot />
      </main>
    </CenterContainer>
  </div>
</template>
