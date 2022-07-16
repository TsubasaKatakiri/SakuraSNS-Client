import { CommentAPI } from '../../api/CommentApi';
import { VideofileAPI } from '../../api/VideofileApi';
import { ADD_VIDEO_COMMENT, DELETE_VIDEO_COMMENT, DISLIKE_CURRENT_VIDEO, DISLIKE_VIDEO_COMMENT, GET_CURRENT_VIDEO_FAIL, GET_CURRENT_VIDEO_PROGRESS, GET_CURRENT_VIDEO_SUCCESS, GET_VIDEO_COMMENTS_FAIL, GET_VIDEO_COMMENTS_PROGRESS, GET_VIDEO_COMMENTS_SUCCESS, LIKE_CURRENT_VIDEO, LIKE_VIDEO_COMMENT, RESET_CURRENT_VIDEO, SET_FAVORITE_VIDEO, UNSET_FAVORITE_VIDEO, UPDATE_CURRENT_VIDEO, UPDATE_VIDEO_COMMENT } from './CurrentVideoTypes';

const startGetCurrentVideo = () => ({type: GET_CURRENT_VIDEO_PROGRESS});
const successGetCurrentVideo = (data) => ({type: GET_CURRENT_VIDEO_SUCCESS, payload: data});
const failGetCurrentVideo = () => ({type: GET_CURRENT_VIDEO_FAIL});
const likeCurrentVideo = (userId) => ({type: LIKE_CURRENT_VIDEO, payload: userId});
const dislikeCurrentVideo = (userId) => ({type: DISLIKE_CURRENT_VIDEO, payload: userId});
const updateCurrentVideo = (data) => ({type: UPDATE_CURRENT_VIDEO, payload: data});
const resetCurrentVideo = () => ({type: RESET_CURRENT_VIDEO});
const setFavorite = (userId) => ({type: SET_FAVORITE_VIDEO, payload: userId});
const unsetFavorite = (userId) => ({type: UNSET_FAVORITE_VIDEO, payload: userId});
const startGetVideoComments = () => ({type: GET_VIDEO_COMMENTS_PROGRESS});
const successGetVideoComments = (data) => ({type: GET_VIDEO_COMMENTS_SUCCESS, payload: data});
const failGetVideoComments = () => ({type: GET_VIDEO_COMMENTS_FAIL});
const addVideoComment = (comment) => ({type: ADD_VIDEO_COMMENT, payload: comment});
const removeVideoComment = (commentId) => ({type: DELETE_VIDEO_COMMENT, payload: commentId});
const updateVideoComment = (data) => ({type: UPDATE_VIDEO_COMMENT, payload: data});
const likeVideoComment = (userId, commentId) => ({type: LIKE_VIDEO_COMMENT, payload: {userId: userId, commentId: commentId}});
const dislikeVideoComment = (userId, commentId) => ({type: DISLIKE_VIDEO_COMMENT, payload: {userId: userId, commentId: commentId}});


export const getVideo = (id, token) => async (dispatch) => {
    dispatch(startGetCurrentVideo());
    try{
        const res = await VideofileAPI.getOne(id, token);
        dispatch(successGetCurrentVideo(res.videofile));
    } catch (e){
        dispatch(failGetCurrentVideo());
    }
};

export const likeVideo = (videoId, userId, token) => async (dispatch) => {
    try{
        await VideofileAPI.like(videoId, userId, token);
        dispatch(likeCurrentVideo(userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeVideo = (videoId, userId, token) => async (dispatch) => {
    try{
        await VideofileAPI.dislike(videoId, userId, token);
        dispatch(dislikeCurrentVideo(userId));
    } catch (e){
        console.log(e)
    }
};

export const updateVideo = (videoId, videofile, token) => async (dispatch) => {
    try{
        const res = await VideofileAPI.edit(videoId, videofile, token);
        dispatch(updateCurrentVideo(res.videofile));
    } catch (e){
        console.log(e)
    }
};

export const resetVideo = () => async (dispatch) => {
    dispatch(resetCurrentVideo());
};

export const setFavoriteVideo = (videoId, userId, token) => async (dispatch) => {
    try{
        await VideofileAPI.setFavorite(videoId, userId, token);
        dispatch(setFavorite(userId));
    } catch (e){
        console.log(e)
    }
};

export const unsetFavoriteVideo = (videoId, userId, token) => async (dispatch) => {
    try{
        await VideofileAPI.setFavorite(videoId, userId, token);
        dispatch(unsetFavorite(userId));
    } catch (e){
        console.log(e)
    }
};

export const getVideoComments = (videoId, token) => async (dispatch) => {
    dispatch(startGetVideoComments());
    try{
        const res = await CommentAPI.getComments(videoId, token);
        dispatch(successGetVideoComments(res.comments.sort((c1, c2) => {
            return new Date(c2.createdAt) - new Date(c1.createdAt);
        })));
    } catch (e){
        dispatch(failGetVideoComments());
    }
};

export const addCommentToVideo = (comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.create(comment, token);
        dispatch(addVideoComment(res.comment));
    } catch (e){
        console.log(e)
    }
};

export const removeCommentToVideo = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.deleteComment(commentId, userId, token);
        dispatch(removeVideoComment(commentId));
    } catch (e){
        console.log(e)
    }
};

export const updateCommentToVideo = (commentId, comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.update(commentId, comment, token);
        dispatch(updateVideoComment(res.comment));
    } catch (e){
        console.log(e)
    }
};

export const likeCommentToVideo = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.like(commentId, userId, token);
        dispatch(likeVideoComment(userId, commentId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeCommentToVideo = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.dislike(commentId, userId, token);
        dispatch(dislikeVideoComment(userId, commentId));
    } catch (e){
        console.log(e)
    }
};