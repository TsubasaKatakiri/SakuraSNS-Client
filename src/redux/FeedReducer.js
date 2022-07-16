import { PostAPI } from "../api/PostApi";

const SET_FEED_POSTS_PROGRESS = "SET_FEED_POSTS_PROGRESS";
const SET_FEED_POSTS_SUCCESS = "SET_FEED_POSTS_SUCCESS";
const SET_FEED_POSTS_FAIL = "SET_FEED_POSTS_FAIL";
const ADD_FEED_POST = "ADD_FEED_POST";
const REMOVE_FEED_POST = "REMOVE_FEED_POST";
const SET_FEED_PAGE = "SET_FEED_PAGE";
const RESET_FEED = "RESET_FEED";
const LIKE_GROUP_POST = "LIKE_GROUP_POST";
const DISLIKE_GROUP_POST = "DISLIKE_GROUP_POST";

const SYNCRONIZE_UPDATE_COMMENTS = "SYNCRONIZE_UPDATE_COMMENTS";
const SYNCRONIZE_POST_UPDATE = "SYNCRONIZE_POST_UPDATE";
const SYNCRONIZE_POST_DELETE = "SYNCRONIZE_POST_DELETE";
const SYNCRONIZE_POST_LIKE = "SYNCRONIZE_POST_LIKE";
const SYNCRONIZE_POST_DISLIKE = "SYNCRONIZE_POST_DISLIKE";


const initialState = {
    feedPosts: [],
    feedLimit: 10,
    feedPage: 1,
    totalPosts: null,
    totalFeedPages: null,
    moreFeed: false,
    isFetching: false,
    error: "",
}


const FeedReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_FEED_POSTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case SET_FEED_POSTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                feedPosts: [...state.feedPosts, ...action.payload.posts],
                feedPage: action.payload.page,
                totalPosts: action.payload.totalPosts,
                totalFeedPages: action.payload.totalPages,
                moreFeed: action.payload.more,
            };
        case SET_FEED_POSTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case ADD_FEED_POST:
            return {
                ...state, 
                feedPosts: [action.payload, ...state.feedPosts],
            };
        case SYNCRONIZE_POST_DELETE:
        case REMOVE_FEED_POST:
            return {
                ...state, 
                feedPosts: state.feedPosts.filter(p => p._id !== action.payload),
            };
        case SET_FEED_PAGE:
            return {
                feedPage: action.payload,
            };
        case RESET_FEED:
            return {
                feedPosts: [],
                feedPage: 1,
                isFetching: false,
                totalPosts: null,
                totalFeedPages: null,
                moreFeed: false, 
                error: "",
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


const startGetFeed = () => ({type: SET_FEED_POSTS_PROGRESS});
const successGetFeed = (posts, page, totalPosts, totalPages, more) => ({type: SET_FEED_POSTS_SUCCESS, payload: {posts, page, totalPosts, totalPages, more}});
const failGetFeed = () => ({type: SET_FEED_POSTS_FAIL});
const addFeedPost = (data) => ({type: ADD_FEED_POST, payload: data});
const removeFeedPost = (id) => ({type: REMOVE_FEED_POST, payload: id});
const likePost = (postId, userId) => ({type: LIKE_GROUP_POST, payload: {postId, userId}});
const dislikePost = (postId, userId) => ({type: DISLIKE_GROUP_POST, payload: {postId, userId}});
export const resetFeed = () => ({type: RESET_FEED});
export const setFeedPage = (page) => ({type: SET_FEED_PAGE, payload: page});

export const syncronizeFeedCommentsUpdate = (postId, comments) => ({type: SYNCRONIZE_UPDATE_COMMENTS, payload: {postId, comments}});
export const syncronizeFeedPostUpdate = (postId, post) => ({type: SYNCRONIZE_POST_UPDATE, payload: {postId, post}});
export const syncronizeFeedPostDelete = (postId) => ({type: SYNCRONIZE_POST_DELETE, payload: postId});
export const syncronizeFeedPostLike = (postId, userId) => ({type: SYNCRONIZE_POST_LIKE, payload: {postId, userId}});
export const syncronizeFeedPostDislike = (postId, userId) => ({type: SYNCRONIZE_POST_DISLIKE, payload: {postId, userId}});


export const getFeed = (userId, token, page, limit) => async (dispatch) => {
    dispatch(startGetFeed());
    try{
        const res = await PostAPI.getFeed(userId, token, limit, page);
        dispatch(successGetFeed(res.posts, res.page, res.totalPosts, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFeed());
    }
};

export const getTagFeed = (tag, token, page, limit) => async (dispatch) => {
    dispatch(startGetFeed());
    try{
        const res = await PostAPI.getTagPosts(tag, token, page, limit);
        dispatch(successGetFeed(res.posts, res.page, res.totalPosts, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFeed());
    }
};

export const addPostToFeed = (post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.create(post, token);
        dispatch(addFeedPost(res.post));
    } catch (e){
        console.log(e)
    }
};

export const removePostFromFeed = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(removeFeedPost(postId));
    } catch (e){
        console.log(e)
    }
};

export const likeFeedPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeFeedPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};


export default FeedReducer;