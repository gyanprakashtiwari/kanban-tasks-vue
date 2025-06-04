<template>
  <img
    :src="user.avatar"
    :alt="user.name"
    class="rounded-circle"
    :style="{
      width: size === 'sm' ? '24px' : '32px',
      height: size === 'sm' ? '24px' : '32px',
    }"
  />
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md"].includes(value),
    },
  },
};
</script>
