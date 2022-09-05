import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const CommentAPI = {
    create(comment, token){
        return instance.post(`comment/`, comment, {headers: {'Authorization': token}}).then(response => response.data);
    },
    update(commentId, comment, token){
        return instance.put(`comment/${commentId}`, comment, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteComment(commentId, userId, token){
        return instance.post(`comment/${commentId}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getComments(entryId, token){
        return instance.get(`comment/${entryId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    like(commentId, userId, token){
        return instance.post(`comment/${commentId}/like`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    dislike(commentId, userId, token){
        return instance.post(`comment/${commentId}/dislike`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}