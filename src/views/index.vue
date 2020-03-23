<template>
  <div>
    <every-day />
    <blog-list />
    <page-tools />
  </div>
</template>
<script>
export default {
  components: {
    everyDay() {
      return import("../components/EveryDay");
    },
    blogList() {
      return import("../components/BlogList");
    },
    pageTools() {
      return import("../components/Page");
    }
  }
};
</script>
<style scoped>
</style>