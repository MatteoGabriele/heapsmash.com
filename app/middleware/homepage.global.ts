export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/" || to.name === "index") {
    const user = useSupabaseUser();

    if (to.query.code) {
      return;
    }

    if (!user.value) {
      return navigateTo({ name: "questions" });
    }
  }
});
