import { GroupDiscussionAPI } from '../../api/GroupDiscussionApi';
import { ADD_POST, CHANGE_POST_PAGE, DELETE_POST, GET_POSTS_FAIL, GET_POSTS_PROGRESS, GET_POSTS_SUCCESS, RESET_POSTS } from './GroupDiscussionPostTypes';

const startGetPosts = () => ({type: GET_POSTS_PROGRESS});
const successGetPosts = (posts, page, total, more) => ({type: GET_POSTS_SUCCESS, payload: {posts, page, total, more}});
const failGetPosts = () => ({type: GET_POSTS_FAIL});
export const resetPosts = () => ({type: RESET_POSTS});
export const changePostPage = (page) => ({type: CHANGE_POST_PAGE, payload: page});
const addDiscussionPost = (data) => ({type: ADD_POST, payload: data});
const deleteDiscussionPost = (data) => ({type: DELETE_POST, payload: data});


export const getPosts = (groupId, discussionId, userId, token, page) => async (dispatch) => {
    dispatch(startGetPosts());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussionPosts(groupId, discussionId, userId, token, page);
        dispatch(successGetPosts(res.posts, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPosts());
    }
};

export const addPost = (groupId, discussionId, postData, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.createDiscussionPost(groupId, discussionId, postData, token);
        dispatch(addDiscussionPost(res.post));
    } catch (e){}
};

export const deletePost = (groupId, discussionId, postId, userId, token) => async (dispatch) => {
    try{
        await GroupDiscussionAPI.deleteDiscussionPost(groupId, discussionId, postId, userId, token);
        dispatch(deleteDiscussionPost(postId));
    } catch (e){}
};