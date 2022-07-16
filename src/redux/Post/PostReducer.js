import { ADD_POST, DELETE_POST, DISLIKE_POST, LIKE_POST, RESET_USER_POSTS, SET_PAGE, SET_USER_POSTS_FAIL, SET_USER_POSTS_PROGRESS, SET_USER_POSTS_SUCCESS, SYNCRONIZE_POST_DELETE, SYNCRONIZE_POST_DISLIKE, SYNCRONIZE_POST_LIKE, SYNCRONIZE_POST_UPDATE, SYNCRONIZE_UPDATE_COMMENTS } from './PostTypes';

const initialState = {
    posts: [],
    postsLimit: 10,
    postsPage: 1,
    totalPostPages: null,
    morePosts: false,
    isFetching: false,
    error: '',
}


const PostReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_POSTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case SET_USER_POSTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                posts: [...state.posts, ...action.payload.posts],
                postsPage: action.payload.page,
                totalPostPages: action.payload.total,
                morePosts: action.payload.more,
            };
        case SET_USER_POSTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case ADD_POST:
            return {
                ...state, 
                posts: [action.payload, ...state.posts],
            };
        case SYNCRONIZE_POST_DELETE:
        case DELETE_POST:
            return {
                ...state, 
                posts: state.posts.filter(p => p._id !== action.payload),
            };
        case SET_PAGE:
            return {
                postsPage: action.payload,
            };
        case RESET_USER_POSTS:
            return {
                posts: [],
                postsPage: 1,
                isFetching: false,
                totalPostPages: null,
                morePosts: false, 
                error: '',
            };
        case SYNCRONIZE_POST_LIKE:
        case LIKE_POST:
            return {
                ...state, 
                posts: state.posts.map(post => {
                    if(post._id === action.payload.postId){
                        post = {
                            ...post, 
                            likes:post.likes.includes(action.payload.userId) 
                                ? post.likes.filter(e => e !== action.payload.userId)
                                : [...post.likes, action.payload.userId],
                            dislikes: post.dislikes.includes(action.payload.userId) 
                                ? post.dislikes.filter(e => e !== action.payload.userId)
                                : post.dislikes
                        }
                    };
                    return post;
                })
            };
        case SYNCRONIZE_POST_DISLIKE:
        case DISLIKE_POST:
            return {
                ...state, 
                posts: state.posts.map(post => {
                    if(post._id === action.payload.postId){
                        post = {
                            ...post, 
                            dislikes: post.dislikes.includes(action.payload.userId) 
                                ? post.dislikes.filter(e => e !== action.payload.userId)
                                : [...post.dislikes, action.payload.userId],
                            likes: post.likes.includes(action.payload.userId) 
                                ? post.likes.filter(e => e !== action.payload.userId)
                                : post.likes
                        }
                    };
                    return post;
                })
            };
        case SYNCRONIZE_UPDATE_COMMENTS:
            return {
                ...state,
                posts: state.posts.map(post => {
                    if(post._id === action.payload.postId){
                        post = {
                            ...post, 
                            comments: action.payload.comments
                        }
                    };
                    return post;
                })
            };
        case SYNCRONIZE_POST_UPDATE:
            return {
                ...state, 
                posts: state.posts.map(p => {
                    if(p._id === action.payload.postId){
                        p = action.payload.post
                    };
                    return p;
                })
            };
        default: 
            return state;
    }
}

export default PostReducer;