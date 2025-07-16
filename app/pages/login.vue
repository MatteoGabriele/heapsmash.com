<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

watchEffect(() => {
  if (user.value) {
    return navigateTo("/");
  }
});

async function signIn(): Promise<void> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    throw createError(error);
  }

  console.log(data);
}
</script>

<template>
  <div v-if="user">
    {{ user.email }}
  </div>
  <div class="px-6 py-2" v-else>
    <h2>Login</h2>
    <p>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis,
      perspiciatis?
    </p>

    <button @click="signIn">Login with Github</button>
  </div>
</template>
