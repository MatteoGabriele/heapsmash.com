<script setup lang="ts">
import { useI18n } from "kashyyyk";

const { params } = useRoute();
const id = computed<string | undefined>(() => params.slug?.[0]);

const { data, error } = await useFetch(`/api/posts/${id.value}`);

if (error.value) {
  throw createError(error.value);
}

const { data: answers, error: errorAnswers } = await useFetch(
  `/api/posts/${id.value}/answers`
);

if (errorAnswers.value) {
  throw createError(errorAnswers.value);
}

const { data: votes } = useLazyFetch(`/api/posts/${id.value}/votes`, {
  server: false,
});
const { data: comments } = useLazyFetch(`/api/posts/${id.value}/comments`, {
  server: false,
});

const { t } = useI18n({
  en: {
    answers: "0 Answers | 1 Answer | {count} Answers",
  },
});
</script>

<template>
  <section v-if="data" class="p-4 md:px-6" aria-labelledby="question_title">
    <header class="border-b pb-4 border-b-black-600">
      <h2 id="question_title" class="text-2xl">{{ data.title }}</h2>
      <ul class="flex gap-2 mt-2 text-sm text-black-300">
        <li>
          Asked
          <NuxtTime
            v-if="data.created_at"
            class="text-white"
            :datetime="data.created_at"
            date-style="medium"
            time-style="short"
            relative
            title
          />
        </li>
        <li v-if="data.last_activity_at">
          Modified
          <NuxtTime
            class="text-white"
            :datetime="data.last_activity_at"
            date-style="medium"
            time-style="short"
            relative
            title
          />
        </li>
      </ul>
    </header>

    <div class="py-6 px-2 flex gap-4">
      <!-- <PostVote
        @voted="handleVote"
        :votes="data.votes.upvotes - data.votes.downvotes"
        :initial-vote="currentUserVote"
      /> -->
      <div class="flex flex-col gap-6 w-full overflow-auto">
        <PostBody :text="data.body" />

        <div class="flex justify-between gap-4">
          <PostQuickActions :post-id="data.id" />
          <!-- <PostUserCard
            is-post-owner
            :date="data.created_at"
            :user="data.user"
          /> -->
        </div>

        <!-- <Tags v-if="data.question_tags.length" :tags="data.question_tags" /> -->
        <PostComments :comments="comments" v-if="comments" />
      </div>
    </div>

    <!-- <section aria-labelledby="answers_title" class="mt-12 px-2">
      <h2 id="answers_title" class="text-xl">
        {{ t("answers", { count: data.answers.length }) }}
      </h2>
      <ul>
        <li
          v-for="answer in data.answers"
          :key="answer.id"
          :id="`a${answer.id}`"
          class="scroll-m-14"
        >
          <div class="py-6 flex gap-4">
            <div class="flex flex-col items-center gap-4">
              <PostVote
                :votes="answer.votes.upvotes - answer.votes.downvotes"
              />
              <div v-if="data.accepted_answer_id === answer.id">
                <Icon
                  class="text-green-300 text-2xl"
                  name="ph:check-fat-fill"
                />
              </div>
            </div>
            <div class="flex flex-col gap-6 w-full">
              <PostBody :text="answer.body" />

              <div class="flex justify-between gap-4">
                <PostQuickActions :answer-id="answer.id" :post-id="data.id" />
                <PostUserCard
                  is-post-answer
                  :date="answer.created_at"
                  :user="answer.user"
                />
              </div>

              <PostComments
                :comments="answer.comments"
                v-if="answer.comments"
              />
            </div>
          </div>
        </li>
      </ul>
    </section> -->

    <PostAnswerForm class="mt-12" :post-id="data.id" />
  </section>
</template>
