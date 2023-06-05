<template>
  <v-breadcrumbs class="d-flex justify-center align-center breadcrumb">
    <div></div>
    <div>
      <h2>منتج جديد</h2>
    </div>
  </v-breadcrumbs>
  <div class="container">
    <v-form class="bg-white mt-3" v-model="form" @submit.prevent="onSubmit">
      <v-row>
        <v-col :cols="$vuetify.display.mdAndUp ? '4' : '12'">
          <div class="d-flex align-center text-right">
            <v-card class="mx-auto" elevation="0">
              <v-card-item>
                <h3 class="mb-3">صورة المنتج</h3>
                <v-avatar size="320" rounded="0">
                  <v-img class="d-flex" @click="() => {
                    this.$refs.image_0.click();
                  }
                    " :src="images[0] == null || images[0] == '' ? imgvoid : images[0]" contain>
                    <div v-if="img_changes[0]" class="mt-1 mr-3">
                      <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage">
                        <v-icon class="mt-1">mdi-close</v-icon>
                      </v-btn>
                    </div>
                    <v-progress-circular v-if="img_uploading[0]" :size="210" :width="7" color="teal-lighten-1"
                      indeterminate></v-progress-circular>
                  </v-img>
                  <input ref="image_0" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[0]"
                    @change="uploadImage(event, 0)" />
                </v-avatar>
                <h3 class="mt-3 mb-3">صور إضافية</h3>
                <v-row class="">
                  <v-col cols="6">
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_1.click();
                      }
                        " :src="images[1] == null || images[1] == '' ? imgvoid : images[1]" contain>
                        <div v-if="img_changes[1]" class="mt-1 mr-3">
                          <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage">
                            <v-icon class="mt-1">mdi-close</v-icon>
                          </v-btn>
                        </div>
                        <v-progress-circular v-if="img_uploading[1]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_1" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[1]"
                        @change="uploadImage(event, 1)" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_2.click();
                      }
                        " :src="images[2] == null || images[2] == '' ? imgvoid : images[2]" contain>
                        <div v-if="img_changes[2]" class="mt-1 mr-3">
                          <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage">
                            <v-icon class="mt-1">mdi-close</v-icon>
                          </v-btn>
                        </div>
                        <v-progress-circular v-if="img_uploading[2]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_2" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[2]"
                        @change="uploadImage(event, 2)" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_3.click();
                      }
                        " :src="images[3] == null || images[3] == '' ? imgvoid : images[3]" contain>
                        <div v-if="img_changes[3]" class="mt-1 mr-3">
                          <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage">
                            <v-icon class="mt-1">mdi-close</v-icon>
                          </v-btn>
                        </div>
                        <v-progress-circular v-if="img_uploading[3]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_3" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[3]"
                        @change="uploadImage(event, 3)" />
                    </v-avatar>
                  </v-col>
                  <v-col cols="6">
                    <v-avatar size="140" rounded="0">
                      <v-img class="d-flex" @click="() => {
                        this.$refs.image_4.click();
                      }
                        " :src="images[4] == null || images[4] == '' ? imgvoid : images[4]" contain>
                        <div v-if="img_changes[4]" class="mt-1 mr-3">
                          <v-btn class="" color="black" size="x-small" icon dark @click="deleteImage">
                            <v-icon class="mt-1">mdi-close</v-icon>
                          </v-btn>
                        </div>
                        <v-progress-circular v-if="img_uploading[4]" :size="60" :width="7" color="teal-lighten-1"
                          indeterminate></v-progress-circular>
                      </v-img>
                      <input ref="image_4" class="d-none" type="file" accept="image/*" label="" :disabled="img_changes[4]"
                        @change="uploadImage(event, 4)" />
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-item>
            </v-card>
          </div>
        </v-col>
        <v-col align="end" :cols="$vuetify.display.mdAndUp ? '8' : '12'">
          <div class="">
            <v-card class="mx-auto" elevation="0">
              <v-card-item class="">
                <h3 class="mb-3">إسم الناشر</h3>
                <v-text-field append-inner-icon="mdi-pencil" placeholder="أدخل الإسم" variant="outlined" reverse
                  v-model="publisher" :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-item>
                <h3 class="mb-3">صورة الناشر</h3>
                <v-avatar size="320" rounded="0">
                  <v-img class="d-flex" @click="() => {
                    this.$refs.image_logo.click();
                  }
                    " :src="publisher_logo == null ||publisher_logo == '' ? imgvoid : publisher_logo" contain>
                  </v-img>
                  <input ref="image_logo" class="d-none" type="file" accept="image/*" label=""
                    @change="uploadLogo()" />
                </v-avatar>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">إسم المنتج</h3>
                <v-text-field append-inner-icon="mdi-pencil" placeholder="أدخل الإسم" variant="outlined" reverse
                  v-model="title" :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">المواصفات</h3>
                <v-textarea append-inner-icon="mdi-abjad-arabic" placeholder="مواصفات المنتج" variant="outlined" reverse
                  v-model="description" :readonly="loading"></v-textarea>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">سعر المنتج</h3>
                <v-text-field append-inner-icon="mdi-tag" placeholder="0.00" variant="outlined" type="number" reverse
                  v-model="unitprice" :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">سعر المنتج بالجملة</h3>
                <v-text-field append-inner-icon="mdi-tag" placeholder="0.00" variant="outlined" type="number" reverse
                  v-model="groupprice" :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-item class="">
                <h3 class="mb-3">الكمية المطلوبة</h3>
                <v-text-field append-inner-icon="mdi-layers-triple" placeholder="0" variant="outlined" type="number"
                  reverse v-model="groupquantity" :readonly="loading" :rules="required"></v-text-field>
              </v-card-item>
              <v-card-actions>
                <v-btn :disabled="!form" :loading="loading" block color="teal-darken-1" size="large" type="submit"
                  variant="elevated" class="text-h5">
                  أضف
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
import { mapGetters } from "vuex";

import axiosInstance from "../../axios/axiosInstance";
import imagevoid from "../../assets/void-imagep.png";
import { useDisplay } from "vuetify";
import axios from "axios";

export default {
  setup() {
    const { display } = useDisplay();
  },

  data() {
    return {
      storeId: "",
      userId: "",
      form: false,
      //publisher
      publisher: '',
      publisher_logo: '',
      // product
      title: "",
      description: '',
      unitprice: "",
      groupprice: "",
      groupquantity: "",
      loading: false,
      required: [(v) => !!v || "لا يجوز أن يُترَك هذا الحقل فارغًا"],
      //images
      imgvoid: imagevoid,
      images: ['', '', '', '', '', ''],
      img_changes: [false, false, false, false],
      img_uploading: [false, false, false, false],
      // Shipping
      shipping: [
        { city: "الدار البيضاء", cost: "20" },
        { city: "الرباط", cost: "40" },
        { city: "مراكش", cost: "40" },
        { city: "اكادير", cost: "40" },
        { city: "طنجة", cost: "40" },
        { city: "فاس", cost: "40" },
        { city: "سلا", cost: "40" },
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

    };
  },

  computed: {
    ...mapGetters(["getUserId", "getStoreId"]),
  },

  methods: {
    async getUrl() {
      try {
        const response = await axiosInstance.post(`/store/${this.storeId}/images/geturl`);
        return response.data
      } catch (error) {
        console.error(error);
      }
    },
    async uploadLogo(){
      var img_data = this.$refs['image_logo'].files[0];
      // get signed url from s3
      const url = await this.getUrl()
      // put image to s3 bucket
      await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: img_data
      })
      // show image 
      const img_url = url.split('?')[0]
      this.publisher_logo=img_url
    },
    async uploadImage(e, index) {
      this.img_uploading.splice(index, 1, true)
      var img_data = this.$refs['image_' + index].files[0];
      // get signed url from s3
      const url = await this.getUrl()
      // put image to s3 bucket
      await fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: img_data
      })
      // show image 
      const img_url = url.split('?')[0]
      this.images.splice(index, 1, img_url)
      this.img_uploading.splice(index, 1, false)
      this.img_changes.splice(index, 1, true)
    },
    deleteImage() {

    },
    onSubmit() {
      if (!this.form) return;
      const fd = {
        store_id: this.storeId,
        user_id: this.userId,
        productname: this.title,
        unitprice: this.unitprice.toString(),
        groupprice: this.groupprice.toString(),
        groupquantity: parseInt(this.groupquantity),
        illimited: false,
        images: this.images,
        shipping: this.shipping,
        publisher: this.publisher,
        publisher_logo: this.publisher_logo,
        datelimit:new Date().getTime() + 7 * 24 * 60 * 60 * 1000, // Current time + 7 days in milliseconds
      };
      this.loading = true;
      axiosInstance.post(`/product/create`, fd).then((response) => {
        if (response.status === 200) {
          this.$router.push({
            name: "adminproducts",
          });
        }
      });
    },
  },

  created() {
    this.userId = this.getUserId;
    this.storeId = this.getStoreId;
  },
};
</script>
  