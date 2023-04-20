<template>
  <v-app-bar class="d-flex justify-end">
    <template v-slot:image>
      <v-img
        gradient="to top left, rgba(18, 140, 126,.8), rgba(18, 140, 126,.8)"
      ></v-img>
    </template>
    <v-app-bar-nav-icon
      class="text-white d-lg-none"
      variant="text"
      @click.native="toggleSidebar"
    ></v-app-bar-nav-icon>
    <template v-slot:append>
      <v-img aspect-ratio="16/9" width="150" :src="logo"></v-img>
    </template>
  </v-app-bar>
</template>

<script>
import logo from "../assets/matjary_logo_w.png";
import { useDisplay } from "vuetify";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Header",

  setup() {
    const { display } = useDisplay();
  },
  data() {
    return {
      logo: logo,
    };
  },
  computed: {
    ...mapGetters(["getOpen","getUserRole"]),
  },
  methods: {
    toggleSidebar() {
      this.emitter.emit("toggle-sidebar", !this.getOpen);
    },
  },
  mounted() {},
};
</script>
