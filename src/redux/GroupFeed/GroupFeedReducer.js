import { ADD_GROUP_FEED_POST, DISLIKE_GROUP_POST, LIKE_GROUP_POST, REMOVE_GROUP_FEED_POST, RESET_GROUP_FEED, SET_GROUP_FEED_PAGE, SET_GROUP_POSTS_FAIL, SET_GROUP_POSTS_PROGRESS, SET_GROUP_POSTS_SUCCESS, SYNCRONIZE_POST_DELETE, SYNCRONIZE_POST_DISLIKE, SYNCRONIZE_POST_LIKE, SYNCRONIZE_POST_UPDATE, SYNCRONIZE_UPDATE_COMMENTS } from './GroupFeedTypes';

const initialState = {
    feedPosts: [],
    feedLimit: 10,
    feedPage: 1,
    totalPosts: null,
    totalFeedPages: null,
    moreFeed: false,
    isFetching: false,
    error: '',
}


const GroupFeedReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_GROUP_POSTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case SET_GROUP_POSTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                feedPosts: [...state.feedPosts, ...action.payload.posts],
                feedPage: action.payload.page,
                totalPosts: action.payload.totalPosts,
                totalFeedPages: action.payload.totalPages,
                moreFeed: action.payload.more,
            };
        case SET_GROUP_POSTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case ADD_GROUP_FEED_POST:
            return {
                ...state, 
                feedPosts: [action.payload, ...state.feedPosts],
            };
        case SYNCRONIZE_POST_DELETE:
        case REMOVE_GROUP_FEED_POST:
            return {
                ...state, 
                feedPosts: state.feedPosts.filter(p => p._id !== action.payload),
            };
        case SET_GROUP_FEED_PAGE:
            return {
                feedPage: action.payload,
            };
        case RESET_GROUP_FEED:
            return {
                feedPosts: [],
                feedPage: 1,
                isFetching: false,
                totalPosts: null,
                totalFeedPages: null,
                moreFeed: false, 
                error: '',
            };
        case SYNCRONIZE_POST_LIKE:
        case LIKE_GROUP_POST:
            return {
                ...state, 
                feedPosts: state.feedPosts.map(post => {
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
        case DISLIKE_GROUP_POST:
            return {
                ...state, 
                feedPosts: state.feedPosts.map(post => {
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
                feedPosts: state.feedPosts.map(post => {
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
                feedPosts: state.feedPosts.map(p => {
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

export default GroupFeedReducer;