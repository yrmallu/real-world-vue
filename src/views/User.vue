<template>
  <h1>This is about {{ username }}</h1>
</template>
<script>
export default {
  props: {
    username: {
      type: String,
      required: true,
      default: "Reddy"
    }
  }
};
</script>
