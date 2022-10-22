<template>
  <el-aside :width="$store.state.isCollapse ? '64px' : '180px'">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台</h3>
      <h3 v-show="!$store.state.isCollapse">后台管理系统</h3>
      <el-menu-item
        v-for="item in noChildren()"
        :key="item.path"
        :index="item.path"
        @click="cliceMenu(item)"
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
            @click="cliceMenu(subItem)"
            ><component class="icons" :is="subItem.icon"></component>
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
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
const asyncList = store.state.menu;
const noChildren = () => {
  return asyncList.filter((item) => !item.children);
};
const hasChildren = () => {
  return asyncList.filter((item) => item.children);
};

const cliceMenu = (item) => {
  store.commit("selectMenu", item);
  router.push({
    name: item.name,
  });
};
onMounted(() => {});
</script>
<style lang="scss" scoped>
.icons {
  width: 18px;
  height: 18px;
}
.el-menu {
  border-right: none;
  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
}
</style>
