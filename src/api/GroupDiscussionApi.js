import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const GroupDiscussionAPI = {
    createDiscussion(groupId, discussionData, token){
        return instance.post(`groupDiscussion/${groupId}`, discussionData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getOneDiscussion(groupId, discussionId, userId, token){
        return instance.post(`groupDiscussion/${groupId}/${discussionId}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAllDiscussions(groupId, token){
        return instance.get(`groupDiscussion/${groupId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    closeDiscussion(groupId, discussionId, userId, token){
        return instance.put(`groupDiscussion/${groupId}/${discussionId}/close`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    hideDiscussion(groupId, discussionId, userId, token){
        return instance.put(`groupDiscussion/${groupId}/${discussionId}/hide`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    deleteDiscussion(groupId, discussionId, userId, token){
        return instance.post(`groupDiscussion/${groupId}/${discussionId}/delete`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    createDiscussionPost(groupId, discussionId, postData, token){
        return instance.post(`groupDiscussion/${groupId}/${discussionId}/post`, postData, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getAllDiscussionPosts(groupId, discussionId, userId, token, page){
        return instance.post(`groupDiscussion/${groupId}/${discussionId}/getAll`, {userId}, {headers: {'Authorization': token}, params: {page: page}}).then(response => response.data);
    },
    deleteDiscussionPost(groupId, discussionId, postId, userId, token){
        return instance.post(`groupDiscussion/${groupId}/${discussionId}/${postId}/delete`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
}