<template>
  <v-bottom-navigation
    grow
    class="hidden-sm-and-up"
    color="teal lighten-1"
    fixed
    
  >
    <router-link
      v-if="this.getUserRole == 'seller'"
      v-for="[icon, title, route] in links"
      :key="title"
      class="text-decoration-none text-black text-right"
      :to="{
        name: route,
      }"
    >
      <v-btn
        class="text-grey-indigo-4 "
      >
        <v-icon>{{ icon }}</v-icon>
        <h4 class="mb-3">{{ title }}</h4>
      </v-btn>
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
      <v-btn
        class="text-grey-indigo-4 "
      >
        <v-icon>{{ icon }}</v-icon>
        <h4 class="mb-3">{{ title }}</h4>
      </v-btn>
    </router-link>
  </v-bottom-navigation>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BottomNav",
  data() {
    return {
      links: [
        /* ["mdi-view-dashboard-outline", "الرئيسية", "home"], */
        ["mdi-package-variant-closed", "المنتجات", "products"],
        ["mdi-basket-outline", "الطلبات", "orders"],
        /* ["mdi-cog-outline", "الإعدادات", "settings"], */
      ],
      adminlinks: [
        /* ["mdi-view-dashboard-outline", "الرئيسية", "home"], */
        ["mdi-package-variant-closed", "المنتجات", "adminproducts"],
        ["mdi-basket-outline", "الطلبات", "adminorders"],
        /* ["mdi-cog-outline", "الإعدادات", "settings"], */
      ],
    };
  },

  computed: {
    ...mapGetters(["getUserRole"]),
  },
};
</script>
