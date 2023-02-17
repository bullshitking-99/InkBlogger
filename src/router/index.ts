import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import Projects from "../views/Projects.vue";
import About from "../views/About.vue";
import ViewPost from "@/views/ViewPost.vue";
import NotFound from "../views/NotFound.vue";
const history = createWebHashHistory();

// vite在开发模式下是路由懒加载的

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/post/:postName", name: "Post", component: ViewPost },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/about", name: "About", component: About },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = createRouter({
  history,
  routes,
});

export default router;
