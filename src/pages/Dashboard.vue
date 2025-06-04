<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="mb-0">Your Tasks</h2>
      <button class="btn btn-primary" @click="showAddTaskModal">
        <i class="bi bi-plus"></i> Add Task
      </button>
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
