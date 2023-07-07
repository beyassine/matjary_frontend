<template>
  <v-app class="app">
    <Header v-if="!this.$route.meta.extend" />
    <Sidebar v-if="!this.$route.meta.extend"/>
    <MobileSidebar v-if="!this.$route.meta.extend"/>
    <v-main :class="this.$route.meta.white? 'white':'main'">      
      <router-view/>      
    </v-main> 
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import BottomNav from "./components/BottomNav";

export default {
  name: "App",
  
  components: {
    Header,
    BottomNav,
    Sidebar,
    MobileSidebar
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions(["initialiseUser"])
  },
  computed: {
    
  },
  beforeMount() {},
  created() {
  },
};
</script>
<style lang="scss">
@import "./scss/variables.scss";
.app {
  font-family: $body-font-family;
}
.white{
  background-color: white; 
}
.main{
  background-color: rgb(245, 245, 245); 
}
.container{
  margin: auto;
  padding: 20px;
}
.row-container{
  background-color: white;
}
.breadcrumb{
  background-color: rgb(230, 230, 230);
  border-bottom: solid;
  border-width: 1px;
  border-color: rgb(210, 210, 210);
}
</style>
