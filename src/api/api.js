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
};
