<template>
  <div class="user-header">
    <el-button type="primary" @click="handleAdd">+新增</el-button>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="请输入">
        <el-input v-model="formInline.keyword" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="Activity zone"> </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table">
    <el-table :data="list" style="width: 100%" height="520px">
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : '125'"
      />
      <el-table-column fixed="right" label="Operations" min-width="180">
        <template #default="scoped">
          <el-button type="primary" size="small" @click="handleEdit(scoped.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      layout="prev, pager, next"
      :total="config.total"
      @current-change="pageChange"
      class="pager"
    />
  </div>
  <el-dialog
    v-model="dialogVisible"
    :title="action == 'add' ? '新增用户' : '编辑用户'"
    width="35%"
    :before-close="handleClose"
  >
    <el-form :inline="true" :model="formUser" ref="userForm">
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="用户名"
            prop="name"
            :rules="[
              {
                required: true,
                message: '名字是必填项',
              },
            ]"
          >
            <el-input v-model="formUser.name" placeholder="请输入姓名" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="年龄"
            prop="age"
            :rules="[{ required: true, message: '年龄必须是数字' }]"
          >
            <el-input v-model.number="formUser.age" placeholder="请输入年龄" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item
            label="性别"
            prop="sex"
            :rules="[{ required: true, message: '性别是必选项' }]"
          >
            <el-select v-model="formUser.sex" placeholder="请输入性别">
              <el-option label="男" value="0" />
              <el-option label="女" value="1" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="出生日期"
            prop="birth"
            :rules="[{ required: true, message: '出生日期是必选项' }]"
          >
            <el-date-picker
              v-model="formUser.birth"
              type="date"
              label="出生日期"
              placeholder="请输入"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="地址"
        prop="addr"
        :rules="[{ required: true, message: '地址是必选项' }]"
      >
        <el-input v-model="formUser.addr" placeholder="请输入地址" />
      </el-form-item>
      <el-row style="justify-content: flex-end">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script setup>
import {
  ref,
  reactive,
  getCurrentInstance,
  onBeforeMount,
  nextTick,
} from "vue";
const { proxy } = getCurrentInstance();
const userForm = ref();
const list = ref([]);
const action = ref("add");
const config = reactive({
  total: 0,
  page: 1,
  name: "",
});
const formUser = reactive({
  name: "", //添加用户名
  age: "",
  sex: "",
  addr: "",
  birth: "",
});
const dialogVisible = ref(false);
const tableLabel = reactive([
  {
    prop: "name",
    label: "姓名",
  },
  {
    prop: "age",
    label: "年龄",
  },
  {
    prop: "sexLabel",
    label: "性别",
  },
  {
    prop: "birth",
    label: "出生日期",
    width: 200,
  },
  {
    prop: "addr",
    label: "地址",
    width: 320,
  },
]);
const getUserData = async (options) => {
  let res = await proxy.$api.getUserData(options);
  config.total = res.count;
  list.value = res.list.map((item) => {
    item.sexLabel = item.sex === 0 ? "女" : "男";
    return item;
  });
  list.value = res.list;
};
const pageChange = (page) => {
  config.page = page;
  getUserData(config);
};
onBeforeMount(() => {
  getUserData(config);
});
const formInline = reactive({
  keyword: "",
  region: "",
});
// 搜索处理
const handleSearch = () => {
  config.name = formInline.keyword;
  getUserData(config);
};
// 关闭模态框
const handleClose = (done) => {
  ElMessageBox.confirm("确认关闭嘛?")
    .then(() => {
      userForm.value.resetFields();
      done();
    })
    .catch(() => {
      // catch error
    });
};
// 取消模态框
const handleCancel = () => {
  dialogVisible.value = false;
  userForm.value.resetFields();
};
// 编辑
const handleEdit = (row) => {
  console.log(row);
  // 对模态框进行赋值
  action.value = "edit";
  dialogVisible.value = true;
  // 浅拷贝
  row.sex == 0 ? (row.sex = "女") : (row.sex = "男");
  nextTick(() => {
    Object.assign(formUser, row);
  });
};
const handleAdd = () => {
  action.value = "add";
  dialogVisible.value = true;
};
// 格式化时间
const formatTime = (t) => {
  let time = new Date(t);
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  function format(x) {
    return x >= 10 ? x : "0" + x;
  }
  return `${year}-${format(month)}-${format(day)}`;
};
// 添加用户
const onSubmit = () => {
  userForm.value.validate(async (valid) => {
    // 验证通过
    if (valid) {
      // 添加
      if (action.valid == "add") {
        formUser.birth = formatTime(formUser.birth);
        let res = await proxy.$api.addUser(formUser);
        if (res) {
          dialogVisible.value = false;
          userForm.value.resetFields();
          getUserData(config);
        }
      } else {
        // 编辑
        formUser.sex == "男" ? (formUser.sex = 1) : (formUser.sex = 0);
        let res = await proxy.$api.editUser(formUser);
        if (res) {
          dialogVisible.value = false;
          userForm.value.resetFields();
          getUserData(config);
        }
      }
    } else {
      ElMessage({
        message: "请输入正确的信息",
        type: "warning",
      });
    }
  });
};
</script>
<style lang="scss" scoped>
.user-header {
  display: flex;
  justify-content: space-between;
}
.table {
  position: relative;
  .pager {
    position: absolute;
    bottom: -50px;
    right: 0;
  }
}
</style>
