import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import Projects from "../views/Projects.vue";
import About from "../views/About.vue";
import ViewPost from "@/views/ViewPost.vue";
const history = createWebHashHistory();

//  根据postsConfig遍历posts，导入md文件并转化为vue组件，作为路由组件使用
// let postList: Object[] = [];
// postsConfig.posts.forEach((post) => {
//   postList.push({
//     path: post.name,
//     component: () => import(`@/../posts/${post.name}.md`),
//   });
// });

// const currentPost = () => import(`@/../posts/${$route.params.postName}.md`);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/post/:postName", name: "Post", component: ViewPost },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/about", name: "About", component: About },
];

const router = createRouter({
  history,
  routes,
});

export default router;
