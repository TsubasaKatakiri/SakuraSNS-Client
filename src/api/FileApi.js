import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const FileAPI = {
    create(fileInfo, token){
        return instance.post(`file/`, fileInfo, {headers: {'Authorization': token}}).then(response => response.data);
    },
    get(id, token){
        return instance.get(`file/${id}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteFile(id, userId, token){
        return instance.post(`file/${id}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}