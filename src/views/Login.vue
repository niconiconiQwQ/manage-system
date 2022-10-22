<template>
  <div>
    <el-form :model="loginForm" class="login-container">
      <h3>系统登录</h3>
      <el-form-item>
        <el-input
          type="input"
          placeholder="请输入账号"
          v-model="loginForm.username"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="loginForm.password"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login"> 登录 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { getCurrentInstance, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const { proxy } = getCurrentInstance();
const loginForm = reactive({
  username: "",
  password: "",
});
const login = async () => {
  let res = await proxy.$api.getMenu(loginForm);
  store.commit("setMenu", res.menu);
  store.commit("addMenu", router);
  store.commit("setToken", res.token);
  router.push({
    name: "home",
  });
};
// vue 中的nextTick 主要用于处理数据动态变化后，DOM还未及时更新的问题；
// 用nextTick可以获取数据更新后最新的DOM变化
/* 1. 点击获取元素的高度 */
/* 2. 点击某按钮，原本一v-show=false隐藏起来的输入框，并获取焦点 */
</script>
<style lang="scss" scoped>
.login-container {
  width: 350px;
  background-color: #fff;
  padding: 30px 30px 15px 30px;
  box-shadow: 0 0 25px #eaeaea;
  border-radius: 15px;
  border: 1px solid #eaeaea;
  margin: 180px auto;
  h3 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
