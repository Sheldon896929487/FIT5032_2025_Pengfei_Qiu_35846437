<template>
  <div class="access-denied">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-4">
          <div class="text-center">
            <h1 class="text-muted mb-4">Access denied</h1>
            <p class="text-muted mb-4">
              Either you are not enrolled in this course or the course does not exist.
            </p>
            <div class="mt-4">
              <router-link to="/login" class="btn btn-link">
                Back to Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script needed for now
</script>

<style scoped>
.access-denied {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  padding-top: 120px;
}
</style>