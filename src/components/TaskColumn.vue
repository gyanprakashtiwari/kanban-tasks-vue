<template>
  <div class="col-md-4">
    <div class="card">
      <div
        class="card-header bg-white d-flex justify-content-between align-items-center"
      >
        <h5 class="mb-0">{{ title }}</h5>
        <span class="badge bg-secondary">{{ tasks.length }}</span>
      </div>
      <div
        class="card-body p-3 kanban-column"
        @dragover.prevent
        @dragenter.prevent
        @drop="onDrop"
      >
        <draggable
          v-model="tasks"
          group="tasks"
          item-key="id"
          class="drag-area"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <TaskCard :task="element" @click="openTaskDetail(element.id)" />
          </template>
        </draggable>

        <button
          class="btn btn-outline-secondary w-100 mt-2"
          @click="openAddTaskModal"
        >
          <i class="bi bi-plus"></i> Add Task
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useTaskStore } from "../store/tasks";
import draggable from "vuedraggable";
import TaskCard from "./TaskCard.vue";

export default {
  components: {
    draggable,
    TaskCard,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const taskStore = useTaskStore();

    const tasks = computed({
      get() {
        return taskStore.tasks.filter((task) => task.status === props.status);
      },
      set(value) {
        // This will be triggered by drag and drop
        value.forEach((task) => {
          taskStore.moveTask(task.id, props.status);
        });
      },
    });

    const onDrop = (e) => {
      const taskId = e.dataTransfer.getData("taskId");
      taskStore.moveTask(taskId, props.status);
    };

    const onDragEnd = () => {
      // Optional: Add any post-drag logic here
    };

    const openAddTaskModal = () => {
      // This would trigger a modal in the parent component
      // For now, we'll just log it
      console.log("Add task to", props.status);
    };

    const openTaskDetail = (taskId) => {
      // This would navigate to the task detail page
      console.log("Open task", taskId);
    };

    return {
      tasks,
      onDrop,
      onDragEnd,
      openAddTaskModal,
      openTaskDetail,
    };
  },
};
</script>

<style>
.kanban-column {
  min-height: 500px;
  background-color: #f8f9fa;
}

.drag-area {
  min-height: 100px;
}
</style>
