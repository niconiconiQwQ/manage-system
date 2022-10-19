import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/index.scss";
// 引入路由
import router from "@/router/index";
// 引入icon图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.mount("#app");
