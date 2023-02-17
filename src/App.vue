<script lang="ts" setup>
import Navbar from "./components/Navbar/index.vue";
import Footer from "./views/Footer.vue";

import { nextTick, onMounted, provide, ref } from "vue";

// el-scrollbar bug:不设置height不显示 & container设置高度可显示，但无法设置height：100%
const viewPortHeight = document.documentElement.clientHeight - 64;

let pageScrolled = ref(false);
let curScrollTop = ref<number>(0);
// provide() can only be used inside setup().
provide("scrollTop", curScrollTop);

// 监听滚动事件，
function onScroll({ scrollTop }: { scrollTop: number }): void {
  // 向navbar传递阴影控制参数
  pageScrolled.value = scrollTop ? true : false;
  // provide响应式滚动高度
  curScrollTop.value = scrollTop;
  // console.log(curScrollTop.value);
}
</script>

<template>
  <div class="container">
    <!-- 制定导航栏 -->
    <Navbar :pageScrolled="pageScrolled"></Navbar>
    <el-scrollbar :height="viewPortHeight + 'px'" @scroll="onScroll">
      <!-- 各个板块，默认为HOME -->
      <div class="main">
        <Suspense>
          <template #default>
            <router-view></router-view>
          </template>
          <template #fallback>
            <h1>Loading...</h1>
          </template>
        </Suspense>
      </div>

      <!-- footer -->
      <Footer class="footer" />
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.container {
  .main {
    min-height: calc(100vh - 64px);
  }
}
</style>
