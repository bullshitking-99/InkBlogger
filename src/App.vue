<script lang="ts" setup>
import Navbar from "./components/Navbar/index.vue";

import { onMounted, ref } from "vue";

// el-scrollbar bug:不设置height不显示 & container设置高度可显示，但无法设置height：100%
const viewPortHeight_value = document.documentElement.clientHeight;
let viewPortHeight = ref(viewPortHeight_value);

// 监听滚动事件，向navbar传递阴影控制参数
let pageScrolled = ref(false);
const scroll = ({ scrollTop }: { scrollTop: number }): void => {
  if (scrollTop > 0) {
    pageScrolled.value = true;
  } else {
    pageScrolled.value = false;
  }
};
</script>

<template>
  <el-scrollbar :height="viewPortHeight + 'px'" @scroll="scroll">
    <el-container class="container">
      <Navbar :pageScrolled="pageScrolled"></Navbar>

      <el-main>
        <Suspense>
          <template #default>
            <router-view></router-view>
          </template>
          <template #fallback>
            <h1>Loading...</h1>
          </template>
        </Suspense>
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
