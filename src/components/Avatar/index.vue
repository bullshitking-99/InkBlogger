<!-- 
    组件说明
        - 自产自销
        - 高斯模糊阴影
        - 上下悬浮
 -->

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps({
  src: String,
  size: String,
});
</script>

<template>
  <div class="container">
    <!-- <el-avatar :src="src" :size="size"></el-avatar> -->

    <span class="avatar">
      <img :src="src" />
      <img :src="src" class="back" />
    </span>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;

  .avatar {
    position: relative;
    // 免去图片后的空白符，使容器大小与图片贴合
    font-size: 0;
    display: inline-block;
    border-radius: 50%;
    width: v-bind("props.size");
    height: v-bind("props.size");

    img {
      display: block;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      transition: all 0.25s ease;
      // &:hover {
      //   transform: scale(1.1);
      // }
    }

    .back {
      opacity: 0.25;
      position: absolute;
      bottom: -30px;
      left: 0;
      // 高斯模糊
      filter: blur(15px);
      z-index: -10;
    }
    // animation - 上下悬浮
    animation: float 4s infinite;
    animation-direction: alternate;
    will-change: top;
    // 使用transform:translate优化动画效果，减少主线程计算次数，消除卡顿感
    @keyframes float {
      from {
        // top:0px - 会卡顿
        transform: translate(0, 0);
      }
      to {
        // top:15px
        transform: translate(0, 15px);
      }
    }
  }
}
</style>
