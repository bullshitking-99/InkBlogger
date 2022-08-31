<script lang="ts" setup>
import { ref } from "vue";
import PostCard from "../components/PostCard/index.vue";
const post = ref({
  id: 31232131,
  cover: "",
  title: "金九银十送你一份前端超详细知识手册，看完一定会有收获！",
  date: "2022-8-30",
  description:
    "如果你想要将一个rop-name。例如，这里，这里有一个 post 对如，这里有一个 po有一个 post 对如，这里有一个 post 对象：象的所有属一个 post 对象：象的所有属性都当作 props 传入，你可以使用没有参",
  tags: ["vue", "pinia", "ts"],
});
</script>

<template>
  <h1>Posts</h1>
  <PostCard :post="post"></PostCard>
</template>

<style scoped lang="scss"></style>
