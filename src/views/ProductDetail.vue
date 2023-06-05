<template>
  <ExtendHeader bordered="true" />
  <div class="container ">
    <v-row class="d-flex flex-row-reverse bg-white">
      <v-col :cols="$vuetify.display.smAndUp ? '4' : '12'">
        <v-card-text class="text-right">
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="10">
              <h4 class="mr-2 text-medium-emphasis">{{ this.product.publisher }}</h4>
            </v-col>
            <v-col cols="2">
              <v-avatar size="60">
                <v-img :src="this.product.publisher_logo == null || product.publisher_logo == ''
                  ? src1
                  : this.product.publisher_logo
                  "></v-img>
              </v-avatar>
            </v-col>
          </v-row>
          <h2>{{ product.productname }}</h2>
        </v-card-text>
        <v-row>
          <v-col cols="12">
            <v-img height="350px" :src="bigImage" />
          </v-col>
          <v-col cols="3" v-for="(image, index) in images" :key="index">
            <v-img v-if="image !== ''" height="80px" :src="image" @click="selectImage(index)" />
          </v-col>
        </v-row>
        <v-card-text class="mt-3 text-right">
          <v-chip size="large" class="mb-3" :color="getstatus('registred').color">
            {{ getstatus('registred').text }}
            <v-icon class="ml-2">
              {{ getstatus('registred').icon }}
            </v-icon>
          </v-chip>
          <p>
            <span class="text-decoration-line-through text-h6">{{ product.unitprice }} DH</span> <span
              class="text-h4 text-green ml-2"> {{ product.groupprice }} DH</span>
          </p>
          <h3 v-if="stillTime" class="text-red mt-3">الوقت المتبقي : {{ remainingDays }} أيام {{ remainingHours }} ساعة {{
            remainingMinutes }} دقيقة
          </h3>
          <h3 v-if="!stillTime" class="text-red mt-3">الوقت المتبقي : إنتهى
          </h3>
          <h3 class="mt-2"> {{ product.groupquantity }} : عدد المشترين المطلوب <v-icon
              class="ml-2">mdi-check-circle-outline</v-icon></h3>
          <h3 class="mt-2"> {{ buyers_count }} : عدد المشترين الحالي <v-icon class="ml-2">mdi-account-group</v-icon></h3>
        </v-card-text>
      </v-col>
      <v-col class="bg-white" :cols="$vuetify.display.smAndUp ? '6' : '12'">
        <v-card-title class="mb-3">
          <h3 class="text-right text-green">أضف طلبك</h3>
          <v-divider></v-divider>
        </v-card-title>
        <v-form v-model="valid">
          <v-card-item class="mt-3">
            <div class="text-right align-center">
              <h3 class="mb-3">الإسم الكامل<v-icon class="ml-2">mdi-pencil-outline</v-icon></h3>
              <v-text-field outlined type="text" reverse v-model="fullname" :readonly="loading" dense></v-text-field>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center">
              <h3 class="mb-3">* الكمية المطلوبة <v-icon class="ml-2">mdi-layers-outline</v-icon></h3>
              <v-row class="d-flex justify-space-between  mt-2">
                <v-col cols="4"><v-btn size="x-large" variant="text" @click="decrement">
                    <h2>-</h2>
                  </v-btn></v-col>
                <v-col cols="4"><v-text-field outlined type="number" reverse v-model="quantity" :readonly="loading"
                    dense></v-text-field></v-col>
                <v-col cols="4"><v-btn size="x-large" variant="text" @click="increment">
                    <h2>+</h2>
                  </v-btn></v-col>
              </v-row>
            </div>

          </v-card-item>
          <v-card-item>
            <div class="text-right align-center">
              <div>
                <h3 class="mb-3"> * رقم الهاتف <v-icon class="ml-2">mdi-phone-outline</v-icon>
                </h3>
                <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps" @validate="check"></vue-tel-input>
                <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
              </div>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="text-right align-center mt-2">
              <h3 class="mb-3">* المدينة<v-icon class="ml-2">mdi-map-marker-outline</v-icon></h3>
              <v-select outlined v-model="selectedcity" :items="cities" item-title="city" item-value="cost"
                :rules="required" return-object></v-select>
            </div>
          </v-card-item>
          <v-card-title>
            <h3 class="text-right mb-3">ملخص الطلب</h3>
            <v-divider></v-divider>
          </v-card-title>
          <v-card-title class="text-right">
            <h4>
              {{ total_products.toFixed(2) }} : ثمن المنتجات الإجمالي
            </h4>
          </v-card-title><v-card-title class="text-right">
            <h4>{{ parseFloat(shipcost).toFixed(2) }} : ثمن الشحن</h4>
          </v-card-title>
          <v-card-title class="text-right">
            <h4>{{ total_order.toFixed(2) }} : الثمن الإجمالي للطلب</h4>
          </v-card-title>
          <v-card-actions>
            <v-btn block color="green-lighten-1" size="large" variant="elevated" class="mt-5" @click="addOrder"
              :disabled="validform" :loading="loading">
              <h4>تأكيد الطلب</h4>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>
  
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import imagevoid from "../assets/void.png";
import storevoid from "../assets/void_store.png";

import ExtendHeader from "../components/ExtendHeader";



export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {
    ExtendHeader
  },

  data() {
    return {
      productId: this.$route.params.productId,
      src1: imagevoid,
      src2: storevoid,
      product: "",
      images: '',
      selectedItem: 0,// coordinates form
      active_buyer: '',
      cart: '',
      valid: false,
      loading: false,
      required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      quantity: 1,
      fullname: "",
      phone: '',
      selectedcity: "",
      cities: '',
      //time counter
      remainingTime: 0,
      stillTime: true,
      countdownDate: '',
      //vue-tel-input
      telerror: false,
      telmsgerror: '',
      validatetel: "",
      isvalildtel: false,
      bindProps: {
        mode: "international",
        defaultCountry: "MA",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        required: false,
        enabledCountryCode: true,
        enabledFlags: true,
        onlyCountries: ['MA'],
        ignoredCountries: [],
        autocomplete: "off",
        name: "phone",
        maxLen: 25,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: false,
          showDialCodeInList: true,
          showDialCodeInSelection: false,
          showFlags: true,
        },
        inputOptions: {
          showDialCode: false,
        },
      },
      //dialog
      dialog: false,
    };
  },

  computed: {
    bigImage() {
      return this.images[this.selectedItem];
    },
    remainingDays() {
      return Math.floor(this.remainingTime / (24 * 60 * 60 * 1000));
    },
    remainingHours() {
      return Math.floor((this.remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    },
    remainingMinutes() {
      return Math.floor((this.remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    },
    remainingSeconds() {
      return Math.floor((this.remainingTime % (60 * 1000)) / 1000);
    },
    buyers_count() {
      if (this.product.buyers == null) {
        return 0
      }
      return this.product.buyers.length
    },
    total_products: function () {
      return parseFloat(this.quantity) * parseFloat(this.product.groupprice);
    },
    shipcost: function () {
      if (this.selectedcity == '') {
        return 0
      }
      return this.selectedcity['cost']
    },
    shipcity: function () {
      if (this.selectedcity == '') {
        return ''
      }
      return this.selectedcity['city']
    },
    total_order: function () {
      return parseFloat(this.total_products) + parseFloat(this.shipcost)
    },
    validform() {
      if (this.isvalildtel && this.valid && this.stillTime && this.shipcost !== 0) {
        return false
      }
      return true
    },
  },

  methods: {
    startCountdown() {
      if (this.stillTime) {
        const countdown = setInterval(() => {
          const currentTime = new Date().getTime();
          this.remainingTime = this.countdownDate - currentTime;
          if (this.remainingTime <= 0) {
            clearInterval(countdown);
            this.stillTime = false
          }
        }, 1000); // Update every second
      }
    },
    getstatus() {
      if (this.buyers_count < this.product.groupquantity) {
        return {
          text: "في إنتظار المشترين",
          color: "grey",
          icon: "mdi-timer-sand",
        };
      } else {
        return {
          text: "عرض مؤكد",
          color: "green",
          icon: "mdi-check-bold",
        };
      }
    },
    check(telnumber) {
      if (telnumber.formatted !== '') {
        if (telnumber.valid) {
          this.isvalildtel = true;
          this.validatetel = telnumber.number;
          this.telerror = false;
          this.telmsgerror = ''
        } else {
          this.isvalildtel = false;
          this.validatetel = "";
          this.telerror = true;
          this.telmsgerror = "رقم الهاتف غير صحيح";
        }
      }
    },
    selectImage(index) {
      this.selectedItem = index;
    },
    increment() {
      this.quantity++;
    },
    decrement() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    // submit Form
    addOrder() {
      this.loading = true
      const fd = {
        fullname: this.fullname,
        phone: this.phone,
        quantity: this.quantity,
        total_products: this.total_products,
        shipcity: this.shipcity,
        shipcost: this.shipcost,
        total_order: this.total_order,
      }
      axios
        .post(`/product/addbuyer/${this.product.store_id}/${this.product.id}`, fd)
        .then((response) => {
          if (response.status === 200) {
            this.loading=false
          }
        });

    },
  },

  created() {
    axios
      .get(`/product/get/${this.productId}`)
      .then((response) => {
        this.product = response.data;
        this.images = response.data.images
        this.cities = response.data.shipping
        this.countdownDate = response.data.datelimit
      })
      .catch((err) => { });

    this.startCountdown();
  },
};
</script>

<style lang="scss">
@import "../scss/variables.scss";

.dialog {
  font-family: $body-font-family;
}

.tel-input {
  height: 55px;
  background-color: rgb(246, 246, 246);
  border-bottom: 1px solid grey;
  border-top: 1px solid rgb(235, 235, 235);
  border-left: 1px solid rgb(235, 235, 235);
  border-right: 1px solid rgb(235, 235, 235);
}
</style>