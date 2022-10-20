/**
 * 环境配置文件
 * 一般在企业级项目里面有三个环境
 * 开发环境
 * 测试环境
 * 线上环境
 */
const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi:
      "https://www.fastmock.site/mock/b661c61b05df9b31b689875f86f224ff/api",
  },
  test: {
    baseApi: "//test.future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/b661c61b05df9b31b689875f86f224ff/api",
  },
  pro: {
    baseApi: "//future.com/api",
    mockApi:
      "https://www.fastmock.site/mock/b661c61b05df9b31b689875f86f224ff/api",
  },
};
export default {
  env,
  // mock 的总开关
  mock: true,
  ...EnvConfig[env],
};
