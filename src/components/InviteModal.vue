<template>
  <div
    class="modal fade"
    id="inviteModal"
    tabindex="-1"
    aria-labelledby="inviteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="inviteModalLabel">Invite Team Members</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="emailInput"
                v-model="email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="roleSelect" class="form-label">Role</label>
              <select class="form-select" id="roleSelect" v-model="role">
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-outline-secondary me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">Send Invite</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { Modal } from "bootstrap";

export default {
  setup(_, { emit }) {
    const email = ref("");
    const role = ref("member");
    const modalInstance = ref(null);

    const showModal = () => {
      if (!modalInstance.value) {
        const modalElement = document.getElementById("inviteModal");
        modalInstance.value = new Modal(modalElement);
      }
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) {
        modalInstance.value.hide();
      }
    };

    const handleSubmit = () => {
      emit("invite", {
        email: email.value,
        role: role.value,
      });
      email.value = "";
      role.value = "member";
      hideModal();
    };

    return {
      email,
      role,
      showModal,
      hideModal,
      handleSubmit,
    };
  },
};
</script>
