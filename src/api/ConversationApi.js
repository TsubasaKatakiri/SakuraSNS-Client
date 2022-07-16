import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const ConversationAPI = {
    getAll(id, token){
        return instance.get(`conversations/${id}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getOne(senderId, receiverId, token){
        return instance.get(`conversations/${senderId}/${receiverId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    create(users, token){
        return instance.post(`conversations/`, users, {headers: {'Authorization': token}}).then(response => response.data);
    },
}