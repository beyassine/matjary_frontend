<template>
  <v-breadcrumbs class="d-flex justify-end align-center breadcrumb">
    <div></div>
    <div><h2>الإعدادات</h2></div>
  </v-breadcrumbs>
  <div class="container mt-5">
    <v-row class="d-flex justify-center flex-row-reverse">
      <v-col :cols="$vuetify.display.mdAndUp ? '8' : '12'">
        <v-card class="mx-auto text-right">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  معلومات المتجر<v-icon class="ml-2"
                    >mdi-storefront-outline</v-icon
                  >
                </h3>
              </div>
              <div class="text-grey text-right">
                <v-list lines="one" density="compact">
                  <v-list-item>
                    <h4>
                      <v-avatar color="surface-variant" size="60"></v-avatar>
                      <span class="text-blue-lighten-2 ml-5">
                        شعار المتجر
                        <v-icon class="ml-1">mdi-image-outline</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.storename }}
                      <span class="text-blue-lighten-2 ml-2">
                        إسم المتجر
                        <v-icon class="ml-1">mdi-message-text-outline</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.storename }}
                      <span class="text-blue-lighten-2 ml-2">
                        عملة المتجر
                        <v-icon class="ml-1">mdi-cash</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.adress }}
                      <span class="text-blue-lighten-2 ml-2">
                        عنوان المتجر
                        <v-icon class="ml-1">mdi-map-marker-outline</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.telephone }}
                      <span class="text-blue-lighten-2 ml-2">
                        رقم الهاتف
                        <v-icon class="ml-1">mdi-phone-outline</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.whatsapp }}
                      <span class="text-blue-lighten-2 ml-2">
                        رقم الواتساب
                        <v-icon class="ml-1">mdi-whatsapp</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.facebook }}
                      <span class="text-blue-lighten-2 ml-2">
                        فايسبوك
                        <v-icon class="ml-1">mdi-facebook</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                  <v-list-item>
                    <h4>
                      {{ this.instagram }}
                      <span class="text-blue-lighten-2 ml-2">
                        إنستغرام
                        <v-icon class="ml-1">mdi-instagram</v-icon>
                      </span>
                    </h4>
                  </v-list-item>
                </v-list>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-end mr-1">
            <router-link
              class="text-decoration-none text-grey-darken-4"
              :to="{
                name: 'home',
              }"
            >
              <v-btn
                class="ml-2"
                variant="flat"
                size="large"
                color="teal-lighten-1"
              >
                <h4>تعديل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h4>
              </v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { useDisplay } from "vuetify";

import axiosInstance from "../axios/axiosInstance";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {
      storeId: "",
      storename: "",
      adress: "",
      telephone: "",
      whatsapp: "",
      instagram: "",
      facebook: "",
      shipping: "",
      shipcost: "",
      logo: "",
    };
  },

  methods: {},
  computed: {
    ...mapGetters(["getUserId", "getStoreId"]),
  },
  created() {
    this.storeId = this.getStoreId;
    axiosInstance.get(`/store/get/${this.storeId}`).then((response) => {
      if (response.status === 200) {
        this.storename = response.data.storename;
        this.adress = response.data.adress;
        this.telephone = response.data.telephone;
        this.whatsapp = response.data.whatsapp;
        this.instagram = response.data.instagram;
        this.shipping = response.data.shipping;
        this.shipcost = response.data.shipcost;
        this.logo = response.data.logo;
      }
    });
  },
};
</script>
