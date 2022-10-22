import { createApp } from "vue";
import App from "./App.vue";
import store from "@/store/index";
import "./assets/scss/index.scss";
import "./api/mock.js";
import api from "./api/api";
// 引入路由
import router from "@/router/index";
// 引入icon图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.config.globalProperties.$api = api; // 全局挂载api
store.commit("addMenu", router);
function checkRouter(path) {
  let hasCheck = router
    .getRoutes()
    .filter((route) => route.path == path).length;
  if (hasCheck) {
    return true;
  } else {
    return false;
  }
}

router.beforeEach((to, from, next) => {
  // 获取token
  store.commit("getToken");
  const token = store.state.token;
  // 如果没有token且去的不是登录页
  if (!token && to.name !== "login") {
    next({
      name: "login",
    });
    // 有token，但去的是不存在的页面则跳转到home
  } else if (!checkRouter(to.path)) {
    next({
      name: "home",
    });
  } else {
    next();
  }
}),
  app.use(router).use(store);
app.mount("#app");
