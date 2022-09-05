import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const GroupInfoAPI = {
    createInfoBlock(groupId, infoData, token){
        return instance.post(`groupInfo/${groupId}`, infoData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getInfoBlock(infoId, token){
        return instance.get(`groupInfo/${infoId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAllInfoBlocks(groupId, token){
        return instance.get(`groupInfo/${groupId}/all`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    editInfoBlock(groupId, infoId, infoData, token){
        return instance.put(`groupInfo/${groupId}/${infoId}/edit`, infoData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteInfoBlock(groupId, infoId, userId, token){
        return instance.post(`groupInfo/${groupId}/${infoId}/delete`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}