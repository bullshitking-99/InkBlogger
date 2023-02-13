<script lang="ts" setup>
import { PropType, ref } from "vue";
import { InavItem } from "./types";
const props = defineProps({
  title: String,
  openDrawer: Boolean,
  sideBarItem: Array as PropType<InavItem[]>,
});
const emits = defineEmits(["drawerClosed"]);

// drawer
const direction = ref("ttb");
const size = ref("18%");
// 关闭回调，将父组件的openDrawer控制变量重新置为false
const closeHandler = (): void => {
  emits("drawerClosed");
};

// tabs
const tabs_activeName = ref("Home");
</script>

<template>
  <el-drawer
    v-model="openDrawer"
    :size="size"
    :direction="direction"
    :lock-scroll="false"
    modal-class="drawer_modal"
    custom-class="drawer_body"
    :show-close="false"
    @close="closeHandler()"
  >
    <template #header>
      <div style="text-align: center; height: 47px">
        <span style="font-size: 1.4rem; font-weight: 600">{{ title }}</span>
      </div>
    </template>

    <el-tabs v-model="tabs_activeName">
      <el-tab-pane
        v-for="item in sideBarItem"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          <router-link :key="item.name" :to="item.url">
            <span
              style="font-size: 0.95rem; font-weight: 700; user-select: none"
              >{{ item.name }}</span
            >
          </router-link>
        </template>
      </el-tab-pane>
    </el-tabs>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
