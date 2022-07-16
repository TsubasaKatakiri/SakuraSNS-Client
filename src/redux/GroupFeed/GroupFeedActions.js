import { PostAPI } from '../../api/PostApi';
import { ADD_GROUP_FEED_POST, DISLIKE_GROUP_POST, LIKE_GROUP_POST, REMOVE_GROUP_FEED_POST, RESET_GROUP_FEED, SET_GROUP_FEED_PAGE, SET_GROUP_POSTS_FAIL, SET_GROUP_POSTS_PROGRESS, SET_GROUP_POSTS_SUCCESS, SYNCRONIZE_POST_DELETE, SYNCRONIZE_POST_DISLIKE, SYNCRONIZE_POST_LIKE, SYNCRONIZE_POST_UPDATE, SYNCRONIZE_UPDATE_COMMENTS } from './GroupFeedTypes';

const startGetFeed = () => ({type: SET_GROUP_POSTS_PROGRESS});
const successGetFeed = (posts, page, totalPosts, totalPages, more) => ({type: SET_GROUP_POSTS_SUCCESS, payload: {posts, page, totalPosts, totalPages, more}});
const failGetFeed = () => ({type: SET_GROUP_POSTS_FAIL});
const addFeedPost = (data) => ({type: ADD_GROUP_FEED_POST, payload: data});
const removeFeedPost = (id) => ({type: REMOVE_GROUP_FEED_POST, payload: id});
const likeFeedPost = (postId, userId) => ({type: LIKE_GROUP_POST, payload: {postId, userId}});
const dislikeFeedPost = (postId, userId) => ({type: DISLIKE_GROUP_POST, payload: {postId, userId}});
export const resetGroupFeed = () => ({type: RESET_GROUP_FEED});
export const setGroupFeedPage = (page) => ({type: SET_GROUP_FEED_PAGE, payload: page});
export const syncronizeGroupCommentsUpdate = (postId, comments) => ({type: SYNCRONIZE_UPDATE_COMMENTS, payload: {postId, comments}});
export const syncronizeGroupPostUpdate = (postId, post) => ({type: SYNCRONIZE_POST_UPDATE, payload: {postId, post}});
export const syncronizeGroupPostDelete = (postId) => ({type: SYNCRONIZE_POST_DELETE, payload: postId});
export const syncronizeGroupPostLike = (postId, userId) => ({type: SYNCRONIZE_POST_LIKE, payload: {postId, userId}});
export const syncronizeGroupPostDislike = (postId, userId) => ({type: SYNCRONIZE_POST_DISLIKE, payload: {postId, userId}});


export const getGroupFeed = (groupId, token, limit, page) => async (dispatch) => {
    dispatch(startGetFeed());
    try{
        const res = await PostAPI.getGroupFeed(groupId, token, limit, page);
        dispatch(successGetFeed(res.posts, res.page, res.totalPosts, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFeed());
    }
};

export const addPostToGroupFeed = (post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.create(post, token);
        dispatch(addFeedPost(res.post));
    } catch (e){
        console.log(e)
    }
};

export const removePostFromGroupFeed = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(removeFeedPost(postId));
    } catch (e){
        console.log(e)
    }
};

export const likeGroupPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likeFeedPost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeGroupPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikeFeedPost(postId, userId));
    } catch (e){
        console.log(e)
    }
};
