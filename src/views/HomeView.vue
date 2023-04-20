<template>
  <v-breadcrumbs class="d-flex justify-end align-center breadcrumb">
    <div></div>
    <div><h2>الرئيسية</h2></div>
  </v-breadcrumbs>
  <div class="container mt-5">
    <v-row class="d-flex justify-center flex-row-reverse">
      <v-col :cols="$vuetify.display.mdAndUp ? '8' : '12'">
        <v-alert
          class="text-right text-subtitle-1 mb-2"
          type="success"
          color="teal-lighten-1"
          density="compact"
          v-if="alert"
          >تم نسخ الرابط بنجاح</v-alert
        >
        <v-card class="mx-auto text-right">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  رابط المتجر<v-icon class="ml-2">mdi-link-variant</v-icon>
                </h3>
              </div>
              <div class="text-grey">
                <h4>{{ storeLink }}</h4>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-end mr-1">
            <v-btn
              class=" ml-2"
              variant="flat"
              size="large"
              color="grey text-white"
              @click="copyLink"
            >
             <h4> أنسخ الرابط <v-icon class="ml-2">mdi-content-copy</v-icon> </h4>
            </v-btn>
            <v-btn
              class="ml-2"
              variant="flat"
              size="large"
              color="teal-lighten-1"
              @click="copyLink"
            >
            <h4> زيارة المتجر <v-icon class="ml-2">mdi-open-in-new</v-icon> </h4>
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto text-right mt-3">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>
                  المنتجات<v-icon class="ml-2"
                    >mdi-package-variant-closed</v-icon
                  >
                </h3>
              </div>
              <div class="text-grey">
                <h4>لديك <span class="text-blue-lighten-2 ml-1 mr-1">{{ product_count }} منتج </span></h4>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-end mr-1">
            <v-btn
              class=" ml-2"
              variant="flat"
              size="large"
              color="grey text-white"
            >
            <h4> أضف منتج <v-icon class="ml-2">mdi-plus</v-icon></h4>
            </v-btn>
            <v-btn
              class=" ml-2"
              variant="flat"
              size="large"
              color="teal-lighten-1"
            >
            <h4> قائمة المنتجات <v-icon class="ml-2">mdi-open-in-new</v-icon> </h4> 
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card class="mx-auto text-right mt-3">
          <v-card-item>
            <div>
              <div class="mb-3">
                <h3>الطلبات<v-icon class="ml-2">mdi-basket-outline</v-icon></h3>
              </div>
              <div class="text-grey">
                <h4>لديك <span class="text-blue-lighten-2 ml-1 mr-1">{{ meworder_count }} طلب</span> لم يتم تلبيته</h4>
              </div>
            </div>
          </v-card-item>
          <v-card-actions class="d-flex justify-end mr-1">
            <v-btn
              class="ml-2"
              variant="flat"
              size="large"
              color="teal-lighten-1"
            >
              <h4> قائمة الطلبات<v-icon class="ml-2">mdi-open-in-new</v-icon> </h4>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters} from "vuex";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {
      storeId:"",
      product_count:0,
      meworder_count: 0,
      alert: false,
    };
  },

  methods: {
    copyLink() {
      navigator.clipboard.writeText(this.storeLink);
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 1500);
    },
  },
  computed: {    
    ...mapGetters(["getUserId","getStoreId"]),
    storeLink() {
      return "http://localhost:8080/" + this.storeId;
    },
  },
  created() {    
    this.storeId=this.getStoreId
  },

};
</script>
