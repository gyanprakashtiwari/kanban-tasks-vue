<template>
  <div>
    <h6 class="text-muted small mb-2 ms-1">Subtasks</h6>
    <ul class="list-unstyled ms-1">
      <li
        v-for="(subtask, index) in subtasks"
        :key="subtask.id || index"
        class="d-flex align-items-center py-1"
      >
        <input
          type="checkbox"
          :id="'subtask-' + (subtask.id || index)"
          v-model="localSubtasks[index].completed"
          @change="onCheckboxChange(index)"
          class="form-check-input me-2 custom-checkbox small-checkbox"
        />
        <label
          :for="'subtask-' + (subtask.id || index)"
          class="mb-0 flex-grow-1 text-muted text-xs"
        >
          {{ subtask.title }}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watch, toRefs } from "vue";

export default {
  name: "SubtaskChecklist",
  props: {
    subtasks: {
      type: Array,
      required: true,
      // Expect subtasks as [{id, title, completed}, ...]
    },
  },

  emits: ["update-subtasks"],
  setup(props, { emit }) {
    const { subtasks } = toRefs(props);

    // Create a local reactive copy to use v-model on checkboxes
    const localSubtasks = ref(subtasks.value.map((s) => ({ ...s })));

    // Watch for external changes to subtasks and sync local copy
    watch(
      subtasks,
      (newVal) => {
        localSubtasks.value = newVal.map((s) => ({ ...s }));
      },
      { deep: true }
    );

    const onCheckboxChange = (index) => {
      // Emit updated subtasks array back to parent
      emit("update-subtasks", [...localSubtasks.value]);
    };

    return {
      localSubtasks,
      onCheckboxChange,
    };
  },
};
</script>

<style scoped>
.list-group-item {
  user-select: none;
}
ul.list-unstyled {
  margin: 0;
  padding: 0;
}
.text-xs {
  font-size: 0.75rem;
}

.custom-checkbox:checked {
  background-color: #12b066;
  border-color: #12b066;
}
.small-checkbox {
  width: 0.85rem;
  height: 0.85rem;
  margin-top: 1px;
}
</style>
