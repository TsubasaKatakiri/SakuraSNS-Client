import { CommentAPI } from '../../api/CommentApi';
import { ImageAPI } from '../../api/ImageApi';
import { ADD_COMMENT, DELETE_COMMENT, DELETE_IMAGE, DISLIKE_COMMENT, EDIT_COMMENT, EDIT_IMAGE, GET_COMMENTS_FAIL, GET_COMMENTS_PROGRESS, GET_COMMENTS_SUCCESS, GET_IMAGE_FAIL, GET_IMAGE_PROGRESS, GET_IMAGE_SUCCESS, LIKE_COMMENT, RESET_IMAGE } from './GroupImageTypes';

const startGetImage = () => ({type: GET_IMAGE_PROGRESS});
const successGetImage = (image) => ({type: GET_IMAGE_SUCCESS, payload: image});
const failGetImage = () => ({type: GET_IMAGE_FAIL});
export const resetImage = () => ({type: RESET_IMAGE});
const editImage = (image) => ({type: EDIT_IMAGE, payload: image});
const deleteImage = (imageId) => ({type: DELETE_IMAGE, payload: imageId});
const startGetComments = () => ({type: GET_COMMENTS_PROGRESS});
const successGetComments = (comments) => ({type: GET_COMMENTS_SUCCESS, payload: comments});
const failGetComments = () => ({type: GET_COMMENTS_FAIL});
const addImageComment = (data) => ({type: ADD_COMMENT, payload: data});
const updateImageComment = (data) => ({type: EDIT_COMMENT, payload: data});
const deleteImageComment = (commentId) => ({type: DELETE_COMMENT, payload: commentId});
const likeImageComment = (userId, commentId) => ({type: LIKE_COMMENT, payload: {userId, commentId}});
const dislikeImageComment = (userId, commentId) => ({type: DISLIKE_COMMENT, payload: {userId, commentId}});


export const getGroupImage = (imageId, token) => async (dispatch) => {
    dispatch(startGetImage());
    try{
        const res = await ImageAPI.getOne(imageId, token);
        dispatch(successGetImage(res.image));
    } catch (e){
        dispatch(failGetImage());
    }
};

export const editGroupImage = (imageId, imageData, token) => async (dispatch) => {
    try{
        const res = await ImageAPI.update(imageId, imageData, token);
        dispatch(editImage(res.image));
    } catch (e){}
};

export const deleteGroupImage = (imageId, userId, token) => async (dispatch) => {
    try{
        await ImageAPI.delete(imageId, userId, token);
        dispatch(deleteImage(imageId));
    } catch (e){}
};

export const getGroupImageComments = (entryId, token) => async (dispatch) => {
    dispatch(startGetComments());
    try{
        const res = await CommentAPI.getComments(entryId, token);
        dispatch(successGetComments(res.comments));
    } catch (e){
        dispatch(failGetComments());
    }
};

export const addGroupImageComment = (comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.create(comment, token);
        dispatch(addImageComment(res.comment));
    } catch (e){}
};

export const updateGroupImageComment = (commentId, comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.update(commentId, comment, token);
        dispatch(updateImageComment(res.comment));
    } catch (e){}
};

export const deleteGroupImageComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.deleteComment(commentId, userId, token);
        dispatch(deleteImageComment(commentId));
    } catch (e){}
};

export const likeGroupImageComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.like(commentId, userId, token);
        dispatch(likeImageComment(userId, commentId));
    } catch (e){}
};

export const dislikeGroupImageComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.dislike(commentId, userId, token);
        dispatch(dislikeImageComment(userId, commentId));
    } catch (e){}
};
