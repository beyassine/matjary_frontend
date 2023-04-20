<template>
  <v-img class="mx-auto outlined" :width="150" :src="logo" cover></v-img>
  <div class="d-flex justify-center">
    <form
      :class="$vuetify.display.mdAndUp ? 'signupFormLg' : 'signupFormSm'"
      action=""
    >
      <div class="text-right align-center">
        <h2 class="text-center mb-4">تسجيل الدخول</h2>
        <h3 class="mb-3">رقم واتساب</h3>
        <div>
          <vue-tel-input
            class=""
            v-model="username"
            v-bind="bindProps"
            @validate="check"
          ></vue-tel-input>
          <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
        </div>
        <h3 class="mb-3 mt-3">كلمة المرور</h3>
        <input type="text" class="input" placeholder="" v-model="password" />
        <h5 v-if="nameerror" class="text-red">{{ msgerror }}</h5>
      </div>
      <v-btn
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
        رقم الواتساب أو كلمة المرور خاطئ
      </h5>
      <h4 class="text-center mt-5">
        <router-link class="text-decoration-none" to="Signup">
          <v-btn class="text-light-green" variant="flat">
            <h3>أنشئ متجرك</h3>
          </v-btn>
        </router-link>
        ليس لديك حساب ؟
      </h4>
    </form>
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
    valid: true,
    loading: false,
    username: "",
    validatetel: "",
    isvalildtel: false,
    show: false,
    password: "",
    incorrectAuth: false,
    // Rules
    telerror: false,
    telmsgerror: "",
    nameerror: false,
    msgerror: "",
    //
    loading: false,
    required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
    bindProps: {
      mode: "international",
      defaultCountry: "MA",
      disabledFetchingCountry: false,
      disabled: false,
      disabledFormatting: false,
      required: false,
      enabledCountryCode: true,
      enabledFlags: true,
      onlyCountries: [],
      ignoredCountries: [],
      autocomplete: "off",
      name: "whatsapp",
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
  }),

  computed: {
    ...mapGetters(["getUser"]),
  },

  methods: {
    ...mapActions(["loginUser"]),
    check(telnumber) {
      if (telnumber.valid) {
        this.isvalildtel = true;
        this.validatetel = telnumber.number;
      } else {
        this.isvalildtel = false;
        this.validatetel = "";
      }
    },
    submitForm() {
      this.loading = true;
      this.telerror = false;
      this.nameerror = false;
      this.urlerror = false;
      if (this.username == "") {
        this.telerror = true;
        this.telmsgerror = "لا يجوز أن يُترَك هذا الحقل فارغًا";
        this.loading = false;
        return;
      }
      if (this.isvalildtel == false) {
        this.telerror = true;
        this.telmsgerror = "رقم الهاتف غير صحيح";
        this.loading = false;
        return;
      }
      if (this.password == "") {
        this.nameerror = true;
        this.msgerror = "لا يجوز أن يُترَك هذا الحقل فارغًا";
        this.loading = false;
        return;
      }
      const fd = {
        username: this.validatetel,
        password: this.password,
      };
      this.loginUser(fd)
        .then(() => {
          this.loading = false;
          this.$router.push({
            name: "home",
          });
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
  width: 35%;
  padding: 10px;
}
.signupFormSm {
  margin: auto;
  width: 90%;
  padding: 10px;
}
.input {
  border: 1px solid rgb(168, 168, 168);
  border-radius: 3px;
  width: 100%;
  height: 35px;
  padding: 10px;
  -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
  -moz-box-sizing: border-box; /* Firefox, other Gecko */
  box-sizing: border-box; /* Opera/IE 8+ */
}
.input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(81, 203, 238, 1);
  border: 1px solid rgba(81, 203, 238, 1);
}
</style>
