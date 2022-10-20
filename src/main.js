import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store/index";
import "./assets/scss/index.scss";
import './api/mock.js'
import api from './api/api'
// 引入路由
import router from "@/router/index";
// 引入icon图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.config.globalProperties.$api = api;// 全局挂载api
app.use(router).use(store);
app.mount("#app");
