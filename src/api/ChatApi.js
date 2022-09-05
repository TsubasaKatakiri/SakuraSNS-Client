import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const ChatAPI = {
    getAll(id, token){
        return instance.get(`messages/${id}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    create(message, token){
        return instance.post(`messages/`, message, {headers: {'Authorization': token}}).then(response => response.data);
    },
    delete(messageId, userId, token){
        return instance.post(`messages/delete/${messageId}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}