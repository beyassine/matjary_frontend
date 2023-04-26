import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const axiosInstance = axios.create({
    baseURL: 'https:/matjaryapi.online',
});

const state = {
    isAuthenticated: false,
    user_id: '',
    store_id: '',
    role: '',
};

const getters = {
    getAuthentication: state => state.isAuthenticated,
    getUserId: state => state.user_id,
    getStoreId: state => state.store_id,
    getUserRole: state => state.role,
};

const actions = {
    authenticateUser(context) {
        var refresh_token = localStorage.getItem('refreshToken');
        if (refresh_token !== null) {
            var refresh_decoded = jwt_decode(refresh_token);
            const isExpired = dayjs.unix(refresh_decoded.expires).diff(dayjs()) < 1
            if (!isExpired) {
                localStorage.setItem('user', JSON.stringify({ user_id: refresh_decoded.user_id, store_id: refresh_decoded.store_id, role: refresh_decoded.role }))
                context.commit('setUser', {
                    user_id: refresh_decoded.user_id,
                    store_id: refresh_decoded.store_id,
                    role: refresh_decoded.role
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
                username: usercredentials.username,
                password: usercredentials.password,
            }
            )
                .then(response => {
                    localStorage.setItem('accessToken', response.data.access_token);
                    localStorage.setItem('refreshToken', response.data.refresh_token);
                    localStorage.setItem('user', JSON.stringify({ user_id: response.data.id, store_id: response.data.store_id, role: response.data.role }))
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
        state.role = user.role
    ),
    setUser: (state, user) => (
        state.isAuthenticated = true,
        state.user_id = user.user_id,
        state.store_id = user.store_id,
        state.role = user.role
    ),
    logoutUser: (state) => (
        state.isAuthenticated = false,
        state.user_id = '',
        state.store_id = '',
        state.role = ''
    ),
};

export default {
    state,
    getters,
    actions,
    mutations
};