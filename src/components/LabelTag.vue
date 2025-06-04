<template>
  <span class="badge" :class="`bg-${getColor(label)}`">
    {{ label }}
  </span>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    getColor(label) {
      const colors = {
        Bug: "danger",
        Feature: "success",
        UI: "info",
        Backend: "dark",
        Urgent: "warning",
      };
      return colors[label] || "secondary";
    },
  },
};
</script>
