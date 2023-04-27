import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const refreshToken = (refresh_token) => {
    const payload = {
        token: refresh_token
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
        return axios.post(`/user/refresh?token=${refresh_token}`, { headers: headers }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}



const axiosInstance = axios.create({
    baseURL: 'https://matjaryapi.online',
});

axiosInstance.interceptors.request.use((req) => {

    var access_token = localStorage.getItem('accessToken');
    var refresh_token = localStorage.getItem('refreshToken');
    var access_decoded = jwt_decode(access_token);

    const isExpired = dayjs.unix(access_decoded.expires).diff(dayjs()) < 1
    if (isExpired) {
        return refreshToken(refresh_token).then((response) => {
            localStorage.setItem('accessToken', response.data.access_token)
            localStorage.setItem('refreshToken', response.data.refresh_token)
            req.headers.Authorization = `Bearer ${response.data.access_token}`
            return Promise.resolve(req)
        })
    }else{
        req.headers.Authorization = `Bearer ${access_token}`
    }
    return req
}, (err) => {
    return Promise.reject(err)
})


export default axiosInstance