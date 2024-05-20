<template>
  <main class="main-content">
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
      <button @click="backToMenu" class="back-btn">Back to Menu</button>
    </div>
    <div class="slot-content">
      <slot>Ini adalah tampilan Todos</slot>
    </div>
  </main>
</template>

<script>
export default {
  props: {
    initialItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newItem: "",
      items: this.initialItems,
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
  },
  methods: {
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
    backToMenu() {
      this.$emit("backToMenu");
    },
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

.input-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #45a049;
}

.filter-section {
  text-align: center;
  margin-bottom: 20px;
}

.filter-btn {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 10px;
}

.filter-btn:hover {
  background-color: #0b7dda;
}

.todo-ul {
  list-style-type: none;
  padding: 0;
}

.todo-li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.todo-li:hover {
  background-color: #f0f0f0;
}

.item-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-btn {
  background-color: #e7e7e7;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.action-btn:hover {
  background-color: #ddd;
}

.completed {
  text-decoration: line-through;
}

.back-btn {
  background-color: #ff9800;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #f57c00;
}
</style>
