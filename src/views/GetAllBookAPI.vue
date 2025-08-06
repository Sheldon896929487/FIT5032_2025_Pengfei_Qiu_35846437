<template>
  <div class="container">
    <h1>Get All Books API</h1>
    
    <div class="controls">
      <button @click="fetchAllBooks" class="fetch-btn">Fetch All Books</button>
      <button @click="clearBooks" class="clear-btn">Clear</button>
    </div>
    
    <div v-if="loading" class="loading">
      Loading books...
    </div>
    
    <div v-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-if="books.length > 0" class="books-container">
      <h2>All Books ({{ books.length }} books found)</h2>
      <div class="json-display">
        <pre>{{ JSON.stringify(books, null, 2) }}</pre>
      </div>
    </div>
    
    <div v-else-if="!loading && !error" class="no-books">
      No books found. Click "Fetch All Books" to load data.
    </div>
  </div>
</template>

<script>
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export default {
  name: 'GetAllBookAPI',
  data() {
    return {
      books: [],
      loading: false,
      error: ''
    };
  },
  mounted() {
    this.fetchAllBooks();
  },
  methods: {
    async fetchAllBooks() {
      try {
        this.loading = true;
        this.error = '';
        
        const db = getFirestore();
        const booksCollection = collection(db, 'books');
        const querySnapshot = await getDocs(booksCollection);
        
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        this.books = booksArray;
        console.log('All books fetched:', booksArray);
      } catch (err) {
        console.error('Error fetching books:', err);
        this.error = 'Failed to fetch books: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
    clearBooks() {
      this.books = [];
      this.error = '';
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  justify-content: center;
}

.fetch-btn, .clear-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.fetch-btn {
  background-color: #28a745;
  color: white;
}

.fetch-btn:hover {
  background-color: #218838;
}

.clear-btn {
  background-color: #dc3545;
  color: white;
}

.clear-btn:hover {
  background-color: #c82333;
}

.loading {
  text-align: center;
  color: #007bff;
  font-size: 18px;
  margin: 20px 0;
}

.error {
  text-align: center;
  color: #dc3545;
  font-weight: bold;
  margin: 20px 0;
  padding: 10px;
  background-color: #f8d7da;
  border-radius: 4px;
}

.books-container {
  margin-top: 20px;
}

h2 {
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

.json-display {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
}

.json-display pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.no-books {
  text-align: center;
  color: #666;
  font-style: italic;
  margin: 20px 0;
}
</style>
