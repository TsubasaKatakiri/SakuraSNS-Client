import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const UserAdditionalDataAPI = {
    getData(userId, token){
        return instance.get(`additional/${userId}`, {headers: {'Authorization': token}}).then(response => response.data.user);
    },
    modifyData(userId, userData, token){
        return instance.put(`additional/${userId}`, userData, {headers: {'Authorization': token}}).then(response => response.data);
    },
}