import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const AudiofileAPI = {
    create(audiofile, token){
        return instance.post(`audio/`, audiofile, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAll(token, page){
        return instance.get(`audio/`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getGroupAudio(groupId, token, page){
        return instance.get(`audio/group/${groupId}`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getOne(audioId, token){
        return instance.get(`audio/${audioId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    addAudioToGroup(groupId, audioData, token){
        return instance.post(`audio/group/${groupId}/add`, audioData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getUploadedByUser(userId, token, page){
        return instance.get(`audio/user/${userId}`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getSpecific(search, token, page){
        return instance.post(`audio/find`, {search}, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    setFavorite(id, userId, token){
        return instance.post(`audio/${id}/fav`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    delete(id, userId, token){
        return instance.post(`audio/${id}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}