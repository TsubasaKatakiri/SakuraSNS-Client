import { ADD_POST, CHANGE_POST_PAGE, DELETE_POST, GET_POSTS_FAIL, GET_POSTS_PROGRESS, GET_POSTS_SUCCESS, RESET_POSTS } from './GroupDiscussionPostTypes';

const initialState = {
    posts: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}


const DiscussionPostReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POSTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                posts: action.payload.posts,
                page: action.payload.page,
                totalPages: action.payload.total,
                more: action.payload.more,
            };
        case GET_POSTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_POSTS:
            return {
                ...state,
                posts: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: ''
            }
        case CHANGE_POST_PAGE:
            return {
                ...state,
                page: action.payload,
            }
        case ADD_POST:
            return {
                ...state, 
                posts: state.page === state.totalPages? [...state.posts, action.payload] : state.posts,
            };
        case DELETE_POST:
            return {
                ...state, 
                posts: state.posts.filter(p => p._id !== action.payload),
            };
        default: 
            return state;
    }
}

export default DiscussionPostReducer;