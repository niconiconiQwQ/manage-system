/**
 * 整个项目api的管理
 */
import request from "./request";
export default {
  // home组件 左侧表格数据获取
  getTableData(params) {
    return request({
      url: "/home/getTableData",
      methods: "get",
      data: params,
      mock: true,
    });
  },
  getCountData() {
    return request({
      url: "/home/getCountData",
      methods: "get",
      mock: true,
    });
  },
  getEchartsData() {
    return request({
      url: "/home/getChartData",
      methods: "get",
      mock: true,
    });
  },
  getUserData(params) {
    return request({
      url: "/user/getUser",
      method: "get",
      // 这个mock如果是true，用的就是线上fastmock的数据
      mock: false,
      data: params,
    });
  },
  addUser(params) {
    return request({
      url: "/user/add",
      method: "post",
      mock: false,
      data: params,
    });
  },
  editUser(params) {
    return request({
      url: "/user/edit",
      method: "post",
      mock: false,
      data: params,
    });
  },
};
