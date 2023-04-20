<template>
  <v-toolbar class="">
    <v-row class="container d-flex justify-center align-center">
      <v-col cols="5"></v-col>
      <v-col align="end" cols="7"> <h1 class="mt-1 mb-1">طلب جديد</h1></v-col>
    </v-row>
  </v-toolbar>
  <v-container v-if="Object.keys(cart).length !== 0" class="mb-5">
    <v-row class="d-flex flex-row-reverse">
      <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
        <v-card>
          <v-card-title class="text-right"
            ><h3 class="mb-3">المنتجات</h3>
            <v-divider></v-divider
          ></v-card-title>
          <v-card-text v-for="product in cart" :key="product.name">
            <div class="d-flex py-3 justify-space-between">
              <div>
                <v-btn variant="plain" @click="openeditdialog(product)">
                  <v-icon class="text-h5 text-teal-darken-4 mt-3"
                    >mdi-pencil</v-icon
                  >
                </v-btn>
                <v-btn variant="plain" @click="opendeletedialog(product.id)">
                  <v-icon class="text-h5 text-red-darken-4 mt-5"
                    >mdi-delete</v-icon
                  >
                </v-btn>
              </div>
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

          <v-form v-model="valid">
            <v-card-item>
              <div class="text-right align-center">
                <div>
                  <h3 class="mb-3">* رقم الهاتف</h3>
                  <v-text-field
                    variant="outlined"
                    type="text"
                    reverse
                    v-model="phone"
                    :readonly="loading"
                    :rules="validatephone"
                    dense
                  ></v-text-field>
                </div>
              </div>
            </v-card-item>
            <v-card-item>
              <div class="text-right align-center">
                <h3 class="mb-3">* المدينة</h3>
                <v-select
                  variant="outlined"
                  v-model="selectedcity"
                  :items="cities"
                  item-title="city"
                  item-value="cost"
                  :rules="required"
                  return-object
                ></v-select>
              </div>
            </v-card-item>
            <v-card-item>
              <div class="text-right align-center">
                <h3 class="mb-3">الإسم الكامل</h3>
                <v-text-field
                  variant="outlined"
                  type="text"
                  reverse
                  v-model="clientname"
                  :readonly="loading"
                  dense
                ></v-text-field>
              </div>
            </v-card-item>
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
            <v-card-title class="text-right">
              <h4>{{ total_original.toFixed(2) }} : الثمن الأصلي</h4>
            </v-card-title>
            <v-card-title class="text-right text-teal">
              <h4>{{ profit.toFixed(2) }} : صافي الربح </h4>
            </v-card-title>
            <v-card-actions>
              <v-btn
                block
                color="teal-lighten-1"
                size="large"
                variant="elevated"
                class="mt-5"
                @click="addOrder"
                :disabled="!valid"
                :loading="loading"
              >
                <h4>تأكيد الطلب</h4>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      class="d-flex flex-row-reverse text-right"
      max-width="600"
      v-model="editdialog"
    >
      <v-card>
        <v-card-title
          ><h3>{{ editdialogname }}</h3></v-card-title
        >
        <v-form>
          <v-card-item>
            <h2 class="mb-3">الكمية</h2>
            <v-text-field
              append-inner-icon="mdi-layers-triple"
              variant="outlined"
              type="number"
              reverse
              v-model="editdialogquantity"
              :readonly="loading"
              :rules="required"
              compact
            ></v-text-field>
          </v-card-item>
          <v-card-item>
            <h2 class="mb-3">ثمن البيع</h2>
            <v-text-field
              append-inner-icon="mdi-tag"
              variant="outlined"
              type="number"
              reverse
              v-model="editdialogprice"
              :readonly="loading"
              :rules="validateprice"
              compact
            ></v-text-field>
          </v-card-item>
          <v-card-actions
            ><v-btn
              :disabled="!isFormValid"
              block
              color="teal-lighten-1"
              size="large"
              variant="elevated"
              class="text-h5 mt-1"
              @click="editcart()"
            >
              <h5 class="mt-2">تأكيد</h5>
            </v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn
              block
              size="large"
              class="text-h5 mt-1"
              @click="dialog = false"
            >
              <h5 class="mt-2">تراجع</h5>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-dialog
      class="d-flex flex-row-reverse text-right"
      max-width="600"
      v-model="deletedialog"
    >
      <v-card>
        <v-card-text> متأكد من حذف المنتج ؟ </v-card-text>
        <v-card-actions>
          <v-btn
            rounded="pill"
            color="red"
            class="text-subtitle-1"
            @click="deleteproduct(this.deletedialogid)"
          >
            تأكيد</v-btn
          >
          <v-btn
            color="indigo"
            class="text-subtitle-1"
            @click="deletedialog = false"
          >
            لا، تراجع
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

  <v-container class="mt-5" v-if="Object.keys(cart).length === 0">
    <h2 class="text-center mt-5 font-weight-regular">
      ! لا يوجد أي منتج <br />
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
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";
import Cookies from "js-cookie";

import axiosInstance from "../axios/axiosInstance";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {},

  data() {
    return {
      total: 0,
      cart: JSON.parse(Cookies.get("cart")),
      //editdialog
      editdialog: false,
      editdialogid: "",
      editdialogname: "",
      editdialogprice: "",
      // edit form
      editdialogquantity: 1,
      editdialogprice: "",
      price: "",
      loading: false,
      required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      validateprice: [
        (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
        (v) =>
          parseFloat(v) >= parseFloat(this.price) ||
          "سعر بيع المنتج يجب أن يكون أكبر من أو يساوي السعر الأصلي",
      ],
      // delete dialog
      deletedialog: false,
      deletedialogid: "",
      // coordinates form
      valid: false,
      phone: "",
      selectedcity: "",
      cities: [
        { city: "الدار البيضاء", cost: "40" },
        { city: "الرباط", cost: "20" },
        { city: "مراكش", cost: "40" },
        { city: "اكادير", cost: "40" },
        { city: "طنجة", cost: "40" },
        { city: "فاس", cost: "40" },
        { city: "سلا", cost: "20" },
        { city: "القنيطرة", cost: "40" },
        { city: "مكناس", cost: "40" },
        { city: "وجدة", cost: "40" },
        { city: "تمارة", cost: "40" },
        { city: "الجديدة", cost: "40" },
        { city: "المحمدية", cost: "40" },
        { city: "تطوان", cost: "40" },
        { city: "الناظور", cost: "40" },
        { city: "آسفي", cost: "40" },
        { city: "بني ملال", cost: "40" },
        { city: "خريبكة", cost: "40" },
        { city: "بوزنيقة", cost: "40" },
        { city: "سطات", cost: "40" },
      ],
      clientname: "",
      validatephone: [
        (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
        (v) =>
          /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im.test(v) ||
          "رقم الهاتف غير صحيح",
      ],
    };
  },

  computed: {    
    ...mapGetters(["getUserId"]),
    isFormValid: function () {
      if (
        this.editdialogprice == "" ||
        parseFloat(this.editdialogprice) < parseFloat(this.price) ||
        this.editdialogquantity == "" ||
        parseFloat(this.editdialogquantity) == 0
      ) {
        return false;
      }
      return true;
    },
    total_products: function () {
      var t = 0;
      for (var key of Object.keys(this.cart)) {
        t += this.cart[key]["total_product"];
      }
      return t;
    },    
    total_original: function () {
      var t = 0;
      for (var key of Object.keys(this.cart)) {
        t += parseFloat(this.cart[key]["originalprice"]) * parseFloat( this.cart[key]["quantity"]) ;
      }
      t+= parseFloat(this.shipcost)
      return t;
    },    
    profit: function () {
      return parseFloat(this.total_order) - parseFloat(this.total_original)
    },
    shipcost: function(){
      if(this.selectedcity == ''){
        return 0
      }
      return this.selectedcity['cost']
    },
    shipcity: function(){
      if(this.selectedcity == ''){
        return ''
      }
      return this.selectedcity['city']
    },
    total_order:function(){
      return parseFloat(this.total_products) + parseFloat(this.shipcost)
    }
  },

  methods: {
    ...mapActions(["removeiscart"]),
    openeditdialog(product) {
      this.editdialog = true;
      this.editdialogid = product.id;
      this.editdialogname = product.name;
      this.editdialogprice = product.price;
      this.editdialogquantity = product.quantity;
      this.price = product.originalprice;
    },
    editcart() {
      var product = this.cart[this.editdialogid];
      product.quantity = this.editdialogquantity;
      product.price = this.editdialogprice;
      (product.total_product =
        parseFloat(this.editdialogprice) * parseFloat(this.editdialogquantity)),
        Cookies.set("cart", JSON.stringify(this.cart));
      this.editdialog = false;
    },
    opendeletedialog(id) {
      (this.deletedialog = true), (this.deletedialogid = id);
    },
    deleteproduct(id) {
      delete this.cart[id];
      Cookies.set("cart", JSON.stringify(this.cart));
    },
    // submit Form
    addOrder(){
      this.loading=true
      const fd={
        user_id:this.getUserId,
        products:Object.values(this.cart),
        total_products:this.total_products,
        phone:this.phone,
        shipcity:this.shipcity,
        shipcost:this.shipcost,
        total_order: this.total_order,       
        clientname:this.clientname,
        orderstatus:'registred'
      }
      axiosInstance.post(`/order/create`, fd).then((response) => {
        if (response.status === 200) {          
          Cookies.set("cart",JSON.stringify({}));
          this.removeiscart();
          this.$router.push({
            name: "orders",
          });
        }
      });
    },
  },

  created() {},
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
