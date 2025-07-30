<script setup lang="ts">
import { cn } from "clsx-for-tailwind";
</script>

<template>
  <aside>
    <nav aria-role="Pages">
      <ul>
        <li>
          <PageNavigationLink to="/">
            <Icon name="material-symbols:live-help" class="text-lg" />
            Questions
          </PageNavigationLink>
        </li>
        <li>
          <PageNavigationLink to="/questions/tags">
            <Icon name="ion:md-pricetags" class="text-lg" />
            Tags
          </PageNavigationLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
