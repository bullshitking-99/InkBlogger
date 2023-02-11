<script lang="ts" setup>
import { Sunny, Moon } from "@element-plus/icons-vue";
import { useDark, useToggle } from "@vueuse/core";
import { Ref, ref } from "vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

let theme: Ref<"dark" | "light"> = ref("dark");
</script>

<template>
  <el-switch
    v-model="theme"
    @click="toggleDark()"
    size="large"
    :active-icon="Sunny"
    :inactive-icon="Moon"
    inline-prompt
  ></el-switch>
</template>

<style scoped lang="scss"></style>
