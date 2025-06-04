<template>
  <header class="bg-white shadow-sm py-3 px-4 d-flex align-items-center">
    <!-- <h1 class="h5 mb-0">TaskFlow</h1> -->
    <div class="ms-auto d-flex align-items-center">
      <!-- <button class="btn btn-primary btn-sm me-2" @click="openInviteModal">
        <i class="bi bi-person-plus"></i> Invite
      </button> -->
      <div class="dropdown">
        <button
          class="btn btn-outline-secondary btn-sm dropdown-toggle"
          type="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
        >
          <img
            :src="user.avatar"
            class="rounded-circle me-1"
            width="24"
            height="24"
          />
          {{ user.name }}
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="#">Profile</a></li>
          <li><a class="dropdown-item" href="#">Settings</a></li>
          <li><hr class="dropdown-divider" /></li>
          <li><a class="dropdown-item" href="#">Logout</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import InviteModal from "./InviteModal.vue";

export default {
  components: {
    InviteModal,
  },
  setup() {
    const user = ref({
      name: "Current User",
      avatar: "https://i.pravatar.cc/150?img=5",
    });

    const showInviteModal = ref(false);

    const openInviteModal = () => {
      showInviteModal.value = true;
    };

    return {
      user,
      showInviteModal,
      openInviteModal,
    };
  },
};
</script>
