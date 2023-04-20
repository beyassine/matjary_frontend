<template>
  <v-breadcrumbs class="breadcrumb">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="7"> </v-col>
      <v-col align="end" cols="5"> <h1 class="">الطلبات</h1></v-col>
    </v-row>
  </v-breadcrumbs>
  <v-container class="container">
    <v-row >
      <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
        <v-card class="mx-auto text-right mb-3">
          <v-card-item>
            <div class="mt-2">
              <h2>قائمة الطلبات</h2>
            </div>
          </v-card-item>
          <v-card-item>
            <v-table>
              <tbody>
                <tr v-for="status in statuses" @click="filterOrders(status.status)" :class=" {active: this.filteredStatus == status.status} " >
                  <td>
                    <h3>{{ status.count }}</h3>
                  </td>
                  <td>
                    <h3>
                      {{ getstatus(status.status).title }}
                      <v-icon
                        class="ml-2"
                        :color="getstatus(status.status).color"
                        >{{ getstatus(status.status).icon }}</v-icon
                      >
                    </h3>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col :cols="$vuetify.display.smAndUp ? '8' : '12'">
        <v-card class="mx-auto text-right" style="max-height: 600px">
          <v-card-item>
            <v-table fixed-header height="300px">
              <thead>
                <tr>
                  <th class="text-right"></th>
                  <th class="text-right"><h3>الثمن الإجمالي</h3></th>
                  <th class="text-right"><h3>تاريخ الطلب</h3></th>
                  <th class="text-right"><h3>الوضعية</h3></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in filteredOrders" :key="order.id">
                  <td class="text-right">
                    <router-link
                      class="text-decoration-none"
                      :to="{
                        name: 'editorder',
                        params: { orderId: order.id },
                      }"
                    >
                      <v-btn
                        color="teal-lighten-1"
                        size="small"
                        type="submit"
                        variant="elevated"
                        class="text-h5 text-white"
                      >
                        <h5 class="">
                          تعديل
                          <v-icon class="mb-2">mdi-pencil-outline</v-icon>
                        </h5>
                      </v-btn>
                    </router-link>
                  </td>
                  <td class="text-right">
                    {{ parseFloat(order.total_order).toFixed(2) }}
                  </td>
                  <td class="text-right">
                    {{ formatedDate(order.created_at) }}
                  </td>
                  <td class="text-right">
                    <v-chip
                      class="ma-2"
                      :color="getstatus(order.orderstatus).color"
                    >
                      {{ getstatus(order.orderstatus).text }}
                      <v-icon class="ml-2">
                        {{ getstatus(order.orderstatus).icon }}
                      </v-icon>
                    </v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="mt-5" v-if="orders.length === 0">
    <h2 class="text-center mt-5 font-weight-regular">
      ! لا يوجد أي طلب <br />
      <router-link class="text-decoration-none" to="products">
        <v-btn
          class="ml-2 mt-5"
          variant="flat"
          size="x-large"
          color="teal-lighten-1"
        >
          <h4>قائمة المنتجات<v-icon class="ml-2">mdi-open-in-new</v-icon></h4>
        </v-btn>
      </router-link>
    </h2>
  </v-container>
</template>

<script>
import { format } from "date-fns";
import axiosInstance from "../axios/axiosInstance";
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {},

  data() {
    return {
      statuses: [
        { status: "all", count: 0 },
        { status: "registred", count: 0 },
        { status: "valid", count: 0 },
        { status: "complete", count: 0 },
        { status: "canceled", count: 0 },
      ],
      orders: [],
      filteredOrders: [],
      filteredStatus:'',
    };
  },

  computed: {
    statusCounts() {
      const counts = {};
      this.orders.forEach((order) => {
        counts[order.orderstatus] = counts[order.orderstatus] + 1 || 1;
      });
      return counts;
    },
  },

  methods: {
    updateStatusCounts() {
      this.statuses.forEach((status) => {
        if (status.status === "all") {
          status.count = this.orders.length;
        } else {
          status.count = this.orders.filter(
            (order) => order.orderstatus === status.status
          ).length;
        }
      });
    },
    filterOrders(status) {      
      this.filteredStatus=status
      if (status === "all") {
        this.filteredOrders = this.orders;
      } else {
        this.filteredOrders = this.orders.filter(
          (order) => order.orderstatus === status
        );
      }
    },
    getstatus(text) {
      if (text === "all") {
        return {
          title: "جميع الطلبات",
          text: "",
          color: "",
          icon: "mdi-clipboard-outline",
        };
      } else if (text === "registred") {
        return {
          title: "الطلبات المسجلة",
          text: "مسجل",
          color: "grey",
          icon: "mdi-tag",
        };
      } else if (text === "valid") {
        return {
          title: "الطلبات المؤكدة",
          text: "مؤكد",
          color: "green",
          icon: "mdi-check-bold",
        };
      } else if (text === "complete") {
        return {
          title: "الطلبات المكتملة",
          text: "مكتمل",
          color: "teal",
          icon: "mdi-checkbox-marked-circle-outline",
        };
      } else if (text === "canceled") {
        return {
          title: "الطلبات الملغية",
          text: "ملغى",
          color: "red",
          icon: "mdi-close-thick",
        };
      }
    },
    formatedDate(date) {
      const mydate = new Date(date);
      return format(mydate, "dd/MM/yyyy");
    },
  },
  created() {
    axiosInstance
      .get(`/order/getall`)
      .then((response) => {
        this.orders = response.data;
        this.filteredOrders = response.data;
        this.filteredStatus='all'
        this.updateStatusCounts();
      })
      .catch((err) => {});
  },
};
</script>
<style scoped>

.active {
  background-color: aqua;
}
</style>
