import { PostAPI } from '../../api/PostApi';
import { ADD_POST, DELETE_POST, DISLIKE_POST, LIKE_POST, RESET_USER_POSTS, SET_PAGE, SET_USER_POSTS_FAIL, SET_USER_POSTS_PROGRESS, SET_USER_POSTS_SUCCESS, SYNCRONIZE_POST_DELETE, SYNCRONIZE_POST_DISLIKE, SYNCRONIZE_POST_LIKE, SYNCRONIZE_POST_UPDATE, SYNCRONIZE_UPDATE_COMMENTS } from './PostTypes';

const startGetPosts = () => ({type: SET_USER_POSTS_PROGRESS});
const successGetPosts = (posts, page, total, more) => ({type: SET_USER_POSTS_SUCCESS, payload: {posts, page, total, more}});
const failGetPosts = () => ({type: SET_USER_POSTS_FAIL});
const addPost = (post) => ({type: ADD_POST, payload: post});
const deletePost = (id) => ({type: DELETE_POST, payload: id});
const likeSinglePost = (postId, userId) => ({type: LIKE_POST, payload: {postId, userId}});
const dislikeSinglePost = (postId, userId) => ({type: DISLIKE_POST, payload: {postId, userId}});
export const resetUserPosts = () => ({type: RESET_USER_POSTS});
export const setPostsPage = (page) => ({type: SET_PAGE, payload: page});
export const syncronizeCommentsUpdate = (postId, comments) => ({type: SYNCRONIZE_UPDATE_COMMENTS, payload: {postId, comments}});
export const syncronizePostUpdate = (postId, post) => ({type: SYNCRONIZE_POST_UPDATE, payload: {postId, post}});
export const syncronizePostDelete = (postId) => ({type: SYNCRONIZE_POST_DELETE, payload: postId});
export const syncronizePostLike = (postId, userId) => ({type: SYNCRONIZE_POST_LIKE, payload: {postId, userId}});
export const syncronizePostDislike = (postId, userId) => ({type: SYNCRONIZE_POST_DISLIKE, payload: {postId, userId}});


export const getPosts = (userId, token, page, limit) => async (dispatch) => {
    dispatch(startGetPosts());
    try{
        const res = await PostAPI.getUserPosts(userId, token, limit, page);
        dispatch(successGetPosts(res.posts, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPosts());
    }
};

export const createPost = (post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.create(post, token);
        dispatch(addPost(res.post));
    } catch (e){
        console.log(e)
    }
};

export const removePost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(deletePost(postId));
    } catch (e){
        console.log(e)
    }
};

export const likePost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likeSinglePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikePost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikeSinglePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};
