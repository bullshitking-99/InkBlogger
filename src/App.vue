<script lang="ts" setup>
import Navbar from "./components/Navbar/index.vue";

import { ref } from "vue";
</script>

<template>
  <el-container>
    <Navbar></Navbar>
    <el-main
      >Main
      <router-view></router-view>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<style scoped lang="scss"></style>
