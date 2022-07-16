import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const ImageAPI = {
    create(imageData, token){
        return instance.post(`image/`, imageData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAll(albumId, token){
        return instance.get(`image/all/${albumId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getOne(imageId, token){
        return instance.get(`image/single/${imageId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    update(imageId, imageData, token){
        return instance.put(`image/${imageId}`, imageData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    delete(imageId, userId, token){
        return instance.post(`image/${imageId}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}