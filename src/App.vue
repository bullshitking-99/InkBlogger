<script lang="ts" setup>
import Navbar from "./components/Navbar/index.vue";
import Footer from "./views/Footer.vue";

import { nextTick, onMounted, ref } from "vue";

// el-scrollbar bug:不设置height不显示 & container设置高度可显示，但无法设置height：100%
const viewPortHeight_value = document.documentElement.clientHeight;
let viewPortHeight = ref(viewPortHeight_value);

// 监听滚动事件，向navbar传递阴影控制参数
let pageScrolled = ref(false);
const scroll = ({ scrollTop }: { scrollTop: number }): void => {
  // vuesax组件的方法是传入一个 dom元素id 以根据其滚动行为调整样式
  pageScrolled.value = scrollTop ? true : false;
};
</script>

<template>
  <el-scrollbar :height="viewPortHeight + 'px'" @scroll="scroll">
    <div class="container">
      <!-- 制定导航栏 -->
      <Navbar :pageScrolled="pageScrolled"></Navbar>

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
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.container {
  .main {
    min-height: calc(100vh - 64px);
  }
}
</style>
