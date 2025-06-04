<template>
  <div>
    <h5 class="mb-3">Comments</h5>

    <div v-if="comments.length" class="mb-4">
      <div v-for="comment in comments" :key="comment.id" class="card mb-3">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <div class="d-flex align-items-center">
              <img
                :src="
                  'https://i.pravatar.cc/150?img=' +
                  Math.floor(Math.random() * 70)
                "
                class="rounded-circle me-2"
                width="32"
                height="32"
              />
              <strong>{{ comment.author }}</strong>
            </div>
            <small class="text-muted">{{ formatDate(comment.date) }}</small>
          </div>
          <p class="mb-0">{{ comment.text }}</p>
        </div>
      </div>
    </div>
    <p v-else class="text-muted mb-4">No comments yet</p>

    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label for="commentInput" class="form-label">Add a comment</label>
          <textarea
            class="form-control"
            id="commentInput"
            rows="3"
            v-model="newComment"
          ></textarea>
        </div>
        <button
          class="btn btn-primary"
          @click="addComment"
          :disabled="!newComment.trim()"
        >
          Post Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    comments: {
      type: Array,
      required: true,
    },
  },
  emits: ["add-comment"],
  setup(props, { emit }) {
    const newComment = ref("");

    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const addComment = () => {
      if (newComment.value.trim()) {
        emit("add-comment", newComment.value.trim());
        newComment.value = "";
      }
    };

    return {
      newComment,
      formatDate,
      addComment,
    };
  },
};
</script>
