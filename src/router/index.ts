import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Posts from "../views/Posts.vue";
import Projects from "../views/Projects.vue";
import About from "../views/About.vue";

const history = createWebHashHistory();

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/projects", name: "Projects", component: Projects },
  { path: "/about", name: "About", component: About },
];

const router = createRouter({
  history,
  routes,
});

export default router;
