<template>
  <v-img class="mx-auto outlined" :width="150" :src="logo" cover></v-img>
  <div class="d-flex justify-center">
    <v-form  :class="$vuetify.display.smAndUp ? 'signupFormLg' : 'signupFormSm'" v-model="valid"  >
      <div class="text-right align-center">
        <h2 class="text-center mb-4">تسجيل الدخول</h2>
        <h3 class="mt-3 mb-3">البريد الإلكتروني</h3>
        <v-text-field
          type="email"
          :rules="emailRules"
          outlined
          v-model="username"
          reverse
          required
        ></v-text-field>
        <h3 class="mb-3">كلمة المرور</h3>
        <v-text-field
          :prepend-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          outlined
          v-model="password"
          reverse
          :rules="passwordRules"
          @click:prepend-inner="visible = !visible"
        ></v-text-field>
      </div>
      <v-btn
        :disabled="!valid"
        :loading="loading"
        class="mt-5 text-white"
        color="light-green"
        size="large"
        block
        dark
        @click="submitForm()"
      >
        <h3>تابع</h3>
      </v-btn>
      <h5 v-if="incorrectAuth" class="text-right text-red mt-2">
        البريد الإلكتروني أو كلمة المرور خاطئ
      </h5>
      <h4 class="text-center mt-5">
        <router-link class="text-decoration-none" to="Signup">
          <v-btn class="text-light-green" variant="flat">
            <h3>أنشئ متجرك</h3>
          </v-btn>
        </router-link>
        ليس لديك حساب ؟
      </h4>
    </v-form>
  </div>
</template>

<script>
import majary_logo from "../assets/matjary_logo_g.png";

import { mapGetters, mapActions } from "vuex";
import { useDisplay } from "vuetify";

import BtnXlg from "@/components/BtnXlg";

export default {
  setup() {
    const { display } = useDisplay();
  },

  components: {
    BtnXlg,
  },

  data: () => ({
    logo: majary_logo,
    valid:false,
    loading: false,
    username: "",
    password: "",
    visible:false,
    incorrectAuth: false,
    // Rules
    emailRules: [
        (v) => !!v || "أدخل عنوان البريد الإلكتروني",
        (v) => /.+@.+\..+/.test(v) || "عنوان البريد الإلكتروني غير صحيح",
      ],
      passwordRules: [(v) => !!v || "أدخل كلمة المرور"],

    //
    loading: false,
    required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
  }),

  computed: {
    ...mapGetters(["getUser","getUserRole"]),
  },

  methods: {
    ...mapActions(["loginUser"]),
    submitForm() {
      this.loading = true;
      const fd = {
        username: this.username,
        password: this.password,
      };
      this.loginUser(fd)
        .then(() => {
          this.loading = false;
          if (this.getUserRole=='seller'){
          this.$router.push({
            name: "products",
          })
          }
          if (this.getUserRole=='provider'){
          this.$router.push({
            name: "adminproducts",
          });
          }

          return;
        })
        .catch((err) => {
          this.incorrectAuth = true;
          this.loading = false;
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
