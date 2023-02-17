<script lang="ts" setup>
import { inject, onMounted, Ref, ref, watch } from "vue";
import { searchInsert } from "../../utils/index";

// toc组件 - 标题元素集合
const headElems = ref<NodeListOf<HTMLElement> | any>();

// 获取文档滚动实时高度
let scrollTop: Ref<number>;
// 监听浏览器滚动事件
// window.addEventListener("scroll", function () {
//   scrollTop.value = window.pageYOffset;
// });
// 不可用原生 window api 则使用 inject 获取
scrollTop = inject("scrollTop") as Ref<number>;

// toc操作都得等dom渲染完
onMounted(() => {
  // NodeList是类数组，不具有某些数组方法如 map，为了非要用map我转成数组
  headElems.value = Array.from(
    document.querySelectorAll(".post-body h2,h3,h4")
  );
  // console.log(headElems.value instanceof Array); // false，惊了,是类数组

  // 元素相对文档高度  = elem.getBoundingClientRect() + 当前页面滚动
  // 初始时页面滚动为0
  const relativeHeightArr = headElems.value.map(
    (ele: HTMLElement, index: number) => {
      return Math.floor(ele.getBoundingClientRect().top);
    }
  );

  // 上一个被点亮的toc
  let lastIndex: number;

  watch(scrollTop, (newVal) => {
    // watch的回调参数会自动解包
    // 滚动高度 + 视口高度/2 = 监测点
    const point = Math.floor(
      newVal + document.documentElement.clientHeight / 2
    );
    // 包含监测点的标题序号
    const curIndex = searchInsert(relativeHeightArr, point);
    // 判断亮点切换
    if (lastIndex !== curIndex) {
      // 取消上一个点亮
      document
        .querySelector(`#toc-${lastIndex}`)
        ?.classList.toggle("toc-choosen");

      // 下句不可用，md 不知道为什么 https://developer.mozilla.org/zh-CN/docs/Web/API/Element/classList#%E5%80%BC
      //   headElems.value[lastIndex].classList.toggle("head-choosen");
      //   headElems.value[lastIndex].className = "";

      // 点亮当前
      document
        .querySelector(`#toc-${curIndex}`)
        ?.classList.toggle("toc-choosen");

      //   headElems.value[curIndex].className = "head-choosen";

      // 更新前标题
      lastIndex = curIndex;
    }
  });
});
</script>

<template>
  <!-- toc组件 -->
  <div class="toc remove">
    <ul>
      <!-- 为了防止标题内容一致，给每个标题加上唯一的id -->
      <!-- 为了设置各级标题的不同样式，添加了类，h1标签类为item-1，h2标签类为item-2 -->
      <li
        v-for="(item, index) in headElems"
        :id="`toc-${index}`"
        :class="`item-${item.tagName.charAt(1)}`"
        @click="item.scrollIntoView({ behavior: 'smooth', block: 'center' })"
      >
        {{ item.innerText }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.toc {
  position: fixed;
  transition: all 0.3s ease;
  top: 200px;
  left: 20px;
  border-left: 3px solid #f0e7e7;
  cursor: pointer;
  color: rgba(3, 21, 34, 0.644);

  ul {
    li {
      box-sizing: border-box;
      list-style: none;
      width: 200px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background: transparent;
      transition: all 0.5s ease;
      padding: 2px 0px;
      border-left: 3px solid transparent;
      transform: translateX(-3px);
    }

    li:hover {
      background-color: #ffebeb;
      border-left: 3px solid #cf5659;
    }

    .toc-choosen {
      background-color: rgba(27, 31, 35, 0.1);
      border-left: 3px solid #cf5659;
      color: #476582;
    }

    .item-2 {
      font-weight: 600;
      padding-left: 13px;
    }
    .item-3 {
      padding-left: 23px;
      opacity: 0.95;
    }
    .item-4 {
      padding-left: 33px;
      opacity: 0.9;
    }
  }
}

.head-choosen {
  color: #2c86fc;
}

// 目录消失
@media (max-width: 1245px) {
  .remove {
    transform: translateX(-250px);
  }
}
</style>
