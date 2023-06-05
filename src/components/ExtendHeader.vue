<template>
  <v-app-bar :class="bordered == 'true' ? 'd-flex justify-end border' : 'd-flex justify-end' " elevation="0">
    <v-app-bar-nav-icon class="text-white" varian></v-app-bar-nav-icon>
    <template v-slot:append>
      <v-img aspect-ratio="16/9" width="180" :src="logo"></v-img>
    </template>
  </v-app-bar>
</template>

<script>


import logo from "../assets/matjary_logo_g.png";
import { useDisplay } from "vuetify";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ExtendHeader",

  setup() {
    const { display } = useDisplay();
  },
  data() {
    return {
      logo: logo,
    };
  },
  props: {
    bordered: {
      type: String,
    },
  },

  computed: {
    ...mapGetters(["getOpen", "getUserRole"]),
  },
  methods: {
    toggleSidebar() {
      this.emitter.emit("toggle-sidebar", !this.getOpen);
    },
  },
  mounted() { },
};
</script>
  