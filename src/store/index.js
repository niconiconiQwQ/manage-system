import { createStore } from "vuex";
export default createStore({
  state: {
    isCollapse: false,
  },
  mutations: {
    updatedIsCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
    },
  },
});
