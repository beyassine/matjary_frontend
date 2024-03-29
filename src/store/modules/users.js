import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

var base='https://matjaryapi.online'
var localbase = 'http://127.0.0.1:8000'

const axiosInstance = axios.create({
    baseURL: base,
});

const state = {
    isAuthenticated: false,
    user_id: '',
    store_id: '',
    store_phone:'',
    lang:'',
};

const getters = {
    getAuthentication: state => state.isAuthenticated,
    getUserId: state => state.user_id,
    getStoreId: state => state.store_id,
    getstorePhone: state => state.store_phone,
    getstoreLang: state => state.lang,
};

const actions = {
    authenticateUser(context) {
        var refresh_token = localStorage.getItem('refreshToken');
        if (refresh_token !== null) {
            var refresh_decoded = jwt_decode(refresh_token);
            const isExpired = dayjs.unix(refresh_decoded.expires).diff(dayjs()) < 1
            if (!isExpired) {
                localStorage.setItem('user', JSON.stringify({ user_id: refresh_decoded.user_id, store_id: refresh_decoded.store_id, lang: refresh_decoded.lang, store_phone: refresh_decoded.store_phone }))
                context.commit('setUser', {
                    user_id: refresh_decoded.user_id,
                    store_id: refresh_decoded.store_id,
                    store_phone: refresh_decoded.store_phone,
                    lang:refresh_decoded.lang
                });
            }
            else {
                context.commit('logoutUser')
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')
            }
        } else {
            context.commit('logoutUser')
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user')
        }
    },
    loginUser(context, usercredentials) {
        return new Promise((resolve, reject) => {
            axiosInstance.post('/user/login', {
                phone: usercredentials.phone,
                password: usercredentials.password,
            }
            )
                .then(response => {
                    console.log(response)
                    localStorage.setItem('accessToken', response.data.access_token);
                    localStorage.setItem('refreshToken', response.data.refresh_token);
                    localStorage.setItem('user', JSON.stringify({ user_id: response.data.id, store_id: response.data.store_id, lang: response.data.lang,  store_phone: response.data.phone, storename: response.data.storename, }))
                    context.commit('setLoginUser', response.data);
                    resolve()
                }).catch(err => {
                    reject()
                })
        })
    },
    logoutUser(context) {
        context.commit('logoutUser')
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
    },
};

const mutations = {
    setLoginUser: (state, user) => (
        state.isAuthenticated = true,
        state.user_id = user.id,
        state.store_id = user.store_id,
        state.store_phone = user.phone,
        state.lang = user.lang
    ),
    setUser: (state, user) => (
        state.isAuthenticated = true,
        state.user_id = user.user_id,
        state.store_id = user.store_id,
        state.store_phone = user.store_phone,
        state.lang = user.lang
    ),
    logoutUser: (state) => (
        state.isAuthenticated = false,
        state.user_id = '',
        state.store_id = '',
        state.store_phone = '',
        state.lang = ''
    ),
};

export default {
    state,
    getters,
    actions,
    mutations
};