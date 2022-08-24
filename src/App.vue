<script lang="ts" setup>
import Navbar from "./components/Navbar/index.vue";

import { onMounted, ref } from "vue";

// el-scrollbar bug:不设置height不显示

const viewPortHeight_value = document.documentElement.clientHeight;
let viewPortHeight = ref(viewPortHeight_value);
</script>

<template>
  <el-scrollbar :height="viewPortHeight + 'px'">
    <el-container class="container">
      <Navbar></Navbar>
      <el-main> <router-view></router-view> </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
