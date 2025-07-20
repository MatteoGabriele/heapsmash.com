<script setup lang="ts">
import { useI18n } from "kashyyyk";

const { params } = useRoute();
const id = computed<string | undefined>(() => params.slug?.[0]);

const { data, error } = await usePostById(id);

if (error.value) {
  throw createError(error.value);
}

const votes = computed<number>(() => {
  if (!data.value?.votes) {
    return 0;
  }

  const { downvotes, upvotes } = data.value.votes;
  return upvotes - downvotes;
});

const { t } = useI18n({
  en: {
    answers: "0 Answers | 1 Answer | {count} Answers",
  },
});
</script>

<template>
  <section v-if="data" class="p-4 md:px-6" aria-labelledby="question_title">
    <header class="border-b pb-4 border-b-neutral-700">
      <h2 id="question_title" class="text-2xl">{{ data.title }}</h2>
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
      <PostVote :votes="votes" />
      <div>
        <PostBody :text="data.body" />
        <Tags v-if="data.tags.length" class="mt-4" :tags="data.tags" />

        <ul class="mt-6 space-y-2" v-if="data.comments.length">
          <li v-for="comment in data.comments" :key="comment.id">
            {{ comment.body }}
          </li>
        </ul>
      </div>
    </div>

    <section aria-labelledby="answers_title" class="mt-12">
      <h2 id="answers_title" class="text-xl">
        {{ t("answers", { count: data.answers.length }) }}
      </h2>
      <ul>
        <li v-for="answer in data.answers" :key="answer.id">
          <div class="py-6 flex gap-4">
            <PostVote :votes="answer.votes.upvotes - answer.votes.downvotes" />
            <div>
              <PostBody :text="answer.body" />
              <ul class="mt-6" v-if="answer.comments.length">
                <li v-for="comment in answer.comments" :key="comment.id">
                  {{ comment.body }}
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>
