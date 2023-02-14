<script lang="ts" setup>
import { ref } from "vue";
import PostCard from "../components/PostCard/index.vue";
import { posts } from "../../posts/posts.json";

// 为了均匀子盒子的分布，强行使用flex布局
// 在尾行添加几个空盒子,以使得真盒子左对齐
const postLen = ref(posts.length);
// 指定一行的盒子数
const columnNum = ref(4);
</script>

<template>
  <h1 style="font-size: 200%; text-align: center">Posts</h1>
  <p>
    These are my experiences and discoveries in the process of study and
    practice
  </p>
  <el-divider />
  <main>
    <PostCard v-for="post in posts" :post="post" :key="post.name"></PostCard>
    <div
      class="fake-card"
      v-for="item in columnNum - (postLen % columnNum)"
      v-if="postLen % columnNum > 0"
    ></div>
  </main>
</template>

<style scoped lang="scss">
p {
  font-size: 100%;
  text-align: center;
  font-style: italic;
  opacity: 0.5;
}
main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .fake-card {
    // 规格和真盒子一样
    margin: 20px;
    width: 100%;
    max-width: 350px;
    visibility: hidden;
  }
}
</style>
