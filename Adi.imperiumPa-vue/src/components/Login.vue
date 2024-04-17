<script setup lang="ts">
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const submitForm = () => {
  console.log(`Username: ${username.value}, Password: ${password.value}`);
};
</script>

<template>
  <div class="card">
    <div class="card-body">
      <h1 class="mb-5 mt-2 text-center">Login</h1>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <input 
            v-model="username" 
            type="text" 
            id="username" 
            class="form-control" 
            placeholder="Codice Fiscale" 
            required
          >
        </div>
        <div class="form-group">
          <input 
            v-model="password" 
            type="password" 
            id="password" 
            class="form-control" 
            placeholder="Password" 
            required
          >
        </div>
        <button type="submit" class="btn btn-primary">Accedi</button>
      </form>
    </div>
  </div>
</template>



<style scoped>
.card {
	max-width: 400px;
	margin: 0 auto;
	margin-top: 100px;
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.719);
	margin-bottom: 120px;
}

.card-body {
	padding: 20px;
}
.form-group {
	margin-bottom: 20px;
}

button {
    display: block;
    margin: auto;
    padding: 10px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}
</style>