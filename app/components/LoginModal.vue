<script setup lang="ts">
const dialog = useTemplateRef<HTMLDialogElement>("dialog");
function showModal(): void {
  dialog.value?.showModal();
}
function closeModal(): void {
  dialog.value?.close();
}

defineExpose({
  show: showModal,
  close: closeModal,
});

const supabase = useSupabaseClient();
const isPending = ref<boolean>(false);
const errorMessage = ref<string | null>(null);
const redirectTo = useRoute().fullPath;

console.log(redirectTo);

async function handleSignIn(): Promise<void> {
  isPending.value = true;
  errorMessage.value = null;

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo,
    },
  });

  if (error) {
    isPending.value = false;
    errorMessage.value = error.message;
    return;
  }
}
</script>

<template>
  <dialog
    ref="dialog"
    class="border-0 bg-transparent w-full h-full p-0 text-black-100 backdrop:bg-black-800/95"
    @close="closeModal"
  >
    <div
      class="flex items-center justify-center max-h-screen max-w-screen w-full h-full"
    >
      <div
        class="rounded-lg relative bg-black-800 px-6 py-12 max-w-sm flex flex-col justify-center items-center gap-12 shadow-2xl"
      >
        <button
          @click="closeModal"
          class="absolute top-4 right-4 hover:text-white"
        >
          <Icon name="ph:x" />
        </button>

        <header class="text-center">
          <h2 class="text-2xl mb-1">Sign in with GitHub</h2>
          <p class="text-sm text-black-300 text-balance">
            Log in or create your account using your GitHub profile.
          </p>
        </header>

        <div class="flex flex-col items-center justify-center gap-6">
          <button
            class="rounded-md text-sm flex items-center gap-2 bg-black-950 hover:bg-black-900 px-4 py-2"
            @click="handleSignIn"
          >
            <Icon
              v-if="isPending"
              name="ph:spinner-bold"
              class="animate-spin text-lg"
            />
            <Icon v-else name="mdi:github" class="text-xl" />
            Continue with GitHub
          </button>

          <p class="text-xs text-red-400" v-if="errorMessage">
            {{ errorMessage }}
          </p>

          <p class="text-xs text-center text-black-300 mx-8">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  </dialog>
</template>
