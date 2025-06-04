<template>
  <div v-if="task" class="task-detail-container">
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h2 class="mb-1">{{ task.title }}</h2>
            <div class="d-flex align-items-center mb-3">
              <span
                class="badge me-2"
                :class="`bg-${getStatusColor(task.status)}`"
              >
                {{ task.status }}
              </span>
              <small class="text-muted"
                >Created on {{ formatDate(task.dueDate) }}</small
              >
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              Actions
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
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a class="dropdown-item" href="#" @click.prevent="changeStatus">
                  Move to <i class="bi bi-chevron-right float-end"></i>
                </a>
                <ul class="dropdown-menu dropdown-submenu">
                  <li v-for="status in availableStatuses" :key="status">
                    <a
                      class="dropdown-item"
                      href="#"
                      @click.prevent="updateStatus(status)"
                    >
                      {{ status }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="row mb-4">
          <div class="col-md-8">
            <div class="mb-4">
              <h5 class="mb-2">Description</h5>
              <p class="text-muted">
                {{ task.description || "No description provided" }}
              </p>
            </div>

            <SubtaskList
              :subtasks="task.subtasks"
              @toggle="toggleSubtask"
              @add="addSubtask"
            />

            <CommentSection
              :comments="task.comments"
              @add-comment="addComment"
            />
          </div>

          <div class="col-md-4">
            <div class="card mb-3">
              <div class="card-body">
                <h5 class="card-title mb-3">Task Details</h5>

                <div class="mb-3">
                  <h6 class="small text-muted mb-1">Assignee</h6>
                  <div class="d-flex align-items-center">
                    <Avatar :user="task.assignee" />
                    <span class="ms-2">{{ task.assignee.name }}</span>
                  </div>
                </div>

                <div class="mb-3">
                  <h6 class="small text-muted mb-1">Due Date</h6>
                  <p class="mb-0">{{ formatDate(task.dueDate) }}</p>
                </div>

                <div>
                  <h6 class="small text-muted mb-1">Labels</h6>
                  <div v-if="task.labels.length" class="d-flex flex-wrap gap-2">
                    <LabelTag
                      v-for="label in task.labels"
                      :key="label"
                      :label="label"
                    />
                  </div>
                  <p v-else class="text-muted small mb-0">No labels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "../store/tasks";
import Avatar from "../components/Avatar.vue";
import LabelTag from "../components/LabelTag.vue";
import SubtaskList from "../components/SubtaskList.vue";
import CommentSection from "../components/CommentSection.vue";

export default {
  components: {
    Avatar,
    LabelTag,
    SubtaskList,
    CommentSection,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const taskStore = useTaskStore();

    const task = computed(() => taskStore.getTaskById(props.id));
    const availableStatuses = computed(() => taskStore.columns);

    const getStatusColor = (status) => {
      const colors = {
        "To Do": "secondary",
        Doine: "warning",
        Done: "success",
      };
      return colors[status] || "primary";
    };

    const formatDate = (dateString) => {
      if (!dateString) return "No due date";
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const editTask = () => {
      // This would open the edit modal
      console.log("Edit task", props.id);
    };

    const deleteTask = () => {
      if (confirm("Are you sure you want to delete this task?")) {
        taskStore.deleteTask(props.id);
        router.push({ name: "Dashboard" });
      }
    };

    const updateStatus = (status) => {
      taskStore.moveTask(props.id, status);
    };

    const toggleSubtask = (subtaskId) => {
      taskStore.toggleSubtask(props.id, subtaskId);
    };

    const addSubtask = (title) => {
      taskStore.addSubtask(props.id, title);
    };

    const addComment = (commentText) => {
      taskStore.addComment(props.id, commentText);
    };

    onMounted(() => {
      if (!task.value) {
        // In a real app, we might fetch the task here if it's not in the store
        console.warn("Task not found:", props.id);
      }
    });

    return {
      task,
      availableStatuses,
      getStatusColor,
      formatDate,
      editTask,
      deleteTask,
      updateStatus,
      toggleSubtask,
      addSubtask,
      addComment,
    };
  },
};
</script>

<style>
.dropdown-submenu {
  position: absolute;
  left: 100%;
  top: 0;
  margin-top: -1px;
  display: none;
}

.dropdown-menu > li:hover > .dropdown-submenu {
  display: block;
}
</style>
