import questions from "~/assets/static/questions.json";

export default defineRstorePlugin({
  name: "questions",
  setup({ hook }) {
    hook("fetchMany", async (payload) => {
      payload.setResult(questions);
    });
  },
});
