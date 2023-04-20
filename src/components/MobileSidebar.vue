<template>
  <v-navigation-drawer
    class="d-lg-none elevation-3 text-right"
    width="180"
    location="left"
    v-model="isOpen"
    temporary
  >
    <v-list density="compact" class="mt-2" nav>
      <router-link
        v-if="this.getUserRole == 'seller'"
        v-for="[icon, title, route] in links"
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
      <router-link
        v-if="this.getUserRole == 'provider'"
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
        <v-btn @click="logout" color="red-lighten-1" variant="elevated" class="ext-white" block>
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
      links: [
        ["mdi-package-variant-closed", "المنتجات", "products"],
        ["mdi-clipboard-text-outline", "الطلبات", "orders"],
      ],
      adminlinks: [
        ["mdi-package-variant-closed", "المنتجات", "adminproducts"],
        ["mdi-clipboard-text-outline", "الطلبات", "adminorders"],
        ["mdi-account-multiple-outline", "العملاء", "adminsellers"],
      ],
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["getOpen","getUserRole"]),
  },
  methods: {
    ...mapActions(["toggleOpen","logoutUser"]),
    logout() {
      this.logoutUser();
      this.$router.push({
        name: "login",
      });
    },
  },
  watch: {
    isOpen(newVal) {
      this.toggleOpen(newVal)
    }
  },
  mounted() {
    this.emitter.on("toggle-sidebar", (isOpen) => {
      this.isOpen = isOpen;
      this.toggleOpen(isOpen)
    });
  },
};
</script>
