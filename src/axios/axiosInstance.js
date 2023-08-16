import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const refreshToken = (refresh_token) => {
    var refresh_url=`https://matjaryapi.online/user/refresh?token=${refresh_token}`
    var refresh_localurl=`http://127.0.0.1:8000/user/refresh?token=${refresh_token}`
    const payload = {
        token: refresh_url
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
        return axios.post(refresh_url, { headers: headers }).then((response) => {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

var base='https://matjaryapi.online'
var localbase = 'http://127.0.0.1:8000'


const axiosInstance = axios.create({
    baseURL: localbase,
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