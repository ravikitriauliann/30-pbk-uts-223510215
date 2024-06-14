<template>
  <main class="main-content">
    <div class="content-container">
      <h1 class="main-title">POST</h1>
      <select v-model="selectedUser" class="user-select">
        <option disabled value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
      <ul v-if="selectedUser" class="post-ul">
        <li v-for="post in filteredPosts" :key="post.id" class="post-li">
          <h2 class="post-title">{{ post.title }}</h2>
          <p class="post-body">{{ post.body }}</p>
        </li>
      </ul>
    </div>
    <div class="slot-content">
      <slot>Ini adalah tampilan Post</slot>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  props: {
    initialPosts: {
      type: Array,
      default: () => [],
    },
    initialUsers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      posts: this.initialPosts,
      users: this.initialUsers,
      selectedUser: null,
    };
  },
  computed: {
    filteredPosts() {
      return this.posts.filter((post) => post.userId === this.selectedUser);
    },
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        this.posts = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    backToMenu() {
      this.$emit("backToMenu");
    },
  },
  async created() {
    if (this.initialPosts.length === 0) {
      await this.fetchPosts();
    }
    if (this.initialUsers.length === 0) {
      await this.fetchUsers();
    }
  },
};
</script>

<style scoped>
.content-container {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.user-select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.post-ul {
  list-style-type: none;
  padding: 0;
}

.post-li {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-title {
  color: #333;
  margin-bottom: 10px;
}

.post-body {
  color: #666;
}

.back-btn {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
}

.back-btn:hover {
  background-color: #f57c00;
}

.slot-content {
  margin-top: 20px;
}
</style>
