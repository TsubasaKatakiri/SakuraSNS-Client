import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8080/api/',
})

export const PostAPI = {
    create(post, token){
        return instance.post(`post/`, post, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getPost(postId, token){
        return instance.get(`post/${postId}`, {headers: {'Authorization': token}}).then(response => response.data);
    },
    update(postId, post, token){
        return instance.put(`post/${postId}`, post, {headers: {'Authorization': token}}).then(response => response.data);
    },
    delete(postId, userId, token){
        return instance.post(`post/${postId}`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    like(postId, userId, token){
        return instance.post(`post/${postId}/like`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    dislike(postId, userId, token){
        return instance.post(`post/${postId}/dislike`, {userId}, {headers: {'Authorization': token}}).then(response => response.data);
    },
    getUserPosts(userId, token, limit, page){
        return instance.get(`post/profile/${userId}`, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    getTagPosts(tag, token, page, limit){
        return instance.post(`post/feed/tag`, {tag}, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    getFeed(userId, token, limit, page){
        return instance.get(`post/feed/${userId}`, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
    getGroupFeed(groupId, token, limit, page){
        return instance.get(`post/group/${groupId}`, {headers: {'Authorization': token}, params: {page: page, limit: limit}}).then(response => response.data);
    },
}