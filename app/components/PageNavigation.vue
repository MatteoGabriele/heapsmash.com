<template>
  <aside>
    <nav aria-role="Pages">
      <ul>
        <li>
          <PageNavigationLink to="/">
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
