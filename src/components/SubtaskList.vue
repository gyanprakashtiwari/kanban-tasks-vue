<template>
  <div class="mb-4">
    <h5 class="mb-3">Subtasks</h5>
    <div v-if="subtasks.length" class="list-group mb-3">
      <div
        v-for="subtask in subtasks"
        :key="subtask.id"
        class="list-group-item"
      >
        <div class="form-check d-flex align-items-center">
          <input
            class="form-check-input me-2"
            type="checkbox"
            :id="`subtask-${subtask.id}`"
            :checked="subtask.completed"
            @change="() => $emit('toggle', subtask.id)"
          />
          <label
            class="form-check-label flex-grow-1"
            :for="`subtask-${subtask.id}`"
            :class="{
              'text-decoration-line-through text-muted': subtask.completed,
            }"
          >
            {{ subtask.title }}
          </label>
        </div>
      </div>
    </div>
    <p v-else class="text-muted">No subtasks</p>

    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Add a new subtask"
        v-model="newSubtask"
        @keyup.enter="addSubtask"
      />
      <button class="btn btn-outline-primary" type="button" @click="addSubtask">
        <i class="bi bi-plus"></i> Add
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    subtasks: {
      type: Array,
      required: true,
    },
  },
  emits: ["toggle", "add"],
  setup(props, { emit }) {
    const newSubtask = ref("");

    const addSubtask = () => {
      if (newSubtask.value.trim()) {
        emit("add", newSubtask.value.trim());
        newSubtask.value = "";
      }
    };

    return {
      newSubtask,
      addSubtask,
    };
  },
};
</script>
