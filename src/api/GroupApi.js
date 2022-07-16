import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const GroupAPI = {
    createGroup(groupData, token){
        return instance.post(`group/`, groupData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getOneGroup(groupId, token){
        return instance.get(`group/${groupId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAllGroups(searchData, token, limit, page){
        return instance.post(`group/search`, searchData, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    getAllUserGroups(userId, searchData, token, limit, page){
        return instance.post(`group/search/${userId}`, searchData, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    editGroupInfo(groupId, infoData, token){
        return instance.put(`group/${groupId}/edit/info`, infoData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    editGroupPolicies(groupId, policiesData, token){
        return instance.put(`group/${groupId}/edit/policies`, policiesData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteGroup(groupId, deletionData, token){
        return instance.post(`group/${groupId}/delete`, deletionData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    joinToGroup(groupId, userId, token){
        return instance.post(`group/${groupId}/join`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    processJoinRequest(groupId, requestData, token){
        return instance.post(`group/${groupId}/join/request`, requestData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    processUserBan(groupId, banData, token){
        return instance.post(`group/${groupId}/ban`, banData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    processUserLeveling(groupId, levelData, token){
        return instance.post(`group/${groupId}/level`, levelData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    leaveGroup(groupId, userId, token){
        return instance.post(`group/${groupId}/leave`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getGroupUsers(groupId, searchData, token, page, limit){
        return instance.post(`group/${groupId}/users`, searchData, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    getGroupBans(groupId, searchData, token, page){
        return instance.post(`group/${groupId}/users/ban`, searchData, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    getGroupRequests(groupId, searchData, token, page){
        return instance.post(`group/${groupId}/users/request`, searchData, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    addGroupAudio(groupId, audioData, token){
        return instance.post(`group/${groupId}/audio/add`, audioData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deletGroupAudio(groupId, audioData, token){
        return instance.post(`group/${groupId}/audio/delete`, audioData, {headers: {'Authorization': token}}).then(response => response.data);
    },
}