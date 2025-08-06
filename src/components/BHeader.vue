<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-between align-items-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item"><a href="#" class="nav-link">Contact us</a></li>
        <li class="nav-item">
          <router-link to="/FireLogin" class="nav-link" active-class="active">FireLogin</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/FireRegister" class="nav-link" active-class="active">FireRegister</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active">Add Book</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/advanced-query" class="nav-link" active-class="active">Advanced Query</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/WeatherCheck" class="nav-link" active-class="active">Get Weather</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Books API</router-link>
        </li>
      </ul>
      
      <!-- Authentication section -->
      <div class="auth-section">
        <div v-if="currentUser" class="d-flex align-items-center">
          <span class="me-3 text-muted">Welcome, {{ currentUser.email }} ({{ userRole }})!</span>
          <button @click="handleLogout" class="btn btn-outline-danger btn-sm">
            Logout
          </button>
        </div>
        <div v-else>
          <router-link to="/FireLogin" class="btn btn-primary btn-sm">
            Login
          </router-link>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'

const router = useRouter()
const currentUser = ref(null)
const userRole = ref("")
const auth = getAuth()

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    userRole.value = user?.displayName || ""
    console.log("Auth state changed:", user?.email, "Role:", user?.displayName)
  })
})

const handleLogout = () => {
  signOut(auth).then(() => {
    console.log("已登出，当前用户：", auth.currentUser)
    currentUser.value = null
    userRole.value = ""
    router.push('/FireLogin')
  })
}
</script>

<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
