import { ref } from 'vue'

// Global authentication state
const isAuthenticated = ref(false)
const currentUser = ref(null)

export function useAuthStore() {
  const login = (username) => {
    isAuthenticated.value = true
    currentUser.value = username
    // Store in localStorage for persistence
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('currentUser', username)
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    // Remove from localStorage
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('currentUser')
  }

  const checkAuth = () => {
    // Check localStorage on app initialization
    const stored = localStorage.getItem('isAuthenticated')
    const storedUser = localStorage.getItem('currentUser')
    if (stored === 'true' && storedUser) {
      isAuthenticated.value = true
      currentUser.value = storedUser
    }
  }

  return {
    isAuthenticated,
    currentUser,
    login,
    logout,
    checkAuth
  }
}