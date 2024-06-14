<template>
  <div class="app">
    <header>
      <nav class="menu-nav">
        <ul class="menu-ul">
          <li @click="selectedMenu = 'todos'" class="menu-li">📝 TODOS</li>
          <li @click="selectedMenu = 'post'" class="menu-li">🚀 POST</li>
          <li @click="selectedMenu = 'album'" class="menu-li">📷 ALBUM</li>
        </ul>
      </nav>
    </header>
    <component :is="selectedMenuComponent" v-if="selectedMenu" />
  </div>
</template>

<script>
import Todos from "./components/TodoList.vue";
import Posts from "./components/PostList.vue";
import Album from "./components/AlbumDetails.vue";

export default {
  components: {
    Todos,
    Posts,
    Album,
  },
  data() {
    return {
      selectedMenu: null,
    };
  },
  computed: {
    selectedMenuComponent() {
      if (this.selectedMenu === "todos") return "Todos";
      if (this.selectedMenu === "post") return "Posts";
      if (this.selectedMenu === "album") return "Album";
      return null;
    },
  },
};
</script>

<style scoped>
.app {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.menu-nav {
  background-color: #f0f0f0;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

.menu-ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.menu-li {
  cursor: pointer;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.menu-li:hover {
  background-color: #ccc;
}

.Todos,
.Posts,
.Album {
  margin-top: 20px;
}
</style>
