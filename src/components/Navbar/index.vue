<script lang="ts" setup>
import { InavItem } from "./types";
import { Edit, MoreFilled } from "@element-plus/icons-vue";
import { computed, Ref } from "@vue/reactivity";
import { onMounted, PropType, ref } from "vue";
import { useRouter } from "vue-router";
import sideBar from "./sideBar.vue";
import themeChanger from "./themeChanger.vue";

const router = useRouter();

// 接收控制参数，使navbar在页面滚动时出现shadow
const props = defineProps({
  pageScrolled: Boolean as PropType<boolean>,
});

// navbar的标题集合
const NavItem: Ref<InavItem[]> = ref([
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Posts",
    url: "/posts",
  },
  {
    name: "Projects",
    url: "/projects",
  },
  {
    name: "About",
    url: "/about",
  },
]);

// 当前指向的页面路由
const active = computed(() => router.currentRoute.value.path);

// 传入sideBar组件的控制参数
const openDrawer: Ref<boolean> = ref(false);
const title = ref("Lee's Blog");
</script>

<template>
  <div
    class="backboard theme-color-changer"
    :class="pageScrolled ? 'nav-shadow' : ''"
  >
    <el-row style="width: 100%" justify="space-between">
      <!-- menuBtn 适用于窄屏幕，召唤sidebar-->
      <el-col :span="6" class="menu-btn nav-item">
        <el-button
          style="margin-left: 20px"
          size="small"
          type="primary"
          plain
          round
          :icon="MoreFilled"
          @click="openDrawer = true"
        >
        </el-button>
      </el-col>

      <!-- sidebar 适用于窄屏幕 -->
      <sideBar
        :openDrawer="openDrawer"
        :title="title"
        :sideBarItem="NavItem"
        @drawerClosed="openDrawer = false"
      ></sideBar>

      <!-- Nav标题 -->
      <el-col :span="6" class="nav-item">
        <router-link to="/" class="theme-color-changer">
          <span>Lee's Blog</span>
        </router-link>
      </el-col>

      <!-- 页面导航按钮 窄屏幕时消失 -->
      <el-col :span="12" class="nav-link">
        <router-link
          v-for="(link, index) in NavItem"
          :key="index"
          :to="active === link.url ? '' : link.url"
          :class="active === link.url ? 'nav-active' : ''"
          class="link-item theme-color-changer"
        >
          {{ link.name }}
        </router-link>
      </el-col>
      <!-- 主题切换组件 -->
      <el-col :span="6" class="nav-item" style="flex-direction: row-reverse">
        <themeChanger style="margin-right: 20px"></themeChanger>
      </el-col>
    </el-row>
  </div>
  <!-- navbar下层的等面积实体 -->
  <div style="min-height: 64px; border-radius: 0 0 24px 24px"></div>
</template>

<style scoped lang="scss">
.backboard {
  box-sizing: border-box;
  z-index: 1000;
  min-height: 64px;
  // background-color: var(--el-color-white);
  border-radius: 0 0 24px 24px;
  position: fixed;
  width: 100%;

  display: flex;
  align-items: center;

  span {
    display: block;
    margin-left: 1.2em;
    width: 90px;
    font-size: 1.17rem;
    font-weight: 600;
  }

  .nav-item {
    display: flex;
    align-items: center;
  }

  .nav-link {
    display: flex;
    justify-content: center;
    align-items: center;

    .link-item {
      padding: 10px 15px;
      font-size: 0.95rem;
      opacity: 0.6;
      font-weight: 700;
      transition: opacity 0.2s ease;
      &:hover {
        opacity: 1;
      }
    }

    .nav-active {
      opacity: 1;
    }
  }

  .theme-changer {
    flex-direction: row-reverse;
  }
}
.nav-shadow {
  box-shadow: var(--el-box-shadow-light);
}
</style>
