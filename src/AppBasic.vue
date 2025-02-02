/**
 * by using options
 */
<!-- <script>
  export default {
    data() {
      return {
        name: 'John',
        status: false,
        tasks: ['Task 1', 'Task 2', 'Task 3'],
        link: 'https://www.google.com/'
      }
    },
    methods: {
      toggleStatus() {
        this.status = !this.status;
      }
    }
  }
</script> -->

/**
  by using Composition
 */
<script setup>
import { ref } from 'vue';

  const name = ref('John');
  const status = ref(false);
  const tasks = ref(['Task Composition 1', 'Task Composition 2', 'Task Composition 3']);
  const link = ref('https://www.google.com/');
  const newTask = ref('');

  const toggleStatus = () => {
    status.value = !status.value;
  }

  const addNewTask = () => {
    if(newTask) {
      tasks.value.push(newTask.value);
      newTask.value = '';
    }
  }

  const deleteTask = (index) => {
    tasks.value.splice(index, 1);
  }
</script>

<template>
  <div>
    <h1>Vue Page {{ name }}</h1>
    <p v-if="status">User is active</p>
    <p v-else>User is inactive</p>
    <form @submit.prevent="addNewTask">
      <label for="newTask">Add Task</label>
      <input id="newTask" placeholder="Enter" v-model="newTask" type="text" name="newTask" />
      <button type="submit">Create</button>
    </form>
    <ul>
      <li v-for="(task, index) in tasks" :key="task"><span>{{ task }}</span><button @click="deleteTask(index)">Delete</button></li>
    </ul>
    <!-- <a v-bind:ref="link">Open Google</a> -->
    <a :href="link">Open Google</a>
    <!-- <button v-on:click="toggleStatus">Toggle Status</button> -->
    <button @click="toggleStatus">Toggle Status</button>
  </div>
</template>
