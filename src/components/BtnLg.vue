<template>
    <v-btn
      class="font-weight text-white ml-2"
      size="large"
      rounded="pill" 
      color="green-lighten-1"
    > <h4>
      {{ title }} <v-icon class="ml-1">{{ icon }}</v-icon>
    </h4>
    </v-btn>
</template>
<script>
export default {
  name: "BtnLg",
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
</style>