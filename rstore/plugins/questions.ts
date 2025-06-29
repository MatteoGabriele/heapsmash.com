import questions from "~/assets/static/questions.json";

export default defineRstorePlugin({
  name: "questions",
  setup({ hook }) {
    hook("fetchMany", async (payload) => {
      payload.setResult(questions);
    });

    hook("fetchFirst", async (payload) => {
      if (!payload.key) {
        return;
      }

      const item = questions.find(
        (question) => String(question.id) === String(payload.key),
      );

      if (!item) {
        return;
      }

      payload.setResult(item);
    });
  },
});
