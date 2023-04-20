<template>
  <v-toolbar class="">
    <v-row class="container d-flex justify-center align-center">
      <v-col cols="5"></v-col>
      <v-col align="end" cols="7">
        <h1 class="mt-1 mb-1">تعديل الطلب</h1></v-col
      >
    </v-row>
  </v-toolbar>
  <v-container class="mb-5">
    <v-row class="d-flex flex-row-reverse">
      <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
        <v-card>
          <v-card-title class="text-right"
            ><h3 class="mb-3">المنتجات</h3>
            <v-divider></v-divider
          ></v-card-title>
          <v-card-text v-for="product in products" :key="product.name">
            <div class="d-flex py-3 justify-space-between">
              <div></div>
              <div class="d-flex flex-no-wrap justify-end">
                <div
                  :class="$vuetify.display.mdAndUp ? 'title-lg' : 'title-sm'"
                >
                  <v-card-title class="font-weight-bold text-right">
                    {{ product.name }}
                  </v-card-title>
                  <v-card-subtitle class="text-right">
                    ثمن البيع
                  </v-card-subtitle>
                  <v-card-title class="text-right mb-1">
                    {{ parseFloat(product.price).toFixed(2) }}
                  </v-card-title>
                  <v-card-subtitle class="text-right"> الكمية </v-card-subtitle>
                  <v-card-title class="text-right">
                    {{ parseFloat(product.quantity).toFixed(2) }}
                  </v-card-title>
                  <v-card-subtitle class="text-right">
                    الثمن الإجمالي للمنتج
                  </v-card-subtitle>
                  <v-card-title class="text-right">
                    {{ parseFloat(product.total_product).toFixed(2) }}
                  </v-card-title>
                </div>
                <v-avatar class="ma-3" size="75" rounded="0">
                  <v-img
                    :src="
                      product.img == null || product.img == ''
                        ? src1
                        : product.img
                    "
                  ></v-img>
                </v-avatar>
              </div>
            </div>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-title class="text-right mt-5 mb-5">
            <h4>{{ total_products.toFixed(2) }} : ثمن المنتجات الإجمالي</h4>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
        <v-card>
          <v-card-title
            ><h3 class="text-right mb-3">معلومات الزبون</h3>
            <v-divider></v-divider
          ></v-card-title>

          <v-card-item>
            <div class="text-right align-center">
              <div>
                <h3 class="mb-3">{{ phone }} : رقم الهاتف</h3>
              </div>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center">
              <div>
                <h3 class="mb-3">المدينة : {{ shipcity }}</h3>
              </div>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center">
              <h3 class="mb-3">{{ clientname }} : الإسم الكامل</h3>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
        <v-card>
          <v-card-title
            ><h3 class="text-right mb-3">ملخص الطلب</h3>
            <v-divider></v-divider
          ></v-card-title>
          <v-card-title class="text-right">
            <h4>
              {{ total_products.toFixed(2) }} : ثمن المنتجات الإجمالي
            </h4> </v-card-title
          ><v-card-title class="text-right">
            <h4>{{ parseFloat(shipcost).toFixed(2) }} : ثمن الشحن</h4>
          </v-card-title>
          <v-card-title class="text-right">
            <h4>{{ total_order.toFixed(2) }} : الثمن الإجمالي للطلب</h4>
          </v-card-title>
          <v-card-actions v-if="this.orderstatus == 'registred'">
            <v-btn
              block
              color="green-lighten-1"
              size="large"
              variant="elevated"
              class="mt-5"
              @click="validorder()"
              :loading="loadingvalid"
              :disabled="stock_error"
            >
              <h4>تأكيد الطلب<v-icon class="ml-2">mdi-check-bold</v-icon></h4>
            </v-btn>
          </v-card-actions>
            <h5 v-if="stock_error" class="text-right text-red mr-3">
              لا يجد المخزون الكافي لإتمام العملية
            </h5>
          <v-card-actions v-if="this.orderstatus == 'valid'">
            <v-btn
              block
              color="teal-lighten-1"
              size="large"
              variant="elevated"
              class=""
              @click="editOrder('complete')"
              :loading="loadingcomplete"
            >
              <h4>
                إتمام الطلب<v-icon class="ml-2"
                  >mdi-checkbox-marked-circle-outline</v-icon
                >
              </h4>
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="this.cancelorder">
            <v-btn
              block
              color="red-lighten-1"
              size="large"
              variant="elevated"
              class=""
              @click="editOrder('canceled')"
              :loading="loadingcancel"
            >
              <h4>إلغاء الطلب<v-icon class="ml-2">mdi-close-thick</v-icon></h4>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import axiosInstance from "../axios/axiosInstance";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {},

  data() {
    return {
      orderId: this.$route.params.orderId,
      products: "",
      total: 0,
      price: "",
      phone: "",
      clientname: "",
      shipcity: "",
      shipcost: "",
      loadingvalid: false,
      loadingcomplete: false,
      loadingcancel: false,
      orderstatus: "",
      stock_error: false,
    };
  },

  computed: {
    ...mapGetters(["getUserId"]),
    total_products: function () {
      var t = 0;
      for (var key of Object.keys(this.products)) {
        t += parseFloat(this.products[key]["total_product"]);
      }
      return t;
    },
    total_order: function () {
      return parseFloat(this.total_products) + parseFloat(this.shipcost);
    },
    cancelorder: function () {
      if (
        this.orderstatus == "complete" ||
        this.orderstatus == "canceled"
      ) {
        return false;
      }
      return true;
    },
  },

  methods: {
    validorder() {
      this.loadingvalid = true;
      axiosInstance.post(`/order/validate/${this.orderId}`).then((response) => {
        if (response.status === 200) {
          this.$router.push({
            name: "adminorders",
          });
        } else if (response.status === 400) {
          this.stock_error = true;
        }
      });
    },
    // submit Form
    editOrder(state) {
      const fd = {
        orderstatus: state,
      };
      this.loading = true;
      axiosInstance
        .post(`/order/updatestatus/${this.orderId}`, fd)
        .then((response) => {
          if (response.status === 200) {
            this.$router.push({
              name: "adminorders",
            });
          }
        });
    },
  },

  created() {
    axiosInstance.get(`/order/adminget/${this.orderId}`).then((response) => {
      if (response.status === 200) {
        this.products = response.data.products;
        this.phone = response.data.phone;
        this.shipcity = response.data.shipcity;
        this.shipcost = response.data.shipcost;
        this.clientname = response.data.clientname;
        this.orderstatus = response.data.orderstatus;
      }
    });
  },
};
</script>
<style scoped>
.title-lg {
  width: 380px;
}
.title-sm {
  width: 160px;
}
.myinput {
  border: 1px solid rgb(168, 168, 168);
  border-radius: 3px;
  width: 100%;
  height: 55px;
  padding: 10px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}
.myinput:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
</style>
