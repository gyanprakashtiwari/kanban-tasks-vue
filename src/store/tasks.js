import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { v4 as uuidv4 } from "uuid";
import { TASK_STATUS, TASK_COLUMNS } from "../constants/taskStatus";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref([
    {
      id: "1",
      title: "Implement drag and drop",
      description: "Add drag and drop functionality between columns",
      status: TASK_STATUS.DOING,
      assignee: { name: "John Doe", avatar: "https://i.pravatar.cc/150?img=1" },
      subtasks: [],
      labels: ["Feature"],
      dueDate: "2023-12-15",
      comments: [
        {
          id: "c1",
          author: "John Doe",
          text: "Started working on this",
          date: "2023-11-01",
        },
      ],
    },
    {
      id: "2",
      title: "Create task modal",
      description: "Design and implement the task creation modal",
      status: TASK_STATUS.TODO,
      assignee: {
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      subtasks: [
        { id: "2-1", title: "Design modal layout", completed: false },
        { id: "2-2", title: "Implement form fields", completed: false },
      ],
      labels: ["UI"],
      dueDate: "2023-12-10",
      comments: [],
    },
    {
      id: "3",
      title: "Setup Pinia store",
      description: "Create the central store for task management",
      status: TASK_STATUS.DONE,
      assignee: {
        name: "Mike Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      subtasks: [
        { id: "3-1", title: "Define store structure", completed: true },
        { id: "3-2", title: "Implement basic CRUD", completed: true },
      ],
      labels: ["Backend"],
      dueDate: "2023-11-30",
      comments: [],
    },
    {
      id: "4",
      title: "Design landing page",
      description: "Create a clean, modern landing page design",
      status: TASK_STATUS.TODO,
      assignee: {
        name: "Alex Green",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      subtasks: [
        { id: "4-1", title: "Sketch layout", completed: false },
        { id: "4-2", title: "Select color scheme", completed: false },
      ],
      labels: ["Design", "UI"],
      dueDate: "2023-12-20",
      comments: [],
    },
    {
      id: "5",
      title: "Integrate payment gateway",
      description: "Setup and test payment integration with Stripe",
      status: TASK_STATUS.DOING,
      assignee: {
        name: "Lily Brown",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      subtasks: [
        { id: "5-1", title: "Create Stripe account", completed: true },
        { id: "5-2", title: "Integrate with backend", completed: false },
        { id: "5-3", title: "Test transactions", completed: false },
      ],
      labels: ["Integration"],
      dueDate: "2023-12-25",
      comments: [],
    },
    {
      id: "6",
      title: "Write unit tests",
      description: "Add unit tests for utility functions",
      status: TASK_STATUS.DONE,
      assignee: {
        name: "Chris Evans",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
      subtasks: [
        { id: "6-1", title: "Test formatDate", completed: true },
        { id: "6-2", title: "Test API helper", completed: true },
      ],
      labels: ["Testing"],
      dueDate: "2023-11-28",
      comments: [],
    },
  ]);

  const columns = ref(TASK_COLUMNS);

  const getTaskById = computed(
    () => (id) => tasks.value.find((task) => task.id === id)
  );

  function addTask(task) {
    tasks.value.push({
      id: uuidv4(),
      ...task,
      subtasks: task.subtasks.map((subtask) => ({
        id: uuidv4(),
        title: subtask,
        completed: false,
      })),
      comments: [],
    });
  }

  function updateTask(id, updatedTask) {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updatedTask };
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  function moveTask(taskId, newStatus) {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  }

  function addComment(taskId, comment) {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.comments.push({
        id: uuidv4(),
        author: "Current User",
        text: comment,
        date: new Date().toISOString().split("T")[0],
      });
    }
  }

  function addSubtask(taskId, subtaskTitle) {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.subtasks.push({
        id: uuidv4(),
        title: subtaskTitle,
        completed: false,
      });
    }
  }
  function updateSubtasks(taskId, updatedSubtasks) {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.subtasks = updatedSubtasks;
    }
  }

  function toggleSubtask(taskId, subtaskId) {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      const subtask = task.subtasks.find((s) => s.id === subtaskId);
      if (subtask) {
        subtask.completed = !subtask.completed;
      }
    }
  }

  return {
    tasks,
    columns,
    getTaskById,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    addComment,
    addSubtask,
    toggleSubtask,
    updateSubtasks,
  };
});
