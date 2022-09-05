import { ADD_POST_COMMENT, DELETE_POST, DELETE_POST_COMMENT, DISLIKE_COMMENT, DISLIKE_POST, EDIT_COMMENT, EDIT_POST, GET_COMMENTS_FAIL, GET_COMMENTS_PROGRESS, GET_COMMENTS_SUCCESS, GET_POST_FAIL, GET_POST_PROGRESS, GET_POST_SUCCESS, LIKE_COMMENT, LIKE_POST, RESET_POST } from "./CurrentFeedPostTypes";
import { PostAPI } from './../../api/PostApi';
import { CommentAPI } from "../../api/CommentApi";

const startGetPost = () => ({type: GET_POST_PROGRESS});
const successGetPost = (post) => ({type: GET_POST_SUCCESS, payload: post});
const failGetPost = () => ({type: GET_POST_FAIL});
export const resetPost = () => ({type: RESET_POST});
const editPost = (post) => ({type: EDIT_POST, payload: post});
const deletePost = (postId) => ({type: DELETE_POST, payload: postId});
const likePost = (postId, userId) => ({type: LIKE_POST, payload: {postId, userId}});
const dislikePost = (postId, userId) => ({type: DISLIKE_POST, payload: {postId, userId}});
const startGetComments = () => ({type: GET_COMMENTS_PROGRESS});
const successGetComments = (comments) => ({type: GET_COMMENTS_SUCCESS, payload: comments});
const failGetComments = () => ({type: GET_COMMENTS_FAIL});
const addPostComment = (comment) => ({type: ADD_POST_COMMENT, payload: comment});
const updatePostComment = (data) => ({type: EDIT_COMMENT, payload: data});
const deletePostComment = (commentId) => ({type: DELETE_POST_COMMENT, payload: commentId});
const likePostComment = (userId, commentId) => ({type: LIKE_COMMENT, payload: {userId, commentId}});
const dislikePostComment = (userId, commentId) => ({type: DISLIKE_COMMENT, payload: {userId, commentId}});


export const getFeedPost = (postId, token) => async (dispatch) => {
    dispatch(startGetPost());
    try{
        const res = await PostAPI.getPost(postId, token);
        dispatch(successGetPost(res.post));
    } catch (e){
        dispatch(failGetPost());
    }
};

export const editFeedPost = (postId, post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.update(postId, post, token);
        dispatch(editPost(res.post));
    } catch (e){}
};

export const deleteFeedPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(deletePost(postId));
    } catch (e){}
};

export const likeCurrentPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeCurrentPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const getFeedPostComments = (entryId, token) => async (dispatch) => {
    dispatch(startGetComments());
    try{
        const res = await CommentAPI.getComments(entryId, token);
        dispatch(successGetComments(res.comments));
    } catch (e){
        dispatch(failGetComments());
    }
};

export const addFeedPostComment = (comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.create(comment, token);
        dispatch(addPostComment(res.comment));
    } catch (e){}
};

export const updateFeedPostComment = (commentId, comment, token) => async (dispatch) => {
    try{
        const res = await CommentAPI.update(commentId, comment, token);
        dispatch(updatePostComment(res.comment));
    } catch (e){}
};

export const deleteFeedPostComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.deleteComment(commentId, userId, token);
        dispatch(deletePostComment(commentId));
    } catch (e){}
};

export const likeFeedPostComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.like(commentId, userId, token);
        dispatch(likePostComment(userId, commentId));
    } catch (e){}
};

export const dislikeFeedPostComment = (commentId, userId, token) => async (dispatch) => {
    try{
        await CommentAPI.dislike(commentId, userId, token);
        dispatch(dislikePostComment(userId, commentId));
    } catch (e){}
};