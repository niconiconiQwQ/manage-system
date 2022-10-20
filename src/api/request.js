// 引入axios
import axios from "axios";
// 引入配置文件
import config from "../config";
import { ElMessage } from "element-plus";
// 创建一个axios实例对象
const service = axios.create({
  baseURL: config.baseApi,// 统一配置基础 url
  timeout:10000,// 统一设置超时时间
});
// 设置请求拦截(在请求之前做一些事情),传入2参数(成功的回调和失败的回调)
service.interceptors.request.use((req) => {
  // 可以自定义header
  // jwt-token认证
  return req;
}, (error) => {
  Promise.reject(error)
});
// 设置响应拦截(在请求之后做一些事情)
service.interceptors.response.use((res) => {
  // 可做一些统一处理
  const { code, data, msg } = res.data;
  // 根据了后端协商，视情况而定
  if (code == 200) {
    return data;
  } else {
    // 网络请求错误
    ElMessage.error(msg || "网络请求异常");
    return Promise.reject(msg || "网络请求异常");
  }
},(error)=>{});
// 封装的核心函数
function request(options) {
  options.method = options.method || "get";
  if (options.method.toLowerCase() == "get") {
    options.params = options.data;
  }
  // 对mock的处理
  let isMock = config.mock;// 布尔值；设置开启或关闭mock的使用
  if (typeof options.mock !== "undefined") {
    // 如果传入的options中，有自己定义的mock属性，则用你的mock；
    isMock = options.mock;
  }
  // 对线上环境做处理
  if (config.env == "prod") {
    // 线上禁用mock
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }
  return service(options);
}
export default request;
