<script setup lang="ts">
const supabase = useSupabaseClient();

async function handleSignIn(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    throw createError(error);
  }
}

const emit = defineEmits<(e: "close") => void>();

function closeModal(): void {
  emit("close");
}
</script>

<template>
  <div class="fixed inset-0 bg-black-800/60 flex items-center justify-center">
    <div
      class="rounded-lg relative bg-black-700 px-6 py-12 max-w-sm flex flex-col justify-center items-center gap-12 shadow-2xl"
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-black-100 hover:text-white"
      >
        <Icon name="ph:x" />
      </button>

      <header class="text-center">
        <h2 class="text-2xl mb-1">Ligin now</h2>
        <p class="text-sm text-black-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          aspernatur?
        </p>
      </header>

      <div class="flex flex-col items-center justify-center gap-6">
        <button
          class="rounded-md text-sm flex items-center gap-2 bg-black-900 hover:bg-black-800 px-4 py-2"
          @click="handleSignIn"
        >
          <Icon name="mdi:github" class="text-xl" />
          Continue with GitHub
        </button>

        <p class="text-xs text-center text-black-300 mx-8">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  </div>
</template>
