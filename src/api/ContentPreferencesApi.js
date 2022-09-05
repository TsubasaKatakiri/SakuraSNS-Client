import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const PreferencesAPI = {
    get(userId, token){
        return instance.get(`prefs/${userId}/get`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getFavoriteMusic(userId, token, page){
        return instance.get(`prefs/${userId}/audio`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getFavoriteVideo(userId, token, page){
        return instance.get(`prefs/${userId}/video`, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    editAudioFavs(userId, audioId, token){
        return instance.put(`prefs/${userId}/audio/favs`, {audioId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    editVideoFavs(userId, videoId, token){
        return instance.put(`prefs/${userId}/video/favs`, {videoId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    editVideoSearch(userId, search, token){
        return instance.put(`prefs/${userId}/video/search`, {search}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    editVideoTags(userId, tags, token){
        return instance.put(`prefs/${userId}/video/tags`, {tags}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    clearAudioFavs(userId, token){
        return instance.post(`prefs/${userId}/audio/clear-favs`, {}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    clearVideoFavs(userId, token){
        return instance.post(`prefs/${userId}/video/clear-favs`, {}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    clearVideoRecommendations(userId, token){
        return instance.post(`prefs/${userId}/video/clear-recommends`, {}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}