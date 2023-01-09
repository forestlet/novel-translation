import { createRouter, createWebHashHistory } from "vue-router";
import Novel from "@/components/Novel.vue";
import Content from "@/components/Content.vue";
import { is_user_agent_mobile } from "@/util/util";

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
        top: is_user_agent_mobile() ? 100 : 72,
        behavior: "smooth",
      };
    }
  },
});
