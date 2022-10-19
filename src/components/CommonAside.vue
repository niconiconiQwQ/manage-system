<template>
  <el-aside width="200px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      :collapse="false"
    >
      <el-menu-item
        v-for="item in noChildren()"
        :key="item.path"
        :index="item.path"
      >
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>
      <el-sub-menu
        index="1"
        v-for="item in hasChildren()"
        :key="item.path"
        :index="item.path"
      >
        <template #title>
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, subIndex) in item.children"
            :key="subIndex"
            ><component class="icons" :is="subItem.icon"></component>
            <span>{{ item.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import { onMounted } from "vue";
const list = [
  {
    path: "/user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "UserManage/UserManage",
  },
  {
    label: "其他",
    icon: "location",
    path: "other",
    children: [
      {
        path: "/page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "Other/PageOne",
      },
      {
        path: "/page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "Other/PageTwo",
      },
    ],
  },
];
const noChildren = () => {
  return list.filter((item) => !item.children);
};
const hasChildren = () => {
  return list.filter((item) => item.children);
};
onMounted(() => {
  console.log(noChildren());
});
</script>
<style lang="scss" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
}
</style>
