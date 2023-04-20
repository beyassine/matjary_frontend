<template>
    <v-btn
      class="font-weight text-white ml-2 main-btn"
      size="large"
      rounded="pill" 
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
.main-btn{
  background-image: linear-gradient(to top left, rgba(18, 140, 126,.8), rgba(18, 140, 126,.8));
}
</style>