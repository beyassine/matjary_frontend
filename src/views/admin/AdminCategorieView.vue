<template>
    <v-breadcrumbs class="breadcrumb">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="7">
                <BtnLg title="أضف تصنيف" icon="mdi-plus" @click="this.dialog = true" />
            </v-col>
            <v-col align="end" cols="5">
                <h1 class="">التصنيفات</h1>
            </v-col>
        </v-row>
    </v-breadcrumbs>
    <v-container class="container" v-if="categories.length !== 0">
        <v-row class="d-flex justify-center ">
            <v-col :cols="$vuetify.display.smAndUp ? '8' : '12'">
                <v-table width="">
                    <tbody>
                        <tr v-for="item in categories" :key="item.name">
                            <td>
                                <v-btn color="red" icon="mdi-delete-outline" variant="text"></v-btn>
                                <v-btn icon="mdi-pencil-outline" variant="text"></v-btn>
                            </td>
                            <td class="text-right">
                                <h3>{{ item.name }}</h3>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
    <div class="text-center">
        <v-dialog class="dialog" v-model="dialog" width="90%">
            <v-card>
                <v-card-item>
                    <h3 class="mb-3">إسم التصنيف</h3>
                    <v-text-field append-inner-icon="mdi-pencil" placeholder="" variant="outlined" v-model="title"
                        :loading="loading" :readonly="loading"></v-text-field>
                </v-card-item>
                <v-divider></v-divider>
                <v-card-actions class="mb-5">
                    <v-btn block color="green-lighten-1" size="large" variant="elevated" class="text-h6 text-white mt-5"
                        :disabled="this.title == ''" @click="addCategorie()">
                        أضف تصنيف
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
import { mapGetters } from "vuex";
import axiosInstance from "../../axios/axiosInstance";
import { useDisplay } from "vuetify";

import BtnLg from "@/components/BtnLg";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        BtnLg,
    },

    data() {
        return {
            storeId: "",
            categories: '',
            //dialog add categorie            
            dialog: false,
            title: '',
            loading: false,

        };
    },

    computed: {
        ...mapGetters(["getStoreId"]),
    },

    methods: {
        addCategorie() {
            this.loading = true
            const fd =this.title
            this.loading = true;
            axiosInstance.post(`/store/${this.storeId}/addcategorie/?categorie=${this.title}`).then((response) => {
                if (response.status === 200) {
                    this.categories = response.data
                    this.loading = false
                    this.title = ''
                    this.dialog = false
                }
            });
        }
    },
    created() {
        this.storeId = this.getStoreId;
        axiosInstance
            .get(`/store/getcategories/${this.storeId}`)
            .then((response) => {
                this.categories = response.data;
            })
            .catch((err) => { });
    },
};
</script>
<style scoped>
.active {
    background-color: aqua;
}
</style>
  