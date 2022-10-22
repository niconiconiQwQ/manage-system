// 1. 引入mock
import Mock from "mockjs";
// 2. 引入获取mock数据的api
import userApi from "./mockData/user";
import permissionApi from "./mockData/permission";
// 3. 设置拦截请求的地址(mock地址)
// Mock.mock("/home/getData", homeApi.getData);
// 本地获取user的数据
Mock.mock(/user\/getUser/, "get", userApi.getUserList);
Mock.mock(/user\/add/, "post", userApi.createUser);
Mock.mock(/user\/edit/, "post", userApi.editUser);
Mock.mock(/user\/delete/, "get", userApi.deleteUser);
Mock.mock(/permission\/getMenu/, "get", permissionApi.getMenu);
