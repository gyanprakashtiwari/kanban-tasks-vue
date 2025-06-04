<template>
  <aside class="sidebar">
    <nav class="nav flex-column align-items-center py-3">
      <router-link
        to="/dashboard"
        class="nav-link text-white d-flex align-items-center justify-content-center"
        style="width: 100%; height: 48px"
        title="Dashboard"
      >
        <i class="bi bi-kanban fs-5"></i>
      </router-link>
      <a
        href="#"
        class="nav-link text-white-50 d-flex align-items-center justify-content-center"
        style="width: 100%; height: 48px"
        title="Calendar"
      >
        <i class="bi bi-calendar fs-5"></i>
      </a>
      <a
        href="#"
        class="nav-link text-white-50 d-flex align-items-center justify-content-center"
        style="width: 100%; height: 48px"
        title="Reports"
      >
        <i class="bi bi-graph-up fs-5"></i>
      </a>
      <a
        href="#"
        class="nav-link text-white-50 d-flex align-items-center justify-content-center"
        style="width: 100%; height: 48px"
        title="Settings"
      >
        <i class="bi bi-gear fs-5"></i>
      </a>
    </nav>
  </aside>
</template>

<style>
.sidebar .nav-link {
  transition: all 0.2s ease;
}

.sidebar .nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.sidebar .nav-link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white !important;
}
</style>
