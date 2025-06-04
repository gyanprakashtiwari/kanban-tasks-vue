<template>
  <div class="app-container d-flex">
    <Sidebar />
    <div class="main-content d-flex flex-column flex-grow-1">
      <Header />
      <div class="content-wrapper flex-grow-1">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>

<style>
.app-container {
  min-height: 100vh;
}

.sidebar {
  width: 60px; /* Narrow sidebar */
  background-color: #343a40; /* Dark background */
  position: fixed;
  height: 100vh;
  z-index: 1000;
}

.main-content {
  margin-left: 60px; /* Match sidebar width */
  width: calc(100% - 60px);
}

.content-wrapper {
  padding: 20px;
  background-color: #f8f9fa;
  flex-grow: 1;
}

/* Adjust header to account for sidebar */
header {
  position: sticky;
  top: 0;
  z-index: 100;
}
</style>
