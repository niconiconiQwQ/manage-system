import { createStore } from "vuex";
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
      let index = state.tabsList.findIndex(item => item.name === val.name);
      state.tabsList.splice(index, 1);
    }
  },
});
