<script lang="ts" setup>
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  link: String,
  img: String,
});

const ProjectTitle = props.title || "My Fantastic Project";
const backgroundImg = props.img || "../../assets/project/default.png";

const router = useRouter();
function goPost(ProjectTitle: String) {
  router.push(`/post/${ProjectTitle}`);
  // if postName.md不存在，将在ViewPost中跳转404
}

// 获取图片的动态路径
const getSrc = (name: string) =>
  new URL(`../../../project/assets/${name}`, import.meta.url).href;
</script>

<template>
  <div class="container">
    <!-- 图片容器 -->
    <div class="imgContainer">
      <img :src="getSrc(backgroundImg)" />

      <!-- 交互区域 -->
      <div class="interactions">
        <div class="link">
          <a :href="link" target="_blank">
            <slot name="link-img">
              <img src="../../assets/project/github.svg" />
            </slot>
          </a>
        </div>
        <div class="title" @click="goPost(ProjectTitle)">
          <span>{{ ProjectTitle }}</span>
        </div>
      </div>
    </div>

    <!-- 文字容器 -->
    <div class="text">
      <slot name="description">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.container {
  width: 350px;
  height: 250px;

  .container:hover {
    .imgContainer {
      border-radius: 6px 40px 6px 40px;

      img {
        transform: scale(1.1);
      }
      .interactions {
        transform: translate(15px, -105px);
      }
    }

    .text {
      opacity: 1;
      box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.3);
      transform: translate(0);
    }
  }

  .imgContainer {
    width: 100%;
    height: 250px;
    border-radius: 6px 20px 6px 20px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.52);
    overflow: hidden;
    cursor: pointer;

    transition: all 0.25s ease;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;

      transition: all 0.25s ease;
    }
    .interactions {
      transition: all 0.25s ease;
      transform: translate(15px, -55px);
      color: rgb(var(--font-color));
      display: flex;

      div {
        height: 35px;
        border-radius: var(--border-radius);
        margin-right: 10px;
        transition: all 0.25s ease;

        &:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px 0 rgba(0, 0, 0, 0.3);
        }
      }
      .link {
        width: 35px;
        background-color: black;
        transition: all 0.25s ease;
        a {
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 50%;
            height: 50%;
          }
        }
      }
      .title {
        font-size: 14px;
        // filter: blur(2px);
        background-color: rgba(var(--background-color), 0.8);
        padding: 8px 12px;
        display: flex;
        align-items: center;
        user-select: none;
      }
    }
  }

  .text {
    width: calc(100% - 30px);
    position: relative;
    z-index: 10; // position:static 是不能调整层级的
    border-radius: 6px 20px 6px 20px;
    background-color: rgb(var(--background-color));
    padding: 15px;
    transition: all 0.25s ease;
    margin: 0 auto;
    opacity: 0;
    margin-top: -50px;
    transform: translateY(45px);
  }
}
</style>
