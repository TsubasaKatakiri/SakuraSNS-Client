import { ADD_VIDEO_COMMENT, DELETE_VIDEO_COMMENT, DISLIKE_CURRENT_VIDEO, DISLIKE_VIDEO_COMMENT, GET_CURRENT_VIDEO_FAIL, GET_CURRENT_VIDEO_PROGRESS, GET_CURRENT_VIDEO_SUCCESS, GET_VIDEO_COMMENTS_FAIL, GET_VIDEO_COMMENTS_PROGRESS, GET_VIDEO_COMMENTS_SUCCESS, LIKE_CURRENT_VIDEO, LIKE_VIDEO_COMMENT, RESET_CURRENT_VIDEO, SET_FAVORITE_VIDEO, UNSET_FAVORITE_VIDEO, UPDATE_CURRENT_VIDEO, UPDATE_VIDEO_COMMENT } from './CurrentVideoTypes';

const initialState = {
    currentVideo: null,
    comments: null,
    isFetchingCurrent: false,
    isFetchingComments: false,
    error: '',
    errorComments: null,
}

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
                error: 'An error has occurred',
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

export default CurrentVideoReducer;