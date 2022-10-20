<template>
  <el-row class="home" :gutter="20" style="padding-top: 20px">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img src="@/assets/images/user.png" alt="" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间: <span>2022-8-3</span></p>
          <p>上次登录点: <span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px; height: 450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(v, k) in tableLabel"
            :key="k"
            :prop="k"
            :label="v"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div ref="echart" style="height: 280px"></div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script setup>
import { ref, onBeforeMount, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();
const tableData = ref([]);
const countData = ref([]);
const EchartData = ref({});
const tableLabel = ref({
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
});
onBeforeMount(() => {
  getTableData();
  getCountData();
  getEchartData();
});
const getTableData = async () => {
  let res = await proxy.$api.getTableData();
  tableData.value = res;
};
const getCountData = async () => {
  let res = await proxy.$api.getCountData();
  countData.value = res;
};
const getEchartData = async () => {
  let res = await proxy.$api.getEchartsData();
  EchartData.value = res;
  console.log(EchartData.value);
};
// 关于echarts的渲染
const xOptions = ref({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
const pieOptions = ref(
  // 饼状图的配置
  {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  }
);
const userData = ref({
  xData: [],
  series: [],
});
const videoData = ref({
  series: [],
});

const orderData = ref({
  xData: [],
  series: [],
});
</script>
<style lang="scss" scoped>
.home {
  color: #000;
  height: 100%;
  background-color: #ccc;
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      height: 150xp;
      width: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        margin-left: 60px;
        color: #666;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
}
</style>
