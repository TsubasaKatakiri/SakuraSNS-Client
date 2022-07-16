import { ADD_POST_COMMENT, DELETE_POST, DELETE_POST_COMMENT, DISLIKE_COMMENT, DISLIKE_POST, EDIT_COMMENT, EDIT_POST, GET_COMMENTS_FAIL, GET_COMMENTS_PROGRESS, GET_COMMENTS_SUCCESS, GET_POST_FAIL, GET_POST_PROGRESS, GET_POST_SUCCESS, LIKE_COMMENT, LIKE_POST, RESET_POST } from './CurrentFeedPostTypes';

const initialState = {
    post: null,
    isFetching: false,
    error: null,
    comments: null,
    isFetchingComments: false,
    errorComments: null,
}


const CurrentFeedPostReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_POST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                post: action.payload,
            };
        case GET_POST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case EDIT_POST:
            return {
                ...state, 
                post: action.payload,
            };
        case DELETE_POST:
        case RESET_POST:
            return {
                ...state, 
                post: null,
                isFetching: false,
                error: null,
                comments: null,
                isFetchingComments: false,
                errorComments: null,
            };
        case LIKE_POST:
            return {
                ...state, 
                post: { 
                    ...state.post, 
                    likes: state.post.likes.includes(action.payload.userId) 
                        ? state.post.likes.filter(e => e !== action.payload.userId)
                        : [...state.post.likes, action.payload.userId],
                    dislikes: state.post.dislikes.includes(action.payload.userId) 
                        ? state.post.dislikes.filter(e => e !== action.payload.userId)
                        : state.post.dislikes
                }
            };
        case DISLIKE_POST:
            return {
                ...state, 
                post: { 
                    ...state.post, 
                    dislikes: state.post.dislikes.includes(action.payload.userId) 
                        ? state.post.dislikes.filter(e => e !== action.payload.userId)
                        : [...state.post.dislikes, action.payload.userId],
                    likes: state.post.likes.includes(action.payload.userId) 
                        ? state.post.likes.filter(e => e !== action.payload.userId)
                        : state.post.likes
                }
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
        case ADD_POST_COMMENT:
            console.log(action.payload);
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [...state.post.comments, action.payload._id],
                },
                comments: [action.payload, ...state.comments],
            }
        case EDIT_COMMENT:
            return {
                ...state,
                comments: state.comments.map(c=>{
                    if(c._id === action.payload._id) c=action.payload;
                    return c;
                })
            }
        case DELETE_POST_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: state.post.comments.filter(c => c !== action.payload),
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

export default CurrentFeedPostReducer;