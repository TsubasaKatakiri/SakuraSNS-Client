import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const AlbumAPI = {
    create(albumData, token){
        return instance.post(`album/`, albumData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAll(userId, token){
        return instance.get(`album/${userId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAllOfGroup(groupId, token){
        return instance.get(`album/group/${groupId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getOne(albumId, token){
        return instance.get(`album/user/${albumId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getOneOfGroup(albumId, groupData, token){
        return instance.post(`album/group/${albumId}`, groupData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    update(albumId, albumData, token){
        return instance.put(`album/${albumId}`, albumData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    lockAlbum(albumId, userId, token){
        return instance.put(`album/${albumId}/lock`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    privateAlbum(albumId, userId, token){
        return instance.put(`album/${albumId}/private`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deletePreserve(albumId, userId, token){
        return instance.post(`album/${albumId}/preserve`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteFull(albumId, userId, token){
        return instance.post(`album/${albumId}/full`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}