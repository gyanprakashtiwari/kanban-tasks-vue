<template>
  <div
    class="modal fade"
    id="taskModal"
    tabindex="-1"
    aria-labelledby="taskModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="taskModalLabel">
            {{ isEditMode ? "Edit Task" : "Add New Task" }}
          </h5>
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
              <label for="taskTitle" class="form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="taskTitle"
                v-model="form.title"
                required
              />
            </div>

            <div class="mb-3">
              <label for="taskDescription" class="form-label"
                >Description</label
              >
              <textarea
                class="form-control"
                id="taskDescription"
                rows="3"
                v-model="form.description"
              ></textarea>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label for="taskStatus" class="form-label">Status</label>
                <select
                  class="form-select"
                  id="taskStatus"
                  v-model="form.status"
                >
                  <option
                    v-for="column in columns"
                    :key="column"
                    :value="column"
                  >
                    {{ column }}
                  </option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="taskDueDate" class="form-label">Due Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="taskDueDate"
                  v-model="form.dueDate"
                />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Labels</label>
              <div class="d-flex flex-wrap gap-2">
                <span
                  v-for="label in availableLabels"
                  :key="label"
                  class="badge"
                  :class="
                    form.labels.includes(label)
                      ? 'bg-primary'
                      : 'bg-light text-dark'
                  "
                  style="cursor: pointer"
                  @click="toggleLabel(label)"
                >
                  {{ label }}
                </span>
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label">Subtasks</label>
              <div
                v-for="(subtask, index) in form.subtasks"
                :key="index"
                class="d-flex mb-2"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="form.subtasks[index]"
                />
                <button
                  type="button"
                  class="btn btn-outline-danger ms-2"
                  @click="removeSubtask(index)"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
              <button
                type="button"
                class="btn btn-outline-secondary btn-sm"
                @click="addSubtask"
              >
                <i class="bi bi-plus"></i> Add Subtask
              </button>
            </div>

            <div class="d-flex justify-content-end">
              <button
                type="button"
                class="btn btn-outline-secondary me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary">
                {{ isEditMode ? "Update" : "Create" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { Modal } from "bootstrap";

export default {
  props: {
    task: {
      type: Object,
      default: null,
    },
    columns: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const availableLabels = ["Bug", "Feature", "UI", "Backend", "Urgent"];
    const isEditMode = ref(false);
    const taskModal = ref(null);
    const modalInstance = ref(null);

    const form = ref({
      title: "",
      description: "",
      status: "To Do",
      dueDate: "",
      labels: [],
      subtasks: [],
    });

    const initModal = () => {
      taskModal.value = document.getElementById("taskModal");
      modalInstance.value = new Modal(taskModal.value);
    };

    const showModal = (status = "To Do") => {
      if (!modalInstance.value) initModal();

      resetForm();
      form.value.status = status;
      modalInstance.value.show();
    };

    const hideModal = () => {
      if (modalInstance.value) modalInstance.value.hide();
    };

    const resetForm = () => {
      form.value = {
        title: "",
        description: "",
        status: "To Do",
        dueDate: "",
        labels: [],
        subtasks: [],
      };
      isEditMode.value = false;
    };

    const setupEditMode = (task) => {
      isEditMode.value = true;
      form.value = {
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        labels: [...task.labels],
        subtasks: task.subtasks.map((st) => st.title),
      };
    };

    const toggleLabel = (label) => {
      const index = form.value.labels.indexOf(label);
      if (index === -1) {
        form.value.labels.push(label);
      } else {
        form.value.labels.splice(index, 1);
      }
    };

    const addSubtask = () => {
      form.value.subtasks.push("");
    };

    const removeSubtask = (index) => {
      form.value.subtasks.splice(index, 1);
    };

    const handleSubmit = () => {
      emit("submit", { ...form.value });
      hideModal();
    };

    watch(
      () => props.task,
      (newTask) => {
        if (newTask) {
          setupEditMode(newTask);
          showModal(newTask.status);
        }
      }
    );

    return {
      availableLabels,
      isEditMode,
      form,
      showModal,
      hideModal,
      toggleLabel,
      addSubtask,
      removeSubtask,
      handleSubmit,
    };
  },
};
</script>
