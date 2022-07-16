import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const VideofileAPI = {
    create(videofile, token){
        return instance.post(`video/`, videofile, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAll(token, page){
        return instance.get(`video/`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getGroupVideo(groupId, token, page){
        return instance.get(`video/group/${groupId}`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    addVideoToGroup(groupId, videoData, token){
        return instance.post(`video/group/${groupId}/add`, videoData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getUploadedByUser(userId, token, page){
        return instance.get(`video/user/${userId}`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getOne(id, token){
        return instance.get(`video/${id}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getSpecific(search, token, page){
        return instance.post(`video/find`, {search}, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getByTag(tag, token, page){
        return instance.post(`video/findTag`, {tag}, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    edit(id, videofile, token){
        return instance.put(`video/${id}`, videofile, {headers: {'Authorization': token}}).then(response => response.data);
    },
    delete(id, userId, token){
        return instance.post(`video/${id}/delete`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    like(id, userId, token){
        return instance.post(`video/${id}/like`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    dislike(id, userId, token){
        return instance.post(`video/${id}/dislike`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    setFavorite(id, userId, token){
        return instance.post(`video/${id}/fav`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}