import { createApp } from "vue";
import App from "./App.vue";

import { router } from "@/router/router";

import "normalize.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/element-plus.scss'
import "@/style/style.scss";

createApp(App).use(router).mount("#app");
