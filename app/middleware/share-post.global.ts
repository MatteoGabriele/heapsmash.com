const REDIRECT_PATH = "/questions/";
const PATHS_TO_REDIRECT = ["/q/", "/a/"];

export default defineNuxtRouteMiddleware(async (to) => {
  for (const path of PATHS_TO_REDIRECT) {
    if (to.path.match(path)) {
      return navigateTo(to.path.replace(path, REDIRECT_PATH));
    }
  }
});
