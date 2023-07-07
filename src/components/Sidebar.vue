<template>
  <v-navigation-drawer
    class="lg-and-down elevation-3 text-right"
    width="180"
    location="right"
  >
    <v-list density="compact" class="mt-2" nav>
      <router-link
        v-for="[icon, title, route] in adminlinks"
        :key="title"
        class="text-decoration-none text-black text-right"
        :to="{
          name: route,
        }"
      >
        <v-list-item class="mb-2" :append-icon="icon">
          <h3>{{ title }}</h3></v-list-item
        >
      </router-link>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn
          color="red-lighten-1"
          variant="elevated"
          class="text-white"
          block
          @click="logout"
        >
          <h3>تسجيل خروج<v-icon class="ml-2">mdi-logout</v-icon></h3></v-btn
        >
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sidebar",
  data() {
    return {
      storeId: this.$route.params.storeId,
      adminlinks: [
        ["mdi-package-variant-closed", "المنتجات", "adminproducts"],
        ["mdi-clipboard-text-outline", "الطلبات", "adminorders"],
        ["mdi-cog-outline", "الإعدادات", "adminsettings"],
      ],
    };
  },
  computed: {
    ...mapGetters(["getUserRole"]),
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logout() {
      this.logoutUser();
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>
