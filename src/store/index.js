import { createStore } from "vuex";
import Cookie from 'js-cookie'
export default createStore({
  state: {
    isCollapse: false,
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    menu: [],
    token:'',
  },
  mutations: {
    updatedIsCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, val) {
      if (val.name == "home") {
        state.currentMenu = null;
      } else {
        state.currentMenu = val;
        let index = state.tabsList.findIndex((item) => item.name == val.name);
        index == -1 ? state.tabsList.push(val) : "";
      }
    },
    closeTab(state, val) {
      let index = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(index, 1);
    },
    // 持久化menu数据
    setMenu(state, val) {
      state.menu = val;
      localStorage.setItem("menu", JSON.stringify(val));
    },
    addMenu(state, router) {
      if (!localStorage.getItem("menu")) {
        return;
      }
      let menu = JSON.parse(localStorage.getItem("menu"));
      state.menu = menu;
      // 动态添加路由
      const menuArr = [];
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((el) => {
            let url = `../views/${el.url}.vue`;
            el.component = () => import(url);
            return el;
          });
          menuArr.push(...item.children);
        } else {
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menuArr.push(item);
        }
      });
      menuArr.forEach((item) => {
        router.addRoute("home1", item);
      });
    },
    cleanMenu(state) {
      state.menu = [];
      localStorage.removeItem("menu");
    },
    setToken(state,val) {
      state.token = val;
      Cookie.set('token', val);
    },
    cleanToken(state) {
      state.token = '';
      Cookie.remove('token');
    },
    getToken(state) {
      state.token = state.token || Cookie.get('token')
    }
  },
});
