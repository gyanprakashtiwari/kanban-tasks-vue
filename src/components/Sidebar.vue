<template>
  <aside class="sidebar bg-dark text-white p-3" style="width: 250px">
    <nav class="nav flex-column">
      <router-link
        to="/dashboard"
        class="nav-link text-white d-flex align-items-center"
      >
        <i class="bi bi-kanban me-2"></i> Dashboard
      </router-link>
      <a href="#" class="nav-link text-white-50 d-flex align-items-center">
        <i class="bi bi-calendar me-2"></i> Calendar
      </a>
      <a href="#" class="nav-link text-white-50 d-flex align-items-center">
        <i class="bi bi-graph-up me-2"></i> Reports
      </a>
      <a href="#" class="nav-link text-white-50 d-flex align-items-center">
        <i class="bi bi-gear me-2"></i> Settings
      </a>
    </nav>
  </aside>
</template>

<style>
.sidebar {
  height: calc(100vh - 56px);
  position: sticky;
  top: 56px;
}

.nav-link {
  padding: 10px 15px;
  border-radius: 4px;
  margin-bottom: 5px;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white !important;
}
</style>
