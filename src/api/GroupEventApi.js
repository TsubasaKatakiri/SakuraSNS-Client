import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const GroupEventAPI = {
    createEvent(groupId, eventData, token){
        return instance.post(`groupEvent/${groupId}`, eventData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getEvent(eventId, token){
        return instance.get(`groupEvent/${eventId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAllEvents(groupId, token){
        return instance.get(`groupEvent/${groupId}/allEvents`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    joinEvent(groupId, eventId, userId, token){
        return instance.put(`groupEvent/${groupId}/${eventId}/join`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    editEvent(groupId, eventId, eventData, token){
        return instance.put(`groupEvent/${groupId}/${eventId}/edit`, eventData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteEvent(groupId, eventId, userId, token){
        return instance.post(`groupEvent/${groupId}/${eventId}/delete`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}