<template>
  <div>
    <div class="row d-flex justify-content-end align-items-center mb-4">
      <div class="col-6">
        <h3 class="mb-0">Your Tasks</h3>
      </div>

      <div class="col-6">
        <div class="d-flex justify-content-end align-items-center gap-2">
          <button class="btn btn-primary btn-sm" @click="showAddTaskModal">
            Add Task
          </button>
          <button class="btn btn-outline-dark btn-sm" @click="openInviteModal">
            Invite
          </button>
        </div>
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
  </div>
</template>

<script>
import { computed } from "vue";
import { useTaskStore } from "../store/tasks";
import TaskColumn from "../components/TaskColumn.vue";
import TaskModal from "../components/TaskModal.vue";

export default {
  components: {
    TaskColumn,
    TaskModal,
  },
  setup() {
    const taskStore = useTaskStore();
    const columns = computed(() => taskStore.columns);

    const showAddTaskModal = (status = "To Do") => {
      // This would show the modal with the specified status
      console.log("Show add task modal for status:", status);
    };

    const handleTaskSubmit = (taskData) => {
      taskStore.addTask(taskData);
    };

    return {
      columns,
      showAddTaskModal,
      handleTaskSubmit,
    };
  },
};
</script>
