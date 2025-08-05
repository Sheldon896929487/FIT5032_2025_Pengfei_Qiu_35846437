<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required>
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required>
      </div>
      <button type="submit">Add Book</button>
    </form>
    <p v-if="message">{{ message }}</p>
    
    <!-- BookList组件显示在AddBook页面下方 -->
    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import BookList from '../components/BookList.vue';

const isbn = ref('');
const name = ref('');
const message = ref('');
const auth = getAuth();
const db = getFirestore();

const addBook = async () => {
  try {
    // 验证用户是否登录
    if (!auth.currentUser) {
      message.value = '请先登录！';
      return;
    }

    const isbnNumber = Number(isbn.value);
    if (isNaN(isbnNumber)) {
      message.value = 'ISBN必须是有效数字';
      return;
    }
    
    // 添加书籍到Firestore
    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value,
      addedBy: auth.currentUser.email,
      addedAt: new Date()
    });
    
    // 清空表单
    isbn.value = '';
    name.value = '';
    message.value = '书籍添加成功！';
    
    console.log('Book added successfully!');
  } catch (error) {
    console.error('Error adding book: ', error);
    message.value = '添加失败: ' + error.message;
  }
};
</script>

<style scoped>
div {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

div {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 10px;
  padding: 10px;
  border-radius: 4px;
}
</style>