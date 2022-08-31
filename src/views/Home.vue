<script lang="ts" setup>
import { reactive, ref } from "vue";
import Avatar from "../components/Avatar/index.vue";
import PostCard from "../components/PostCard/index.vue";
import default_avatar from "../assets/avatar2.png";

const avatar_src = ref(default_avatar);
const avatar_size = ref("300px");

// 维护一个config对象，存储用户基本信息
// 后期由用户导入或从default_demo中获取
const config = ref({
  username: "Terry Lee",
  link: "https://gitee.com/liminghe1999",
  description: "THINK TWICE | CODE ONCE",
});
</script>

<template>
  <div style="height: 30px"></div>
  <Avatar :src="avatar_src" :size="avatar_size"></Avatar>

  <!-- 用户信息展示 -->
  <div class="user_info">
    <h1>{{ config.username }}</h1>
    <h4>
      <a :href="config.link">{{ config.link }}</a>
    </h4>
    <p>{{ config.description }}</p>
  </div>

  <div v-for="i in 100">scroll me</div>
</template>

<style scoped lang="scss">
.user_info {
  margin-top: 40px;
  height: 170px;

  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;

  h1 {
    font-size: 2rem;
  }

  h4 {
    opacity: 0.7;
  }
}
</style>
