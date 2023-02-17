<script lang="ts" setup>
import { inject, nextTick, onMounted, Ref, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { posts } from "../../posts/posts.json";
import { searchInsert } from "../utils/index";
import Toc from "../components/Toc/index.vue";

const route = useRoute();
const router = useRouter();
const postName = route.params.postName as string;

// 动态导入md，异步导出html
const post = ref<String>("");
const postCover = ref<string>("");
try {
  const { html } = await import(`../../posts/post/${postName}/${postName}.md`);
  post.value = html;
  // 获取 md 封面图
  const { cover } = posts.filter((post) => post.name === postName)[0];
  postCover.value = cover;
} catch {
  try {
    const { html } = await import(`../../posts/post/${postName}.md`);
    post.value = html;
    const { cover } = posts.filter((post) => post.name === postName)[0];
    postCover.value = cover;
  } catch {
    // if postName不存在，跳转404
    console.log("postName不存在，跳转404");
    router.push("/404");
  }
}

// 获取图片的动态路径
const getSrc = (name: string) =>
  new URL(`../../posts/assets/${name}`, import.meta.url).href;
</script>

<template>
  <div class="container">
    <!-- 作者信息介绍 -->
    <div class="cover">
      <img :src="getSrc(postCover)" alt="cover" />
    </div>
    <!-- 异步组件 -->
    <div
      class="post-body vuepress-markdown-body"
      v-html="post"
      v-highlight
    ></div>

    <!-- toc组件 -->
    <toc></toc>
  </div>
</template>

<style scoped lang="scss">
.container {
  .cover,
  .post-body {
    max-width: 805px;
    margin: 0 auto;
  }
  .cover {
    border-radius: 10px;
    overflow: hidden;
    height: 400px;
    img {
      // img是行内元素，是不能直接设置宽高的
      display: block;
      width: 100%;
      height: 100%;
      // object-fit: cover;
    }
  }
}
</style>
