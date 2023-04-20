<template>  
  <v-container class="mt-5">
    <h2 class="text-center mt-5 font-weight-regular">
      عذرا ، الصفحة التي تبحث عنها غير موجودة
    </h2>
  </v-container>
</template>

<script>
import { useDisplay } from "vuetify";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {};
  },

  methods: {},
  computed: {},
};
</script>
