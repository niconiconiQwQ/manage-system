<template>
  <div class="common-layout">
    <el-container class="lay-container">
      <CommonAside></CommonAside>
      <el-container class="r-container">
        <CommonHeader></CommonHeader>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import CommonHeader from "@/components/CommonHeader.vue";
import CommonAside from "@/components/CommonAside.vue";
</script>
<style lang="scss" scoped>
.common-layout {
  height: 100%;
  & > .el-container {
    height: 100%;
    .r-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    & > .el-aside {
      background-color: #545c64;
      height: 100%;
    }
  }
}
</style>
