<script lang="ts" setup>
import { useRoute } from "vue-router";
// import { VueComponent as post } from "@/../posts/Decorators.md";

const route = useRoute();
const postName = route.params.postName;

// 动态导入md，异步导出一个vue渲染函数
const { VueComponent: post } = await import(`../../posts/${postName}.md`);

// console.log(post);
</script>

<template>
  <h3>this is post - {{ $route.params.postName }}</h3>
  <!-- 异步组件 -->
  <div class="vuepress-markdown-body"><post></post></div>
</template>

<style scoped lang="scss"></style>
