<script setup lang="ts">
const { params } = useRoute();
const id = computed<string | undefined>(() => params.slug[0]);

const store = useStore();
const { data, error } = await store.questions.queryFirst(() => ({
  key: id.value,
}));

if (error.value) {
  throw createError(error.value);
}

const votes = computed<number>(() => {
  if (!data.value) {
    return 0
  }
  
  const { upvotes, downvotes} = data.value.votes
  
  return upvotes - downvotes
})

function handleVoting(newVote: number): void {
   
}
</script>

<template>
  <div v-if="data" class="p-4">
    <header class="border-b pb-4 border-b-neutral-700">
      <h2 class="text-2xl">{{ data.title }}</h2>
      <ul class="flex gap-2 mt-2 text-sm text-neutral-300">
        <li>Asked <span class="text-white">today</span></li>
        <li>Modified <span class="text-white">today</span></li>
        <li>
          Viewed
          <span class="text-white">{{ data.views }} times</span>
        </li>
      </ul>
    </header>

    <div class="py-6 flex gap-4">
      <QuestionVote @voted="handleVoting" :votes="votes" />
      <div>
        <p>
          {{ data.body }}
        </p>

        <Tags class="mt-4" :tags="data.tags" />
      </div>
    </div>
  </div>
</template>
