import { PostAPI } from "../../api/PostApi";
import { ADD_FEED_POST, DISLIKE_GROUP_POST, LIKE_GROUP_POST, REMOVE_FEED_POST, RESET_FEED, SET_FEED_PAGE, SET_FEED_POSTS_FAIL, SET_FEED_POSTS_PROGRESS, SET_FEED_POSTS_SUCCESS, SYNCRONIZE_POST_DELETE, SYNCRONIZE_POST_DISLIKE, SYNCRONIZE_POST_LIKE, SYNCRONIZE_POST_UPDATE, SYNCRONIZE_UPDATE_COMMENTS } from "./FeedTypes";

const startGetFeed = () => ({type: SET_FEED_POSTS_PROGRESS});
const successGetFeed = (posts, page, totalPosts, totalPages, more) => ({type: SET_FEED_POSTS_SUCCESS, payload: {posts, page, totalPosts, totalPages, more}});
const failGetFeed = () => ({type: SET_FEED_POSTS_FAIL});
const addFeedPost = (data) => ({type: ADD_FEED_POST, payload: data});
const removeFeedPost = (id) => ({type: REMOVE_FEED_POST, payload: id});
const likePost = (postId, userId) => ({type: LIKE_GROUP_POST, payload: {postId, userId}});
const dislikePost = (postId, userId) => ({type: DISLIKE_GROUP_POST, payload: {postId, userId}});
export const resetFeed = () => ({type: RESET_FEED});
export const setFeedPage = (page) => ({type: SET_FEED_PAGE, payload: page});
export const syncronizeFeedCommentsUpdate = (postId, comments) => ({type: SYNCRONIZE_UPDATE_COMMENTS, payload: {postId, comments}});
export const syncronizeFeedPostUpdate = (postId, post) => ({type: SYNCRONIZE_POST_UPDATE, payload: {postId, post}});
export const syncronizeFeedPostDelete = (postId) => ({type: SYNCRONIZE_POST_DELETE, payload: postId});
export const syncronizeFeedPostLike = (postId, userId) => ({type: SYNCRONIZE_POST_LIKE, payload: {postId, userId}});
export const syncronizeFeedPostDislike = (postId, userId) => ({type: SYNCRONIZE_POST_DISLIKE, payload: {postId, userId}});


export const getFeed = (userId, token, page, limit) => async (dispatch) => {
    dispatch(startGetFeed());
    try{
        const res = await PostAPI.getFeed(userId, token, limit, page);
        dispatch(successGetFeed(res.posts, res.page, res.totalPosts, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFeed());
    }
};

export const getTagFeed = (tag, token, page, limit) => async (dispatch) => {
    dispatch(startGetFeed());
    try{
        const res = await PostAPI.getTagPosts(tag, token, page, limit);
        dispatch(successGetFeed(res.posts, res.page, res.totalPosts, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFeed());
    }
};

export const addPostToFeed = (post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.create(post, token);
        dispatch(addFeedPost(res.post));
    } catch (e){
        console.log(e)
    }
};

export const removePostFromFeed = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(removeFeedPost(postId));
    } catch (e){
        console.log(e)
    }
};

export const likeFeedPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeFeedPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};