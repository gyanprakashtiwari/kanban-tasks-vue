<template>
  <div class="app-container">
    <Header />
    <div class="main-content d-flex">
      <Sidebar />
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

.content-wrapper {
  padding: 20px;
  background-color: #f8f9fa;
}
</style>
