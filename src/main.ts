import { createApp } from "vue";
// markdown渲染样式
import "../public/styles/vuepress-theme.css";
// 响应式样式
import "./style.css";
import App from "./App.vue";
import router from "./router/index";

import "element-plus/theme-chalk/dark/css-vars.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 导入代码高亮样式
import hljs from "highlight.js";
import "highlight.js/styles/a11y-dark.css";

// hljs配置
hljs.configure({
  ignoreUnescapedHTML: true, // post页面因为目录遍历node节点而莫名其妙警告
});

const app = createApp(App);

// 全局注册element-icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 注册一个全局指令
// 这会在使用元素的 mounted 和 updated 时都调用
app.directive("highlight", function (el) {
  let elems: HTMLElement[] = el.querySelectorAll("pre code");
  elems.forEach((elem) => {
    hljs.highlightElement(elem);
  });
});

app.use(router).mount("#app");
