<script lang="ts" setup>
import { nextTick, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { posts } from "../../posts/posts.json";

const route = useRoute();
const postName = route.params.postName;

// 动态导入md，异步导出一个vue渲染函数
const { html: post } = await import(`../../posts/${postName}.md`);

// 获取 md 封面图
const { cover } = posts.filter((post) => post.name === postName)[0];

// 获取所有标题元素 h1-h4，使用nextTick以在dom生成后调用
const headElem = ref<NodeListOf<HTMLElement> | any>();

// 在一般的setup中是可获取到dom信息的，但这个异步组件比页面中其它组件挂载地还慢
// nextTick(() => {
//   headElem.value = document.querySelectorAll("h1,h2,h3,h4");
// });

// 用mounted试试，是可以的，说明nextTick在Mounted之前啊
onMounted(() => {
  headElem.value = document.querySelectorAll(".container h2,h3,h4");
});

// 调度到宏任务也可以
// setTimeout(getHeadElem, 0);
</script>

<template>
  <div class="container">
    <!-- 作者信息介绍 -->
    <div class="cover"><img :src="cover" alt="cover" /></div>
    <!-- 异步组件 -->
    <div
      class="post-body vuepress-markdown-body"
      v-html="post"
      v-highlight
    ></div>

    <!-- toc组件 -->
    <div class="toc remove" v-if="true">
      <ul>
        <!-- 这里为了设置各级标题的不同样式，添加了类，h1标签类为item-1，h2标签类为item-2 -->
        <li
          v-for="item in headElem"
          :class="`item-${item.tagName.charAt(1)}`"
          @click="item.scrollIntoView({ behavior: 'smooth', block: 'center' })"
        >
          {{ item.innerText }}
        </li>
      </ul>
    </div>
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

  .toc {
    position: fixed;
    transition: all 0.3s ease;
    top: 200px;
    border-left: 3px solid #f0e7e7;
    cursor: pointer;
    color: rgba(3, 21, 34, 0.644);

    ul {
      li {
        box-sizing: border-box;
        list-style: none;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        background: transparent;
        transition: all 0.5s ease;
        padding: 2px 0px;
        border-left: 3px solid transparent;
        transform: translateX(-3px);
      }

      li:hover {
        background-color: #ffebeb;
        border-left: 3px solid #cf5659;
      }

      .item-2 {
        font-weight: 600;
        padding-left: 13px;
      }
      .item-3 {
        padding-left: 23px;
        opacity: 0.9;
      }
      .item-4 {
        padding-left: 33px;
        opacity: 0.7;
      }
    }
  }
}
// 目录消失
@media (max-width: 1250px) {
  .remove {
    transform: translateX(-250px);
  }
}
</style>
