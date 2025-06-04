<template>
  <div>
    <div class="d-flex justify-content-between mb-1">
      <small class="text-muted"
        >Subtasks ({{ completedCount }}/{{ subtasks.length }})</small
      >
      <small class="text-muted">{{ progress }}%</small>
    </div>
    <div class="progress" style="height: 6px">
      <div
        class="progress-bar"
        role="progressbar"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    subtasks: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const completedCount = computed(() => {
      return props.subtasks.filter((st) => st.completed).length;
    });

    const progress = computed(() => {
      if (props.subtasks.length === 0) return 0;
      return Math.round((completedCount.value / props.subtasks.length) * 100);
    });

    return {
      completedCount,
      progress,
    };
  },
};
</script>
