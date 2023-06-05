<template>
    <ExtendHeader bordered="false" />
    <div class=" bg-white d-flex justify-center">
        <v-form :class="$vuetify.display.smAndUp ? 'signupFormLg' : 'signupFormSm'" v-model="valid">
            <div class="mt-5 text-right align-center">
                <h2 class="text-center mb-2">أنشئ حسابك</h2>
                <h4 class="text-center text-grey mb-4"></h4>
                <v-row class="d-flex flex-row-reverse mt-5">
                    <v-col cols="12">
                        <h3 class="mb-3">إسم المستخدم </h3>
                        <v-text-field prepend-inner-icon="mdi-pencil" type="text" outlined v-model="username"
                            :rules="Required"></v-text-field>
                        <h5 v-if="usernameerror" class="text-red">{{ texterror }}</h5>
                    </v-col>
                    <v-col cols="12">
                        <h3 class="mb-3">رقم الهاتف</h3>
                        <vue-tel-input class="tel-input" v-model="phone" v-bind="bindProps"
                            @validate="check"></vue-tel-input>
                        <h5 v-if="telerror" class="text-red">{{ telmsgerror }}</h5>
                        <h5 v-if="phoneerror" class="text-red">{{ texterror }}</h5>
                    </v-col>
                    <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                        <h3 class="mb-3">كلمة المرور</h3>
                        <v-text-field :prepend-inner-icon="visible1 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible1 ? 'text' : 'password'" outlined v-model="password1" :rules="passwordRules"
                            @click:prepend-inner="visible1 = !visible1"></v-text-field>
                    </v-col>
                    <v-col :cols="$vuetify.display.smAndUp ? '6' : '12'">
                        <h3 class="mb-3">تأكيد كلمة المرور</h3>
                        <v-text-field :prepend-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                            :type="visible2 ? 'text' : 'password'" type="password" outlined v-model="password2"
                            :rules="confirmpassworRules" required
                            @click:prepend-inner="visible2 = !visible2"></v-text-field>
                    </v-col>
                </v-row>
                <v-btn  :loading="loading" class="mt-5 text-white" color="light-green" size="large"
                    block dark @click="register">
                    <h3>تابع</h3>

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

import majary_logo from "../../assets/matjary_logo_g.png";

import { useDisplay } from "vuetify";
import axios from "axios";

import ExtendHeader from "../../components/ExtendHeader";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        ExtendHeader
    },

    data() {
        return {
            logo: majary_logo,
            valid: false,
            loading: false,
            username: '',
            categorie:'',
            store_categrories: ['أجهزة إلكترونية', 'الأزياء', 'المنزل و المطبخ', 'الصحة و الجمال', 'مستلزمات رياضية', 'منتجات الأطفال', 'مجالات أخرى'],
            phone: "",
            password1: "",
            password2: "",
            visible1: false,
            visible2: false,
            Required: [
                (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
            ],
            phoneRules: [
                (v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا",
                (v) =>
                    /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im.test(v) ||
                    "رقم الهاتف غير صحيح",
            ],
            passwordRules: [(v) => !!v || "أدخل كلمة المرور"],
            confirmpassworRules: [
                (v) => !!v || "أدخل كلمة المرور",
                (v) => v == this.password1 || "كلمة المرور غير متطابقة",
            ],
            usernameerror: false,
            phoneerror: false,
            texterror: '',
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
        };
    },
    computed: {
        vaidform() {
            if (this.isvalildtel && this.valid) {
                return true
            }
            return false
        },
    },
    methods: {
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
        register() {
            this.loading = true
            const fd = {
                username: this.username,
                phone: this.validatetel,
                password: this.password1,
                storename:this.username,
                role: 'seller',
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
                        if (error.response.data == 'invalid_username') {
                            this.loading = false;
                            this.usernameerror = true;
                            this.texterror = "إسم المستخدم مستعمل";
                            return;
                        }
                        if (error.response.data == 'invalid_phone') {
                            this.loading = false;
                            this.usernameerror=false;
                            this.phoneerror = true;
                            this.texterror = "رقم الهاتف مستعمل";
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
    height: 100%;
    padding: 10px;
}

.signupFormSm {
    margin: auto;
    width: 90%;
    height: 100%;
    padding: 10px;
}

.tel-input {
  height: 55px;
  background-color: rgb(235, 235, 235);
  border-bottom: 1px solid grey;
  border-top: 1px solid rgb(235, 235, 235);
  border-left: 1px solid rgb(235, 235, 235);
  border-right: 1px solid rgb(235, 235, 235);
}
</style>