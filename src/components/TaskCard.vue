<template>
  <div class="card mb-3 task-card" draggable="true" @dragstart="onDragStart">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h6 class="card-title mb-0">{{ task.title }}</h6>
        <div class="dropdown">
          <button
            class="btn btn-sm btn-link text-muted p-0"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="editTask"
                >Edit</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#" @click.prevent="deleteTask"
                >Delete</a
              >
            </li>
          </ul>
        </div>
      </div>
      <p class="card-text text-muted small">
        {{ task.description.substring(0, 60) }}...
      </p>

      <div v-if="task.labels.length" class="mb-2">
        <LabelTag
          v-for="label in task.labels"
          :key="label"
          :label="label"
          class="me-1"
        />
      </div>

      <SubtaskProgress :subtasks="task.subtasks" class="mb-2" />

      <div class="d-flex justify-content-between align-items-center">
        <Avatar :user="task.assignee" size="sm" />
        <span class="badge bg-light text-dark small">{{ task.dueDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useTaskStore } from "../store/tasks";
import Avatar from "./Avatar.vue";
import LabelTag from "./LabelTag.vue";
import SubtaskProgress from "./SubtaskProgress.vue";

export default {
  components: {
    Avatar,
    LabelTag,
    SubtaskProgress,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const taskStore = useTaskStore();

    const onDragStart = (e) => {
      e.dataTransfer.setData("taskId", props.task.id);
    };

    const editTask = () => {
      router.push({ name: "TaskDetail", params: { id: props.task.id } });
    };

    const deleteTask = () => {
      if (confirm("Are you sure you want to delete this task?")) {
        taskStore.deleteTask(props.task.id);
      }
    };

    return {
      onDragStart,
      editTask,
      deleteTask,
    };
  },
};
</script>

<style>
.task-card {
  cursor: grab;
  transition: transform 0.1s ease;
}

.task-card:active {
  cursor: grabbing;
  transform: scale(1.02);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.task-card:hover {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
