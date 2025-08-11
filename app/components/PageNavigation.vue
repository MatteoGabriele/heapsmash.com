<script lang="ts" setup>
const user = useSupabaseUser();

const loginModal = useTemplateRef("login");
</script>

<template>
  <aside>
    <LoginModal ref="login" />
    <nav aria-role="Pages">
      <ul>
        <li>
          <PageNavigationLink v-if="user" to="/">
            <Icon name="ph:house-fill" class="text-lg" />
            Home
          </PageNavigationLink>
          <PageNavigationLink @click="loginModal?.show" v-else>
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
