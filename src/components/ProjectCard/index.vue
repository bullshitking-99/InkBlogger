<script lang="ts" setup></script>

<template>
  <div class="container">
    <!-- 图片容器 -->
    <div class="imgContainer">
      <img src="../../assets/project/default.png" />

      <!-- 交互区域 -->
      <div class="interactions">
        <div class="link"></div>
        <div class="title"><span> GymBookingSystem</span></div>
      </div>
    </div>

    <!-- 文字容器 -->
    <div class="text">
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
* {
  box-sizing: border-box;
}
.container {
  width: 350px;

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
    overflow: hidden;

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

        background-image: url("../../assets/project/github.svg");
        background-size: 50%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: black;

        transition: all 0.25s ease;
      }
      .title {
        font-size: 14px;
        background-color: rgb(var(--background-color));
        padding: 8px 12px;
        display: flex;
        align-items: center;
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
