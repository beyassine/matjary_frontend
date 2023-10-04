<template>
  <v-navigation-drawer class="d-lg-none elevation-3 text-right" width="200" location="left" v-model="isOpen" temporary>
    <v-list v-if="this.lang == 'ar'" density="compact" class="mt-2" nav>
      <router-link v-for="[icon, title, route] in aradminlinks" :key="title"
        class="text-decoration-none text-black text-right" :to="{
          name: route,
        }">
        <v-list-item class="mb-2" :append-icon="icon">
          <h3>{{ title }}</h3>
        </v-list-item>
      </router-link>
    </v-list>
    <v-list v-if="this.lang == 'fr'" density="compact" class="mt-2" nav>
      <router-link v-for="[icon, title, route] in fradminlinks" :key="title" class="text-decoration-none text-black" :to="{
        name: route,
      }">
        <v-list-item class="mb-2" :prepend-icon="icon">
          <h3>{{ title }}</h3>
        </v-list-item>
      </router-link>
    </v-list>
    <template v-slot:append>
      <div class="pa-2">
        <v-btn color="red-lighten-1" variant="elevated" class="text-white" block @click="logout">
          <h4 v-if="this.lang=='ar'" >تسجيل خروج <v-icon class="ml-2">mdi-logout</v-icon></h4>
          <h4 v-if="this.lang=='fr'" ><v-icon class="">mdi-logout</v-icon>Se Déconnecter</h4>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Sidebar",
  props: {
    lang: {
      type: String,
    },
  },
  data() {
    return {
      storeId: this.$route.params.storeId,
      aradminlinks: [
        ["mdi-clipboard-text-outline", "الطلبات", "adminorders"],
        ["mdi-format-list-bulleted-square", "المنتجات", "admincategories"],
        ["mdi-cog-outline", "الإعدادات", "adminsettings"],
      ],
      fradminlinks: [
        ["mdi-clipboard-text-outline", "Commandes", "adminorders"],
        ["mdi-format-list-bulleted-square", "Produits", "admincategories"],
        ["mdi-cog-outline", "Paramétres", "adminsettings"],
      ],
      isOpen: false,
    };
  },
  computed: {
    ...mapGetters(["getOpen", "getUserRole"]),
  },
  methods: {
    ...mapActions(["toggleOpen", "logoutUser"]),
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
