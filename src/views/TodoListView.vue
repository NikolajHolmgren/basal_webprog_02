<template>
    <div>
      <input v-model="newItemText" @keyup.enter="addItem" placeholder="Add a new to-do">
      <button @click="addItem">Add</button>
      
      <div v-for="(item, index) in items" :key="item.id">
        <TodoItem 
          :item="item" 
          @update="updateItem(index, $event)" 
          @remove="removeItem(index)"
          @fetch="fetchItem(index)" > 
        </TodoItem>
      </div>
    </div>
  </template>
  
  <script>
  import TodoItem from '@/components/TodoItem.vue';
  import TodoService from '@/services/todoService.js';
  export default {
    components: {
      TodoItem
    },
    data() {
      return {
        newItemText: '',
        items: [/* 
            { text: "Learn Vue.js", completed: false },
            { text: "Build a to-do list app", completed: false } */
            { id: 1, text: "Learn Vue.js", completed: false },
            { id: 2, text: "Build a to-do list app", completed: false }
        ]
      };
    },
    methods: {
      // The .trim() method is a built-in JavaScript string method that removes whitespace from both ends of a string.
      addItem() {
        if (this.newItemText.trim()) { // trim fjerner whitespace fra inputtet
        const newItem = { // item'et får en id og noget tekst
          id: this.items.length + 1,
          text: this.newItemText,
          completed: false
        };
        this.items.push(newItem);
        this.newItemText = '';
        // Save the item to Firestore
        TodoService.addTodoItem(newItem)
          .then(docRef => {
            newItem.id = docRef.id; // Assign Firestore document ID to the item
            this.items.push(newItem);
            this.newItemText = '';
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
      
      }
      },
      updateItem(index, updatedItem) {
        this.items[index] = updatedItem;
      },
      removeItem(index) {
        this.items.splice(index, 1);
      },
      async fetchItem(index) {
      const itemId = this.items[index].id;
      try {
        const item = await TodoService.getTodoItem(itemId);
        this.$set(this.items, index, item);
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    }
    }
  };
  </script>
  