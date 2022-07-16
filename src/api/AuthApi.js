import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const AuthAPI = {
    register(username, email, password){
        return instance.post('auth/register', {username, email, password});
    },
    login(email, password){
        return instance.post('auth/login', {email, password}).then(response => response.data);
    },
    activate(token){
        return instance.post(`auth/activate`, {token}).then(response => response.data);
    },
    forgotPassword(email){
        return instance.post(`auth/forgot`, {email}).then(response => response.data);
    },
    resetPassword(password, token){
        return instance.post(`auth/reset`, {password, token}, {headers: {Authorization: token}}).then(response => response.data);
    },
    getAccessToken(){
        return instance.post('auth/refresh', {}).then(response => response.data);
    },
    getUserData(token){
        return instance.get('user/userinfo', {headers: {Authorization: token}}).then(response => response.data);
    },
    logout(){
        return instance.get('auth/logout').then(response => response.data);
    },
}