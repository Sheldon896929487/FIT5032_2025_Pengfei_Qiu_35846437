<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    <ul>
      <li v-for="book in books" :key="book.id">
        <div v-if="!book.editing">
          {{ book.name }} - ISBN: {{ book.isbn }}
          <button @click="startEdit(book)" class="edit-btn">Edit</button>
          <button @click="deleteBook(book.id)" class="delete-btn">Delete</button>
        </div>
        <div v-else class="edit-form">
          <input v-model="book.editName" placeholder="Book name" />
          <input v-model="book.editIsbn" placeholder="ISBN" type="number" />
          <button @click="saveEdit(book)" class="save-btn">Save</button>
          <button @click="cancelEdit(book)" class="cancel-btn">Cancel</button>
        </div>
      </li>
    </ul>
    <p v-if="books.length === 0">No books found with ISBN > 1000</p>
    <p v-if="loading">Loading books...</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const books = ref([]);
const loading = ref(true);
const error = ref('');
const db = getFirestore();

const fetchBooks = async () => {
  try {
    loading.value = true;
    error.value = '';
    
    // 创建查询：ISBN > 1000
    const q = query(
      collection(db, 'books'), 
      where('isbn', '>', 1000)
    );
    
    const querySnapshot = await getDocs(q);
    const booksArray = [];
    
    querySnapshot.forEach((doc) => {
      booksArray.push({
        id: doc.id,
        editing: false,
        editName: '',
        editIsbn: '',
        ...doc.data()
      });
    });
    
    books.value = booksArray;
    console.log('Books fetched:', booksArray);
  } catch (err) {
    console.error('Error fetching books: ', err);
    error.value = 'Failed to load books: ' + err.message;
  } finally {
    loading.value = false;
  }
};

const startEdit = (book) => {
  book.editing = true;
  book.editName = book.name;
  book.editIsbn = book.isbn;
};

const cancelEdit = (book) => {
  book.editing = false;
  book.editName = '';
  book.editIsbn = '';
};

const saveEdit = async (book) => {
  try {
    const isbnNumber = Number(book.editIsbn);
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
    }

    // 更新Firestore文档
    const bookRef = doc(db, 'books', book.id);
    await updateDoc(bookRef, {
      name: book.editName,
      isbn: isbnNumber,
      updatedAt: new Date()
    });

    // 更新本地数据
    book.name = book.editName;
    book.isbn = isbnNumber;
    book.editing = false;
    book.editName = '';
    book.editIsbn = '';

    console.log('Book updated successfully!');
  } catch (err) {
    console.error('Error updating book: ', err);
    alert('Failed to update book: ' + err.message);
  }
};

const deleteBook = async (bookId) => {
  if (!confirm('Are you sure you want to delete this book?')) {
    return;
  }

  try {
    // 删除Firestore文档
    const bookRef = doc(db, 'books', bookId);
    await deleteDoc(bookRef);

    // 从本地数组中移除
    books.value = books.value.filter(book => book.id !== bookId);

    console.log('Book deleted successfully!');
  } catch (err) {
    console.error('Error deleting book: ', err);
    alert('Failed to delete book: ' + err.message);
  }
};

onMounted(() => {
  fetchBooks();
});
</script>

<style scoped>
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 15px;
  margin: 10px 0;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 16px;
}

.edit-form {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.edit-form input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
  min-width: 100px;
}

button {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: 5px;
}

.edit-btn {
  background-color: #ffc107;
  color: #000;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.save-btn {
  background-color: #28a745;
  color: white;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

p {
  text-align: center;
  color: #666;
  font-style: italic;
}
</style> 