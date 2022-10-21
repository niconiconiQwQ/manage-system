<template>
  <el-header>
    <div class="l-content">
      <el-button size="small" @click="handleCollapse">
        <el-icon :size="20">
          <Menu></Menu>
        </el-icon>
      </el-button>
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页一定存在, 所以写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current">{{
          current.label
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img :src="getImgSrc('user')" alt="" class="user" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
//动态导入静态资源(如图片动态的展示)
const getImgSrc = (user) => {
  // 原生JS的URL：MDN
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
const store = useStore();
const handleCollapse = () => {
  console.log("点击了");
  store.commit("updatedIsCollapse");
};
const current = computed(() => {
  return store.state.currentMenu;
});
</script>
<style lang="scss" scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #333;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
  .bread :deep(span) {
    color: #fff !important;
    cursor: pointer !important;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
