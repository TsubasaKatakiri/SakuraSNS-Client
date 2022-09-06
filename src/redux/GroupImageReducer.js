import { CommentAPI } from "../api/CommentApi";
import { ImageAPI } from "../api/ImageApi";

const GET_IMAGE_PROGRESS = "GET_IMAGE_PROGRESS";
const GET_IMAGE_SUCCESS = "GET_IMAGE_SUCCESS";
const GET_IMAGE_FAIL = "GET_IMAGE_FAIL";
const RESET_IMAGE = "RESET_IMAGE";
const EDIT_IMAGE = "EDIT_IMAGE";
const DELETE_IMAGE = "DELETE_IMAGE";


const GET_COMMENTS_PROGRESS = "GET_COMMENTS_PROGRESS";
const GET_COMMENTS_SUCCESS = "GET_COMMENTS_SUCCESS";
const GET_COMMENTS_FAIL = "GET_COMMENTS_FAIL";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_COMMENT = "EDIT_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";
const LIKE_COMMENT = "LIKE_COMMENT";
const DISLIKE_COMMENT = "DISLIKE_COMMENT";


const initialState = {
    image: null,
    comments: null,
    imagesArray: null,
    isFetching: false,
    isFetchingComments: false,
    error: null,
    errorComments: null,
}


const GroupImageReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_IMAGE_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_IMAGE_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                image: action.payload,
            };
        case GET_IMAGE_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case RESET_IMAGE:
            return {
                ...state, 
                image: null,
                comments: null,
                imagesArray: null,
                isFetching: true,
                error: null,
            };
        case EDIT_IMAGE:
            return {
                ...state, 
                image: action.payload,
            };
        case DELETE_IMAGE:
            return {
                ...state, 
                image: null,
                inagesArray: state.imagesArray.filter(i=>i._id !== action.payload),
            };
         case GET_COMMENTS_PROGRESS:
            return {
                ...state, 
                isFetchingComments: true,
            };
        case GET_COMMENTS_SUCCESS:
            return {
                ...state, 
                isFetchingComments: false,
                comments: action.payload,
            };
        case GET_COMMENTS_FAIL:
            return {
                ...state, 
                isFetchingComments: false,
                errorComments: 'An error has occurred',
            };
        case ADD_COMMENT:
            return {
                ...state,
                image: {
                    ...state.image,
                    comments: [...state.image.comments, action.payload._id],
                },
                comments: [action.payload, ...state.comments],
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c => {
                    if(c._id === action.payload._id) c=action.payload;
                    return c;
                })}
        case DELETE_COMMENT:
            return {
                ...state,
                image: {
                    ...state.image,
                    comments: state.image.comments.filter(c => c !== action.payload),
                },
                comments: state.comments.filter(c=>c._id !== action.payload),
            }
        case LIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload.commentId){
                        return {
                            ...c,
                            dislikes: c.dislikes.includes(action.payload.userId) 
                                ? c.dislikes.filter(e => e !== action.payload.userId)
                                : c.dislikes,
                            likes: c.likes.includes(action.payload.userId) 
                                ? c.likes.filter(e => e !== action.payload.userId)
                                : [...c.likes, action.payload.userId]
                        }}
                    return c;
                })
            }
        case DISLIKE_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload.commentId){
                        return {
                            ...c,
                            likes: c.likes.includes(action.payload.userId) 
                                ? c.likes.filter(e => e !== action.payload.userId)
                                : c.likes,
                            dislikes: c.dislikes.includes(action.payload.userId) 
                                ? c.dislikes.filter(e => e !== action.payload.userId)
                                : [...c.dislikes, action.payload.userId]
                        }}
                    return c;
                })
            }
        default: 
            return state;
    }
}


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


export default GroupImageReducer;