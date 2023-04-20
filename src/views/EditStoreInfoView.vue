<template>
    <v-breadcrumbs class="d-flex justify-center align-center breadcrumb">
      <div></div>
      <div><h2>تعديل معلومات المتجر</h2></div>
    </v-breadcrumbs>
    <div class="container">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-row>
          <v-col :cols="$vuetify.display.mdAndUp ? '5' : '12'">
            <div class="d-flex align-center">
              <v-card class="mx-auto">
                <v-card-item>
                  <v-avatar size="320" rounded="0">
                    <v-img
                      class="d-flex"
                      @click="
                        () => {
                          this.$refs.image_1.click();
                        }
                      "
                      :src="src1"
                      contain
                    >
                      <div v-if="isChanged1" class="mt-1 mr-3">
                        <v-btn
                          class=""
                          color="black"
                          size="x-small"
                          icon
                          dark
                          @click="deleteImage"
                        >
                          <v-icon class="mt-1">mdi-close</v-icon>
                        </v-btn>
                      </div>
                      <v-progress-circular
                        v-if="uploading1"
                        :size="210"
                        :width="7"
                        color="indigo"
                        indeterminate
                      ></v-progress-circular>
                    </v-img>
                    <input
                      ref="image_1"
                      class="d-none"
                      type="file"
                      accept="image/*"
                      label=""
                      :disabled="isChanged1"
                      @change="onFileChanged"
                    />
                  </v-avatar>
                </v-card-item>
              </v-card>
            </div>
          </v-col>
          <v-col align="end" :cols="$vuetify.display.mdAndUp ? '7' : '12'">
            <div class="">
              <v-card class="mx-auto">
                <v-card-item class="">
                  <h3 class="mb-3">إسم المنتج</h3>
                  <v-text-field
                    append-inner-icon="mdi-pencil"
                    placeholder="أدخل الإسم"
                    variant="outlined"
                    reverse
                    v-model="title"
                    :readonly="loading"
                    :rules="required"
                  ></v-text-field>
                </v-card-item>
                <v-card-item class="">
                  <h3 class="mb-3">سعر المنتج</h3>
                  <v-text-field
                    append-inner-icon="mdi-tag-outline"
                    placeholder="0.00"
                    variant="outlined"
                    type="number"
                    reverse
                    v-model="price"
                    :readonly="loading"
                    :rules="required"
                  ></v-text-field>
                </v-card-item>
                <v-card-actions>
                  <v-btn
                    :loading="loading"
                    block
                    color="indigo"
                    size="large"
                    type="submit"
                    variant="elevated"
                    class="text-h5"
                  >
                    تعديل
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </template>
  <style scoped>
  .v-progress-circular {
    margin: 3rem;
  }
  </style>
  <script>
  import { mapGetters} from "vuex";
  
  import axiosInstance from "../axios/axiosInstance";
  import imagevoid from "../assets/void.png";
  import { useDisplay } from "vuetify";
  
  export default {
    setup() {
      const { display } = useDisplay();
    },
  
    data() {
      return {
        storeId:"",
        userId:"",
        form: false,
        image_error: "",
        src1: imagevoid,
        isChanged1: false,
        uploading1: false,
        image: "",
        name: "",
        price: "",
        loading: false,
        required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      };
    },
  
    computed: {
    ...mapGetters(["getUserId","getStoreId"]),
    },
  
    methods: {
      onFileChanged(e) {
        this.uploading1 = true;
        var reader = new FileReader();
        var img_data = this.$refs.image_1.files[0];
        var reader = new FileReader();
        reader.onloadend = (e) => {
          let fileData = reader.result;
          var startIndex = fileData.indexOf("base64,") + 7;
          var base64str = fileData.substr(startIndex);
          var decoded = atob(base64str);
          if (decoded.length >= 10485760) {
            this.image_error = "10 MB حجم الصورة يتجاوز   ";
            this.uploading1 = false;
            return null;
          } else {
            axiosInstance
              .post(
                `/store/${this.storeId}/images`,
                {
                  store_id: this.storeId,
                  image: img_data,
                },
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              )
              .then((response) => {
                this.image = response.data.url;
                this.src1 = response.data.url;
                this.isChanged1 = true;
                this.uploading1 = false;
              });
          }
        };
  
        reader.readAsDataURL(img_data);
      },
      deleteImage() {
        this.image = "";
        this.$refs.image_1.value = "";
        this.src1 = imagevoid;
        this.isChanged1 = false;
      },
      onSubmit() {
        if (!this.form) return;
        const fd = {
          name: this.title,
          price: this.price,
          store_id: this.storeId,
          image1: this.image,
        };
  
        this.loading = true;
        axiosInstance.put(`/product/${this.productId}`, fd).then((response) => {
          if (response.status === 200) {
            this.$router.push({
              name: "Products",
              params: { id: this.store },
            });
          }
        });
      },
    },
  
    created() {
      this.userId=this.getUserId;
      this.storeId=this.getStoreId;
      axiosInstance.get(`/store/${this.storeId}`).then((response) => {
        if (response.status === 200) {
          this.namne = response.data.name;
          if (response.data.logo) {
            this.src1 = response.data.logo;
            this.image = response.data.logo;
            this.isChanged1 = true;
          }
        }
      });
    },
  };
  </script>
  