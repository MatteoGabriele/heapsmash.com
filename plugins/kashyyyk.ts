import { createI18n } from "kashyyyk";

export default defineNuxtPlugin({
  name: "kashyyyk",
  setup() {
    createI18n({
      locale: "en",
      translations: {},
    });
  },
});
