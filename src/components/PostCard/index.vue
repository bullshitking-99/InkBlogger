<script lang="ts" setup>
import { PropType, ref } from "vue";
import { Ipost } from "./types";

// 使用泛型参数时，defineProps内部不再接收参数，编译器会自动编译为required
const props = defineProps<{ post: Ipost }>();

// 获取图片的动态路径
const getSrc = (name: string) =>
  new URL(`../../../posts/assets/${name}`, import.meta.url).href;

const isShadow = ref("always");
</script>

<template>
  <router-link :to="`/post/${post.name}`" class="card_container">
    <el-card
      class="post_card"
      :shadow="isShadow"
      @mouseover="isShadow = 'never'"
      @mouseout="isShadow = 'always'"
      :class="{ move_down: isShadow === 'never' }"
      :body-style="{
        padding: '0px',
      }"
    >
      <!-- post封面 -->
      <div class="cover_container">
        <img
          :class="{ scale_up: isShadow === 'never' }"
          :src="getSrc(post.cover) || '../../assets/post/default-vue.png'"
        />
      </div>
      <!-- post信息 -->
      <div class="post_info">
        <h3>{{ post.title }}</h3>
        <span>{{ post.date }}</span>
        <p>{{ post.description }}</p>
        <div class="tags">
          <span v-for="tag in post.tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </el-card>
  </router-link>
</template>

<style scoped lang="scss">
.card_container {
  margin: 20px;
  .post_card {
    // width: 100%;
    width: 350px;
    height: 380px;
    border: 0;
    border-radius: var(--border-radius);
    transition: all 0.3s;
    position: relative;

    .cover_container {
      height: 150px;
      width: 100%;
      font-size: 0;
      border-radius: var(--border-radius);
      overflow: hidden;

      img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        transition: all 0.3s;
      }
    }
    .post_info {
      font-size: 0.85rem;
      padding: 15px;
      max-height: 150px;
      overflow: hidden;

      h3 {
        font-size: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        margin-top: 5px;
        opacity: 0.8;

        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical; //子元素应该被水平或垂直排列
        -webkit-line-clamp: 3; //3行后显示省略号
      }

      .tags {
        position: absolute;
        bottom: 20px;

        span {
          font-weight: bold;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
