<template>
  <div>
    <div class="row mb-4 px-3">
      <div class="col-12 col-sm-6 mb-2 mb-sm-0 d-flex align-items-center">
        <h3 class="mb-0">Your Tasks</h3>
      </div>

      <div
        class="col-12 col-sm-6 d-flex justify-content-sm-end justify-content-start align-items-center gap-2 flex-wrap"
      >
        <button
          class="btn btn-primary btn-sm rounded-3 px-3 py-2 small"
          @click="showAddTaskModal"
        >
          Add a task
        </button>
        <button
          class="btn btn-outline-dark btn-sm rounded-3 px-3 py-2 small"
          @click="openInviteModal"
        >
          Invite
        </button>
      </div>
    </div>

    <div class="row">
      <TaskColumn
        v-for="column in columns"
        :key="column"
        :title="column"
        :status="column"
        @add-task="showAddTaskModal(column)"
      />
    </div>

    <TaskModal ref="taskModal" :columns="columns" @submit="handleTaskSubmit" />
    <InviteModal ref="inviteModal" @invite="handleInvite" />
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTaskStore } from "../store/tasks";
import TaskColumn from "../components/TaskColumn.vue";
import TaskModal from "../components/TaskModal.vue";
import InviteModal from "../components/InviteModal.vue";
import { TASK_COLUMNS, TASK_STATUS } from "../constants/taskStatus";

export default {
  components: {
    TaskColumn,
    TaskModal,
    InviteModal,
  },
  setup() {
    const taskStore = useTaskStore();

    const columns = computed(() => TASK_COLUMNS);
    const taskModal = ref(null);
    const inviteModal = ref(null);

    const showAddTaskModal = (status = TASK_STATUS.TODO) => {
      taskModal.value?.showModal(status);
    };

    const handleTaskSubmit = (taskData) => {
      taskStore.addTask(taskData);
    };

    const openInviteModal = () => {
      inviteModal.value?.showModal();
    };

    const handleInvite = ({ email, role }) => {
      console.log(`Invited ${email} as ${role}`);
    };

    return {
      columns,
      taskModal,
      inviteModal,
      showAddTaskModal,
      handleTaskSubmit,
      openInviteModal,
      handleInvite,
    };
  },
};
</script>
