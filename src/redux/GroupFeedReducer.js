import { PostAPI } from "../api/PostApi";

const SET_GROUP_POSTS_PROGRESS = "SET_GROUP_POSTS_PROGRESS";
const SET_GROUP_POSTS_SUCCESS = "SET_GROUP_POSTS_SUCCESS";
const SET_GROUP_POSTS_FAIL = "SET_GROUP_POSTS_FAIL";
const ADD_GROUP_FEED_POST = "ADD_GROUP_FEED_POST";
const REMOVE_GROUP_FEED_POST = "REMOVE_GROUP_FEED_POST";
const SET_GROUP_FEED_PAGE = "SET_GROUP_FEED_PAGE";
const RESET_GROUP_FEED = "RESET_GROUP_FEED";
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
                error: "An error has occurred",
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


const startGetFeed = () => ({type: SET_GROUP_POSTS_PROGRESS});
const successGetFeed = (posts, page, totalPosts, totalPages, more) => ({type: SET_GROUP_POSTS_SUCCESS, payload: {posts, page, totalPosts, totalPages, more}});
const failGetFeed = () => ({type: SET_GROUP_POSTS_FAIL});
const addFeedPost = (data) => ({type: ADD_GROUP_FEED_POST, payload: data});
const removeFeedPost = (id) => ({type: REMOVE_GROUP_FEED_POST, payload: id});
const likeFeedPost = (postId, userId) => ({type: LIKE_GROUP_POST, payload: {postId, userId}});
const dislikeFeedPost = (postId, userId) => ({type: DISLIKE_GROUP_POST, payload: {postId, userId}});
export const resetGroupFeed = () => ({type: RESET_GROUP_FEED});
export const setGroupFeedPage = (page) => ({type: SET_GROUP_FEED_PAGE, payload: page});

export const syncronizeGroupCommentsUpdate = (postId, comments) => ({type: SYNCRONIZE_UPDATE_COMMENTS, payload: {postId, comments}});
export const syncronizeGroupPostUpdate = (postId, post) => ({type: SYNCRONIZE_POST_UPDATE, payload: {postId, post}});
export const syncronizeGroupPostDelete = (postId) => ({type: SYNCRONIZE_POST_DELETE, payload: postId});
export const syncronizeGroupPostLike = (postId, userId) => ({type: SYNCRONIZE_POST_LIKE, payload: {postId, userId}});
export const syncronizeGroupPostDislike = (postId, userId) => ({type: SYNCRONIZE_POST_DISLIKE, payload: {postId, userId}});


export const getGroupFeed = (groupId, token, limit, page) => async (dispatch) => {
    dispatch(startGetFeed());
    try{
        const res = await PostAPI.getGroupFeed(groupId, token, limit, page);
        dispatch(successGetFeed(res.posts, res.page, res.totalPosts, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFeed());
    }
};

export const addPostToGroupFeed = (post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.create(post, token);
        dispatch(addFeedPost(res.post));
    } catch (e){
        console.log(e)
    }
};

export const removePostFromGroupFeed = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(removeFeedPost(postId));
    } catch (e){
        console.log(e)
    }
};

export const likeGroupPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likeFeedPost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikeGroupPost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikeFeedPost(postId, userId));
    } catch (e){
        console.log(e)
    }
};


export default GroupFeedReducer;