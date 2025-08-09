<script lang="ts" setup>
const user = useSupabaseUser();

const isLoginModalOpen = ref<boolean>(false);
function openLoginModal(): void {
  isLoginModalOpen.value = true;
}
function closeLoginModal(): void {
  isLoginModalOpen.value = false;
}
</script>

<template>
  <aside>
    <LoginModal v-if="!user && isLoginModalOpen" @close="closeLoginModal" />
    <nav aria-role="Pages">
      <ul>
        <li>
          <PageNavigationLink v-if="user" to="/">
            <Icon name="ph:house-fill" class="text-lg" />
            Home
          </PageNavigationLink>
          <PageNavigationLink @click="openLoginModal" v-else>
            <Icon name="ph:house-fill" class="text-lg" />
            Home
          </PageNavigationLink>
        </li>
        <li>
          <PageNavigationLink active-on-nested to="/questions">
            <Icon name="ph:chats-fill" class="text-lg" />
            Questions
          </PageNavigationLink>
        </li>
        <li>
          <PageNavigationLink to="/tags">
            <Icon name="ph:tag-fill" class="text-lg" />
            Tags
          </PageNavigationLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
