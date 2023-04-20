<template>
  <v-img class="mx-auto outlined" :width="150" :src="logo" cover></v-img>
  <div class="d-flex justify-center">
    <v-form :class="$vuetify.display.smAndUp ? 'signupFormLg' : 'signupFormSm'"  v-model="valid">
      <div class="text-right align-center">
        <h2 class="text-center mb-4">أنشئ حسابك</h2>
        <v-row class="d-flex flex-row-reverse">
          <v-col cols="12">
            <h3 class="mt-3 mb-3">البريد الإلكتروني</h3>
            <v-text-field
              type="email"
              :rules="emailRules"
              outlined
              v-model="email"
              reverse
              required
            ></v-text-field>            
            <h5 v-if="emailerror" class="text-red">{{ emailmsg }}</h5>
          </v-col>
          <v-col cols="12">
            <h3 class="mt-3 mb-3">رقم الهاتف</h3>
            <v-text-field
              type="text"
              :rules="phoneRules"
              outlined
              v-model="phone"
              reverse
              required
            ></v-text-field>            
          </v-col>
          <v-col  :cols="$vuetify.display.smAndUp ? '6' : '12'">
            <h3 class="mb-3">كلمة المرور</h3>
            <v-text-field
              :prepend-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible1 ? 'text' : 'password'"
              outlined
              v-model="password1"
              :rules="passwordRules"
              reverse
              required
              @click:prepend-inner="visible1 = !visible1"
            ></v-text-field>
          </v-col>
          <v-col  :cols="$vuetify.display.smAndUp ? '6' : '12'">
            <h3 class="mb-3">تأكيد كلمة المرور</h3>
            <v-text-field
              :prepend-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible2 ? 'text' : 'password'"
              type="password"
              outlined
              v-model="password2"
              :rules="confirmpassworRules"
              reverse
              required
              @click:prepend-inner="visible2 = !visible2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          :disabled="!valid"
          :loading="loading"
          class="mt-5 text-white"
          color="light-green"
          size="large"
          block
          dark
          @click="register"
        >
        <h3>أنشئ</h3>
          
        </v-btn>
      <h4 class="text-center mt-5">
        <router-link class="text-decoration-none" to="login">
          <v-btn class="text-light-green" variant="flat">
            <h3>تسجيل الدخول</h3>
          </v-btn>
        </router-link>
         لديك حساب ؟
      </h4>
    </div>
    </v-form>
  </div>
</template>

<script>
import majary_logo from "../assets/matjary_logo_g.png";

import { useDisplay } from "vuetify";

import axios from "axios";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {
      logo: majary_logo,
      valid: false,
      loading: false,
      email: "",
      phone:"",
      password1: "",
      password2: "",
      visible1:false,
      visible2:false,
      emailRules: [
        (v) => !!v || "أدخل عنوان البريد الإلكتروني",
        (v) => /.+@.+\..+/.test(v) || "عنوان البريد الإلكتروني غير صحيح",
      ],
      phoneRules:[
        (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
        (v) =>
        /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im.test(v)  ||
          "رقم الهاتف غير صحيح",
      ],
      passwordRules: [(v) => !!v || "أدخل كلمة المرور"],
      confirmpassworRules: [
        (v) => !!v || "أدخل كلمة المرور",
        (v) => v == this.password1 || "كلمة المرور غير متطابقة",
      ],
      emailerror:false,
      emailmsg:''
    };
  },
  methods: {
    register() {
      this.loading=true
      const fd = {
        username: this.email,
        phone:this.phone,
        password: this.password1,
        role:'seller'
      };
      axios
        .post(`/user/create`, fd)
        .then((response) => {
          if (response.status == 200) {
            this.loading = false;
          }
        })
        .catch((error) => {
          if (error.response) {
            if(error.response.data=='invalid_username'){
          this.loading=false;
          this.emailerror = true;
          this.emailmsg = "عنوان البريد الإلكتروني مستعمل";
          return;
          }
        }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.signupFormLg {
  margin: auto;
  width: 40%;
  padding: 10px;
}
.signupFormSm {
  margin: auto;
  width: 90%;
  padding: 10px;
}
</style>