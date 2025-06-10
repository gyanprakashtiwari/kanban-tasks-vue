<template>
  <div class="col-md-4 bg-transparent">
    <div class="card border-0 bg-transparent mb-0">
      <div
        class="card-header border-0 bg-transparent d-flex justify-content-start align-items-center"
      >
        <p class="mb-0 fw-semibold" style="color: #667085; font-size: 12px">
          {{ title }}
        </p>
      </div>
      <div
        class="card-body border-0 p-3 mt-0 pt-1 kanban-column bg-transparent"
        :class="{ 'highlight-column': isDragOver }"
        @dragover.prevent="handleDragOver"
        @dragenter.prevent="handleDragEnter"
        @dragleave="handleDragLeave"
        @drop.prevent="onDrop"
      >
        <draggable
          v-model="tasks"
          group="tasks"
          item-key="id"
          class="drag-area"
          @start="onDragStart"
          @end="onDragEnd"
        >
          <template #item="{ element }">
            <TaskCard
              :task="element"
              @click="openTaskDetail(element.id)"
              draggable="true"
              @dragstart="handleTaskDragStart($event, element.id)"
            />
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
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
    const isDragOver = ref(false);
    const dragCounter = ref(0); // To handle nested drag events

    const tasks = computed({
      get() {
        return taskStore.tasks.filter((task) => task.status === props.status);
      },
      set(value) {
        value.forEach((task) => {
          taskStore.moveTask(task.id, props.status);
        });
      },
    });

    const handleTaskDragStart = (event, taskId) => {
      event.dataTransfer.setData("taskId", taskId);
    };

    const handleDragOver = (e) => {
      e.preventDefault(); // Necessary for the drop to work
      isDragOver.value = true;
    };

    const handleDragEnter = (e) => {
      e.preventDefault();
      dragCounter.value++;
      isDragOver.value = true;
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      dragCounter.value--;
      if (dragCounter.value === 0) {
        isDragOver.value = false;
      }
    };

    const onDrop = (e) => {
      const taskId = e.dataTransfer.getData("taskId");
      if (taskId) {
        taskStore.moveTask(taskId, props.status);
      }
      dragCounter.value = 0;
      isDragOver.value = false;
    };

    const onDragStart = () => {
      isDragOver.value = false;
    };

    const onDragEnd = () => {
      isDragOver.value = false;
    };

    const openTaskDetail = (taskId) => {
      console.log("Open task", taskId);
    };

    return {
      tasks,
      isDragOver,
      handleTaskDragStart,
      handleDragOver,
      handleDragEnter,
      handleDragLeave,
      onDrop,
      onDragStart,
      onDragEnd,
      openTaskDetail,
    };
  },
};
</script>

<style>
.kanban-column {
  min-height: 600px;
  background-color: #f8f9fa;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.drag-area {
  min-height: 600px;
}

@media (max-width: 767.98px) {
  .kanban-column {
    min-height: 200px;
  }
  .drag-area {
    min-height: 100px;
  }
}

.highlight-column {
  background-color: #8ab5f6 !important;
  border: 2px dashed #007bff !important;
  box-shadow: 0 0 10px rgba(0, 123, 255, 0.2);
}
</style>
