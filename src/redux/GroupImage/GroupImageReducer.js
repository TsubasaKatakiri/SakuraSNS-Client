import { ADD_COMMENT, DELETE_COMMENT, DELETE_IMAGE, DISLIKE_COMMENT, EDIT_COMMENT, EDIT_IMAGE, GET_COMMENTS_FAIL, GET_COMMENTS_PROGRESS, GET_COMMENTS_SUCCESS, GET_IMAGE_FAIL, GET_IMAGE_PROGRESS, GET_IMAGE_SUCCESS, LIKE_COMMENT, RESET_IMAGE } from './GroupImageTypes';

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
                error: 'An error has occured',
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
                inagesArray: state.imagesArray.filter(i => i._id !== action.payload),
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

export default GroupImageReducer;