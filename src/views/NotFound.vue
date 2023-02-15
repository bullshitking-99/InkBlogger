<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="notFound">
    <div class="container">
      <h1>404</h1>
      <p>NOT FOUND</p>
      <el-divider></el-divider>
      <br />
      <p>Dont Go Gentle Into The Night --《Interstellar》</p>
      <el-button size="large" @click="router.push('/')"
        >Return With Me</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.notFound {
  height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 60vw;
    text-align: center;

    h1 {
      font-size: 300%;
    }
    p {
      font-style: italic;
      opacity: 0.5;
    }
    p:last-of-type {
      margin-bottom: 20px;
    }
  }
}
</style>
