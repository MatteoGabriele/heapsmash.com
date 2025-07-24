<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

async function handleSignIn(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    throw createError(error);
  }
}
</script>

<template>
  <div v-if="user">
    {{ user.email }}
  </div>
  <div class="px-6 py-2 inline-flex flex-col gap-4" v-else>
    <h2>Login</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis,
      perspiciatis?
    </p>

    <div>
      <button
        @click="handleSignIn"
        class="px-4 py-2 bg-neutral-600 hover:bg-neutral-500 flex items-center gap-2"
      >
        <Icon name="mdi:github" class="text-xl" />
        Login with Github
      </button>
    </div>
  </div>
</template>
