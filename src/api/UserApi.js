import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const UserAPI = {
    getUser(id, token){
        return instance.get(`user/${id}`, {headers: {'Authorization': token}}).then(response => response.data.user);
    },
    search(search, token){
        return instance.post(`user/search`, search, {headers: {'Authorization': token}}).then(response => response.data);
    },
    searchAdvanced(searchData, token, limit, page){
        return instance.post(`user/searchAdvanced`, searchData, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    searchFriendsAdvanced(userId, searchData, token, limit, page){
        return instance.post(`user/${userId}/friends/advanced`, searchData, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    searchFollowersAdvanced(userId, searchData, token, limit, page){
        return instance.post(`user/${userId}/followers/advanced`, searchData, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    changeUserStatus(id, statusInfo, token){
        return instance.put(`user/${id}/status`, statusInfo, {headers: {'Authorization': token}}).then(response => response.data);
    },
    modifyUser(id, userData, token){
        return instance.put(`user/${id}`, userData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    modifyExtraData(id, extraData, token){
        return instance.put(`user/${id}/extra`, extraData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    modifyUserSettings(id, settingsData, token){
        return instance.put(`user/${id}/settings`, settingsData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    switchDarkMode(id, token){
        return instance.put(`user/${id}/dark`, {}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    changeUserPassword(id, passwordData, token){
        return instance.put(`user/${id}/password`, passwordData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getFriends(id, token){
        return instance.get(`user/${id}/friends`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    followUser(userId, id, token){
        return instance.put(`user/${userId}/follow`, {id}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    blacklistUser(blacklistUserId, userId, token){
        return instance.post(`user/${blacklistUserId}/blacklist`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getUserBlacklist(userId, token){
        return instance.get(`user/${userId}/blacklist`, {headers: {'Authorization': token}}).then(response => response.data);
    },
}