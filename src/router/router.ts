import Novel from "@/components/Novel.vue";
import Content from "@/components/Content.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: Content },
  { path: "/novel/:novel_name", component: Novel },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 60,
        behavior: "smooth",
      };
    }
  },
});
