import { createRouter, createWebHistory } from "vue-router";
import TodoList from "../components/TodoList.vue";
import PostList from "../components/PostList.vue";
import AlbumList from "../components/Albumlist.vue";
import AlbumDetails from "../components/AlbumDetails.vue";

const routes = [
  { path: "/", redirect: "/Todos" },
  { path: "/todos", component: TodoList },
  { path: "/posts", component: PostList },
  { path: "/albums", component: AlbumList },
  { path: "/albums/:id", component: AlbumDetails },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
