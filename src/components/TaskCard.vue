<template>
  <div class="card mb-3 task-card" draggable="true" @dragstart="onDragStart">
    <div class="card-body px-3 pt-0">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <h6 class="card-title mb-0 text-truncate pe-2" style="max-width: 85%">
          {{ task.title }}
        </h6>

        <div class="dropdown" @click.stop>
          <button
            class="btn btn-sm btn-link text-muted p-2 touch-target"
            type="button"
            data-bs-toggle="dropdown"
          >
            <i class="bi bi-three-dots-vertical fs-5"></i>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li>
              <a class="dropdown-item" href="#" @click.prevent="editTask"
                >View Details</a
              >
            </li>
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

      <!-- Clickable area -->
      <div class="clickable-content" @click="editTask">
        <p class="card-text text-muted small">
          {{ task.description.substring(0, 60) }}...
        </p>

        <SubtaskChecklist
          v-if="task.subtasks.length > 0"
          :subtasks="task.subtasks"
          class="mb-2"
          @update-subtasks="updateSubtasks"
        />

        <div v-if="task.image" class="mb-2">
          <div class="card">
            <img :src="task.image" class="card-img-top" alt="Task Image" />
          </div>
        </div>

        <div v-if="task.labels.length" class="mb-2">
          <LabelTag
            v-for="label in task.labels"
            :key="label"
            :label="label"
            class="me-1"
          />
        </div>
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
import SubtaskChecklist from "./SubtaskChecklist.vue";

export default {
  components: {
    Avatar,
    LabelTag,
    SubtaskProgress,
    SubtaskChecklist,
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

    const updateSubtasks = (updatedSubtasks) => {
      taskStore.updateSubtasks(props.task.id, updatedSubtasks);
    };

    return {
      onDragStart,
      editTask,
      deleteTask,
      updateSubtasks,
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

/* Make the touch area for three-dots button larger */
.touch-target {
  min-width: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Prevent pointer conflict on drag */
.clickable-content {
  cursor: pointer;
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
}

/* Makes sure icon button and title are aligned */
.touch-target {
  min-width: 36px;
  min-height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Optional: slightly reduce line spacing below title */
.card-text {
  margin-top: 4px;
}
</style>
