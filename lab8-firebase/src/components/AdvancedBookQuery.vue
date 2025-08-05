<template>
  <div>
    <h1>Advanced Book Queries</h1>
    
    <!-- 查询控制面板 -->
    <div class="query-controls">
      <h3>Query Controls</h3>
      <div class="control-group">
        <label>ISBN Range:</label>
        <input v-model="minIsbn" type="number" placeholder="Min ISBN" />
        <input v-model="maxIsbn" type="number" placeholder="Max ISBN" />
      </div>
      
      <div class="control-group">
        <label>Sort By:</label>
        <select v-model="sortField">
          <option value="isbn">ISBN</option>
          <option value="name">Name</option>
          <option value="addedAt">Added Date</option>
        </select>
        <select v-model="sortDirection">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      
      <div class="control-group">
        <label>Limit:</label>
        <input v-model="limitCount" type="number" placeholder="Number of results" min="1" max="50" />
      </div>
      
      <button @click="executeQuery" class="query-btn">Execute Query</button>
    </div>

    <!-- 查询结果显示 -->
    <div class="query-results">
      <h3>Query Results ({{ books.length }} books)</h3>
      <div class="query-info">
        <p><strong>Query:</strong> {{ currentQuery }}</p>
        <p><strong>Execution time:</strong> {{ executionTime }}ms</p>
      </div>
      
      <ul>
        <li v-for="book in books" :key="book.id">
          <strong>{{ book.name }}</strong> - ISBN: {{ book.isbn }}
          <br>
          <small>Added: {{ formatDate(book.addedAt) }}</small>
        </li>
      </ul>
      
      <p v-if="books.length === 0" class="no-results">No books found matching the criteria</p>
      <p v-if="loading">Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>

    <!-- 预设查询按钮 -->
    <div class="preset-queries">
      <h3>Preset Queries</h3>
      <button @click="query1" class="preset-btn">Query 1: ISBN > 1000, Sort by Name ASC, Limit 5</button>
      <button @click="query2" class="preset-btn">Query 2: ISBN between 1000-5000, Sort by ISBN DESC, Limit 10</button>
      <button @click="query3" class="preset-btn">Query 3: All books, Sort by Added Date DESC, Limit 3</button>
      <button @click="query4" class="preset-btn">Query 4: ISBN > 2000, Sort by Name ASC, Limit 2</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs 
} from 'firebase/firestore';

const books = ref([]);
const loading = ref(false);
const error = ref('');
const executionTime = ref(0);
const currentQuery = ref('');
const db = getFirestore();

// 查询参数
const minIsbn = ref('');
const maxIsbn = ref('');
const sortField = ref('isbn');
const sortDirection = ref('asc');
const limitCount = ref(10);

const executeQuery = async () => {
  try {
    loading.value = true;
    error.value = '';
    const startTime = Date.now();

    // 构建查询
    let q = collection(db, 'books');
    const constraints = [];

    // 添加 where 条件
    if (minIsbn.value && maxIsbn.value) {
      constraints.push(where('isbn', '>=', Number(minIsbn.value)));
      constraints.push(where('isbn', '<=', Number(maxIsbn.value)));
    } else if (minIsbn.value) {
      constraints.push(where('isbn', '>=', Number(minIsbn.value)));
    } else if (maxIsbn.value) {
      constraints.push(where('isbn', '<=', Number(maxIsbn.value)));
    }

    // 添加 orderBy
    constraints.push(orderBy(sortField.value, sortDirection.value));

    // 添加 limit
    if (limitCount.value > 0) {
      constraints.push(limit(Number(limitCount.value)));
    }

    // 执行查询
    const querySnapshot = await getDocs(query(q, ...constraints));
    
    const booksArray = [];
    querySnapshot.forEach((doc) => {
      booksArray.push({
        id: doc.id,
        ...doc.data()
      });
    });

    books.value = booksArray;
    executionTime.value = Date.now() - startTime;
    
    // 生成查询描述
    currentQuery.value = generateQueryDescription(constraints);
    
    console.log('Query executed successfully:', booksArray);
  } catch (err) {
    console.error('Error executing query: ', err);
    error.value = 'Query failed: ' + err.message;
  } finally {
    loading.value = false;
  }
};

const generateQueryDescription = (constraints) => {
  const parts = [];
  
  constraints.forEach(constraint => {
    if (constraint.type === 'where') {
      parts.push(`${constraint.field} ${constraint.op} ${constraint.value}`);
    } else if (constraint.type === 'orderBy') {
      parts.push(`order by ${constraint.field} ${constraint.direction}`);
    } else if (constraint.type === 'limit') {
      parts.push(`limit ${constraint.value}`);
    }
  });
  
  return parts.join(', ');
};

const formatDate = (timestamp) => {
  if (!timestamp) return 'Unknown';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString();
};

// 预设查询
const query1 = async () => {
  minIsbn.value = '1000';
  maxIsbn.value = '';
  sortField.value = 'name';
  sortDirection.value = 'asc';
  limitCount.value = 5;
  await executeQuery();
};

const query2 = async () => {
  minIsbn.value = '1000';
  maxIsbn.value = '5000';
  sortField.value = 'isbn';
  sortDirection.value = 'desc';
  limitCount.value = 10;
  await executeQuery();
};

const query3 = async () => {
  minIsbn.value = '';
  maxIsbn.value = '';
  sortField.value = 'addedAt';
  sortDirection.value = 'desc';
  limitCount.value = 3;
  await executeQuery();
};

const query4 = async () => {
  minIsbn.value = '2000';
  maxIsbn.value = '';
  sortField.value = 'name';
  sortDirection.value = 'asc';
  limitCount.value = 2;
  await executeQuery();
};

onMounted(() => {
  executeQuery();
});
</script>

<style scoped>
div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.query-controls {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.control-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.control-group label {
  font-weight: bold;
  min-width: 80px;
}

.control-group input,
.control-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 120px;
}

.query-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.query-btn:hover {
  background-color: #0056b3;
}

.query-results {
  margin-bottom: 30px;
}

.query-info {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.query-info p {
  margin: 5px 0;
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

.preset-queries {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

.preset-btn {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
}

.preset-btn:hover {
  background-color: #218838;
}

.no-results {
  text-align: center;
  color: #666;
  font-style: italic;
}

.error {
  color: #dc3545;
  text-align: center;
}

.loading {
  text-align: center;
  color: #007bff;
}
</style> 