<template>
  <aside
    class="sidebar d-flex flex-column justify-content-between align-items-center py-3"
  >
    <!-- Top C Icon -->
    <div class="icon-group d-flex flex-column gap-3">
      <div class="icon-box brand-icon">
        <span class="brand-text">C</span>
      </div>

      <!-- Sidebar icons 2-7 -->
      <div
        v-for="(icon, index) in sidebarIcons.slice(0, 5)"
        :key="'icon-' + index"
        class="icon-box"
      >
        <img :src="icon" alt="sidebar icon" class="icon-image" />
      </div>
    </div>

    <!-- Bottom icon (sidebar-8.png) -->
    <div class="icon-group d-flex flex-column gap-3 mb-2">
      <div class="icon-box">
        <img :src="sidebarIcons[5]" alt="sidebar icon" class="icon-image" />
      </div>
      <div class="icon-box">
        <img :src="sidebarIcons[6]" alt="sidebar icon" class="icon-image" />
      </div>
    </div>
  </aside>
</template>

<script>
import icon2 from "../assets/icons/sidebar-2.png";
import icon3 from "../assets/icons/sidebar-3.png";
import icon4 from "../assets/icons/sidebar-4.png";
import icon5 from "../assets/icons/sidebar-5.png";
import icon6 from "../assets/icons/sidebar-6.png";
import icon7 from "../assets/icons/sidebar-7.png";
import icon8 from "../assets/icons/sidebar-8.png";

export default {
  data() {
    return {
      sidebarIcons: [icon2, icon3, icon4, icon5, icon6, icon7, icon8], // 7 icons from 2 to 8
    };
  },
};
</script>

<style scoped>
.sidebar {
  width: 60px;
  background-color: #ffffff;
  position: fixed;
  height: 100vh;
  z-index: 1000;
}

.icon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-box {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
}

.icon-box:hover {
  background-color: #f0f0f0;
}

.icon-image {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: grayscale(100%) brightness(50%);
}

.brand-icon {
  background-color: #2cba7a;
}

.brand-text {
  color: #02532f;
  /* font-weight: bold; */
  font-size: 20px;
  font-family: sans-serif;
}
</style>
