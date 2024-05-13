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
    <main v-if="selectedMenu === 'todos'" class="main-content">
      <div class="content-container">
        <h1 class="main-title">To-Do List</h1>
        <div class="input-section">
          <input
            type="text"
            v-model="newItem"
            placeholder="Add a task here"
            @keyup.enter="addItem"
            class="input-field"
          />
          <button @click="addItem" class="add-button">➕ Add Task</button>
        </div>
        <div class="filter-section">
          <button @click="filter = 'all'" class="filter-btn">All</button>
          <button @click="filter = 'completed'" class="filter-btn">
            Completed
          </button>
          <button @click="filter = 'incomplete'" class="filter-btn">
            Incomplete
          </button>
        </div>
        <ul class="todo-ul">
          <li
            v-for="(item, index) in filteredItems"
            :key="index"
            :class="{ completed: item.completed }"
            class="todo-li"
          >
            <div
              class="item-container"
              :style="{ opacity: item.completed ? 0.5 : 1 }"
            >
              <span>{{ index + 1 }}. {{ item.text }}</span>
              <div class="btn-section">
                <button @click="toggleCompleted(index)" class="action-btn">
                  {{ item.completed ? "Undo" : "✔ Done" }}
                </button>
                <button @click="editItem(index)" class="action-btn">
                  ✏ Edit
                </button>
                <button @click="deleteItem(index)" class="action-btn">
                  🗑 Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
        <button @click="selectedMenu = null" class="back-btn">
          Back to Menu
        </button>
      </div>
    </main>
    <main v-else-if="selectedMenu === 'post'" class="main-content">
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
        <button @click="selectedMenu = null" class="back-btn">
          Back to Menu
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedMenu: null,
      posts: [],
      users: [],
      selectedUser: null,
      newItem: "",
      items: [],
      filter: "all",
    };
  },
  computed: {
    filteredItems() {
      if (this.filter === "completed") {
        return this.items.filter((item) => item.completed);
      } else if (this.filter === "incomplete") {
        return this.items.filter((item) => !item.completed);
      } else {
        return this.items;
      }
    },
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
    addItem() {
      if (this.newItem.trim() !== "") {
        this.items.push({ text: this.newItem, completed: false });
        this.newItem = "";
      }
    },
    editItem(index) {
      const newText = prompt("Edit the item:", this.items[index].text);
      if (newText !== null && newText.trim() !== "") {
        this.items[index].text = newText;
      }
    },
    deleteItem(index) {
      this.items.splice(index, 1);
    },
    toggleCompleted(index) {
      this.items[index].completed = !this.items[index].completed;
    },
  },
  async created() {
    await this.fetchPosts();
    await this.fetchUsers();
  },
};
</script>

<style scoped>
.app {
  font-family: "Arial", sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.menu-nav {
  margin-bottom: 30px;
}

.menu-ul {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
}

.menu-li {
  margin: 0 20px;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.menu-li:hover {
  color: #007bff;
}

.main-content {
  display: flex;
  justify-content: center;
}

.content-container {
  width: 80%;
}

.main-title {
  margin-bottom: 20px;
  font-size: 24px;
  color: #007bff;
}

.input-section {
  margin-bottom: 20px;
}

.input-field {
  width: 70%;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  background-color: #fff;
  color: #333;
  margin-right: 10px;
}

.add-button {
  padding: 12px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #0056b3;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-btn {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.filter-btn:hover {
  background-color: #0056b3;
}

.todo-ul {
  list-style-type: none;
  padding: 0;
}

.todo-li {
  margin-bottom: 15px;
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  color: #333;
}

.completed {
  text-decoration: line-through;
}

.item-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.btn-section {
  display: flex;
  align-items: center;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 5px;
}

.action-btn:hover {
  background-color: #0056b3;
}

.user-select {
  margin-bottom: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
}

.post-ul {
  list-style-type: none;
  padding: 0;
}

.post-li {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.post-title {
  color: #007bff;
  margin-bottom: 10px;
}

.post-body {
  color: #333;
}

.back-btn {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.back-btn:hover {
  background-color: #0056b3;
}

.menu-li {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: pulse 1.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
