<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :effect="$route.name == tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}</el-tag
    >
  </div>
</template>
<script setup>
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const router = useRouter(),
  route = useRoute(),
  store = useStore();
const tags = store.state.tabsList;
const changeMenu = (tag) => {
  router.push({
    name: tag.name,
  });
};
const handleClose = (tag, index) => {
  let len = tags.length - 1;
  // 处理vuex中的tabslist
  store.commit("closeTab", tag);
  // 叉的那个name和当前name不相等
  if (tag.name !== route.name) return;
  // 如果叉的是最后一个tab
  if (len === index) {
    router.push({
      name: tags[index - 1].name, // 跳到前一个
    });
  } else {
    router.push({
      name: tags[index].name,
    });
  }
};
</script>
<style lang="scss" scoped>
.tags {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
