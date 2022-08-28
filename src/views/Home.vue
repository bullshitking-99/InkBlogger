<script lang="ts" setup>
import { reactive, ref } from "vue";
import Avatar from "../components/Avatar/index.vue";
import default_avatar from "../assets/avatar2.png";

const avatar_src = ref(default_avatar);
const avatar_size = ref("300px");
</script>

<template>
  <div style="height: 50px"></div>
  <Avatar :src="avatar_src" :size="avatar_size"></Avatar>
  <div v-for="i in 100">scroll me</div>
</template>

<style scoped lang="scss"></style>
