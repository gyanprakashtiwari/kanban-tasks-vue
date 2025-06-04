<template>
  <header
    class="bg-white shadow-sm py-3 px-4 d-flex align-items-center"
    style="height: 48px"
  >
    <div class="ms-auto d-flex align-items-center">
      <img
        :src="user.avatar"
        :alt="user.name"
        class="rounded-circle"
        width="32"
        height="32"
      />
    </div>
  </header>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const user = ref({
      name: "Current User",
      avatar: "https://i.pravatar.cc/150?img=5",
    });

    return {
      user,
    };
  },
};
</script>
