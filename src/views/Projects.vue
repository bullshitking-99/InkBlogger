<script lang="ts" setup>
import ProjectCard from "../components/ProjectCard/index.vue";
// project所有信息放在project.json里，图片放在default里
import { projects } from "../../project/project.json";
import { ref } from "vue";

// 为了均匀子盒子的分布，强行使用flex布局
// 在尾行添加几个空盒子,以使得真盒子左对齐
const postLen = ref(projects.length);
// 指定一行的盒子数
const columnNum = ref(3);
</script>

<template>
  <h1 style="font-size: 200%; text-align: center">Projects</h1>
  <p>Here are some projects that I personally developed</p>
  <el-divider />
  <main>
    <ProjectCard
      v-for="project in projects"
      :title="project.title"
      :link="project.link"
      :img="project.img"
    >
      <template #description>
        <span>{{ project.description }}</span>
      </template>
    </ProjectCard>
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
  * {
    margin-bottom: 30px;
  }
  max-width: 70vw;
  margin: 100px auto;
  min-height: 65vh;
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
