<template>
  <div class="app">
    <header>
      <nav v-if="!selectedMenu" class="menu-nav">
        <ul class="menu-ul">
          <li @click="selectedMenu = 'todos'" class="menu-li">📝 TODOS</li>
          <li @click="selectedMenu = 'post'" class="menu-li">🚀 POST</li>
        </ul>
      </nav>
    </header>
    <Todos v-if="selectedMenu === 'todos'" @backToMenu="selectedMenu = null" />
    <Posts
      v-else-if="selectedMenu === 'post'"
      @backToMenu="selectedMenu = null"
    />
  </div>
</template>

<script>
import Todos from "./components/Todos1.vue";
import Posts from "./components/Post1.vue";

export default {
  components: {
    Todos,
    Posts,
  },
  data() {
    return {
      selectedMenu: null,
    };
  },
};
</script>

<style scoped>
.app {
  max-width: 800px;
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
.Posts {
  margin-top: 20px;
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
