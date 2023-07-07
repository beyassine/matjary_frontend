<template>
    <v-breadcrumbs class="d-flex justify-center align-center breadcrumb">
        <div></div>
        <div>
            <h2>معلومات الشحن</h2>
        </div>
    </v-breadcrumbs>
    <div class="container">
        <v-form class="bg-white mt-3" v-model="form" @submit.prevent="onSubmit">
            <v-row>
                <v-col align="end" cols="12">
                    <v-card>
                        <v-table density="compact">
                            <thead>
                                <tr>
                                    <th class="text-right">
                                        الثمن
                                    </th>
                                    <th class="text-right">
                                        المدينة
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in shipping" :key="item.city">
                                    <td>
                                        <v-text-field append-inner-icon="mdi-pencil" type="number" variant="underlined"
                                            reverse v-model="item.cost" :readonly="loading"></v-text-field>
                                    </td>
                                    <td>{{ item.city }}</td>
                                </tr>
                            </tbody>
                        </v-table>

                        <v-card-actions>
                            <v-btn :disabled="!form" :loading="loading" block color="teal-darken-1" size="large"
                                type="submit" variant="elevated" class="text-h5">
                                تعديل
                            </v-btn>
                        </v-card-actions>
                    </v-card>
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
import { useDisplay } from "vuetify";

export default {
    setup() {
        const { display } = useDisplay();
    },

    data() {
        return {
            storeId: "",
            form: false,
            loading: false,
            shipping:"",

        };
    },

    computed: {
        ...mapGetters(["getUserId", "getStoreId"]),
    },

    methods: {
        onSubmit() {
            this.loading = true;
            // Prepare the updated data
            const fd = this.shipping
            axiosInstance.post(`/store/${this.storeId}/updateshipping`, fd).then((response) => {
                if (response.status === 200) {
                    this.$router.push({
                        name: "adminsettings",
                    });
                }
            });
        },
    },

    created() {
        this.storeId = this.getStoreId;
        axiosInstance.get(`/store/get/${this.storeId}`).then((response) => {
            if (response.status === 200) {
                this.shipping = response.data.shipping
            }
        });
    },
};
</script>
    