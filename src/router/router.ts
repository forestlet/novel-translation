import Novel from "@/components/Novel.vue";
import NovelList from "@/components/NovelList.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: NovelList },
  { path: "/novel/:novel_name", component: Novel },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
