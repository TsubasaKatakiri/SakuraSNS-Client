import { VideofileAPI } from './../api/VideofileApi';
import { CommentAPI } from './../api/CommentApi';

const GET_CURRENT_VIDEO_PROGRESS = "GET_CURRENT_VIDEO_PROGRESS";
const GET_CURRENT_VIDEO_SUCCESS = "GET_CURRENT_VIDEO_SUCCESS";
const GET_CURRENT_VIDEO_FAIL = "GET_CURRENT_VIDEO_FAIL";
const LIKE_CURRENT_VIDEO = "LIKE_CURRENT_VIDEO";
const DISLIKE_CURRENT_VIDEO = "DISLIKE_CURRENT_VIDEO";
const UPDATE_CURRENT_VIDEO = "UPDATE_CURRENT_VIDEO";
const RESET_CURRENT_VIDEO = "RESET_CURRENT_VIDEO";
const SET_FAVORITE_VIDEO = "SET_FAVORITE_VIDEO";
const UNSET_FAVORITE_VIDEO = "UNSET_FAVORITE_VIDEO";

const GET_VIDEO_COMMENTS_PROGRESS = "GET_VIDEO_COMMENTS_PROGRESS";
const GET_VIDEO_COMMENTS_SUCCESS = "GET_VIDEO_COMMENTS_SUCCESS";
const GET_VIDEO_COMMENTS_FAIL = "GET_VIDEO_COMMENTS_FAIL";
const ADD_VIDEO_COMMENT = "ADD_VIDEO_COMMENT";
const DELETE_VIDEO_COMMENT = "DELETE_VIDEO_COMMENT";
const UPDATE_VIDEO_COMMENT = "UPDATE_VIDEO_COMMENT";
const LIKE_VIDEO_COMMENT = "LIKE_VIDEO_COMMENT";
const DISLIKE_VIDEO_COMMENT = "DISLIKE_VIDEO_COMMENT";

//current video initial state
const initialState = {
    currentVideo: null,
    comments: null,
    isFetchingCurrent: false,
    isFetchingComments: false,
    error: "",
    errorComments: null,
}

//current video reducer
const CurrentVideoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CURRENT_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetchingCurrent: true,
            };
        case GET_CURRENT_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetchingCurrent: false,
                currentVideo: action.payload,
            };
        case GET_CURRENT_VIDEO_FAIL:
            return {
                ...state, 
                isFetchingCurrent: false,
                error: "An error has occured",
            };
        case LIKE_CURRENT_VIDEO:
            return {
                ...state, 
                currentVideo: {
                    ...state.currentVideo, 
                    likes: state.currentVideo.likes.includes(action.payload) 
                    ? state.currentVideo.likes.filter(e => e !== action.payload)
                    : [...state.currentVideo.likes, action.payload],
                    dislikes: state.currentVideo.dislikes.includes(action.payload) 
                        ? state.currentVideo.dislikes.filter(e => e !== action.payload)
                        : state.currentVideo.dislikes
                },
            };
         case DISLIKE_CURRENT_VIDEO:
            return {
                ...state, 
                currentVideo: {
                    ...state.currentVideo, 
                    dislikes: state.currentVideo.dislikes.includes(action.payload) 
                    ? state.currentVideo.dislikes.filter(e => e !== action.payload)
                    : [...state.currentVideo.dislikes, action.payload],
                    likes: state.currentVideo.likes.includes(action.payload) 
                        ? state.currentVideo.likes.filter(e => e !== action.payload)
                        : state.currentVideo.likes
                },
            };
        case UPDATE_CURRENT_VIDEO:
            return {
                ...state, 
                currentVideo: action.payload,
            };
        case RESET_CURRENT_VIDEO:
            return {
                ...state, 
                currentVideo: null,
            };
        case SET_FAVORITE_VIDEO:
            return {
                ...state, 
                currentVideo: {
                    ...state.currentVideo,
                    favorite: [action.payload, ...state.currentVideo.favorite],
                },
            };
        case UNSET_FAVORITE_VIDEO:
            console.log(state.currentVideo.favorite);
            console.log(state.currentVideo.favorite.filter(f => f !== action.payload));
            return {
                ...state, 
                currentVideo: {
                    ...state.currentVideo,
                    favorite: state.currentVideo.favorite.filter(f => f !== action.payload),
                },
            };

        case GET_VIDEO_COMMENTS_PROGRESS:
            return {
                ...state, 
                isFetchingComments: true,
            };
        case GET_VIDEO_COMMENTS_SUCCESS:
            return {
                ...state, 
                isFetchingComments: false,
                comments: action.payload,
            };
        case GET_VIDEO_COMMENTS_FAIL:
            return {
                ...state, 
                isFetchingComments: false,
                errorComments: "An error has occured",
            };
        case ADD_VIDEO_COMMENT:
            return {
                ...state, 
                comments: [action.payload, ...state.comments]
            };
        case DELETE_VIDEO_COMMENT:
            return {
                ...state, 
                comments: state.comments.filter(c => c._id !== action.payload),
            };
        case UPDATE_VIDEO_COMMENT:
            return{
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload._id){
                        return action.payload;
                    }
                    return c;
                })};
        case LIKE_VIDEO_COMMENT:
            return{
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
                        }
                    }
                    return c;
                })
            };
        case DISLIKE_VIDEO_COMMENT:
            return{
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
                        }
                    }
                    return c;
                })
            };
        default: 
            return state;
    }
}

//current video action creators
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

//current video thunks
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

export default CurrentVideoReducer;