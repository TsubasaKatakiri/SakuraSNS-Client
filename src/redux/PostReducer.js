import { PostAPI } from './../api/PostApi';

const SET_USER_POSTS_PROGRESS = "SET_USER_POSTS_PROGRESS";
const SET_USER_POSTS_SUCCESS = "SET_USER_POSTS_SUCCESS";
const SET_USER_POSTS_FAIL = "SET_USER_POSTS_FAIL";
const ADD_POST ="ADD_POST";
const DELETE_POST = "DELETE_POST";
const SET_PAGE = "SET_PAGE";
const LIKE_POST = "LIKE_POST";
const DISLIKE_POST = "DISLIKE_POST";
const RESET_USER_POSTS = "RESET_USER_POSTS";

const SYNCRONIZE_UPDATE_COMMENTS = "SYNCRONIZE_UPDATE_COMMENTS";
const SYNCRONIZE_POST_UPDATE = "SYNCRONIZE_POST_UPDATE";
const SYNCRONIZE_POST_DELETE = "SYNCRONIZE_POST_DELETE";
const SYNCRONIZE_POST_LIKE = "SYNCRONIZE_POST_LIKE";
const SYNCRONIZE_POST_DISLIKE = "SYNCRONIZE_POST_DISLIKE";


const initialState = {
    posts: [],
    postsLimit: 10,
    postsPage: 1,
    totalPostPages: null,
    morePosts: false,
    isFetching: false,
    error: "",
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
                error: "An error has occurred",
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
                error: "",
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


const startGetPosts = () => ({type: SET_USER_POSTS_PROGRESS});
const successGetPosts = (posts, page, total, more) => ({type: SET_USER_POSTS_SUCCESS, payload: {posts, page, total, more}});
const failGetPosts = () => ({type: SET_USER_POSTS_FAIL});
const addPost = (post) => ({type: ADD_POST, payload: post});
const deletePost = (id) => ({type: DELETE_POST, payload: id});
const likeSinglePost = (postId, userId) => ({type: LIKE_POST, payload: {postId, userId}});
const dislikeSinglePost = (postId, userId) => ({type: DISLIKE_POST, payload: {postId, userId}});
export const resetUserPosts = () => ({type: RESET_USER_POSTS});
export const setPostsPage = (page) => ({type: SET_PAGE, payload: page});

export const syncronizeCommentsUpdate = (postId, comments) => ({type: SYNCRONIZE_UPDATE_COMMENTS, payload: {postId, comments}});
export const syncronizePostUpdate = (postId, post) => ({type: SYNCRONIZE_POST_UPDATE, payload: {postId, post}});
export const syncronizePostDelete = (postId) => ({type: SYNCRONIZE_POST_DELETE, payload: postId});
export const syncronizePostLike = (postId, userId) => ({type: SYNCRONIZE_POST_LIKE, payload: {postId, userId}});
export const syncronizePostDislike = (postId, userId) => ({type: SYNCRONIZE_POST_DISLIKE, payload: {postId, userId}});


export const getPosts = (userId, token, page, limit) => async (dispatch) => {
    dispatch(startGetPosts());
    try{
        const res = await PostAPI.getUserPosts(userId, token, limit, page);
        dispatch(successGetPosts(res.posts, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPosts());
    }
};

export const createPost = (post, token) => async (dispatch) => {
    try{
        const res = await PostAPI.create(post, token);
        dispatch(addPost(res.post));
    } catch (e){
        console.log(e)
    }
};

export const removePost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.delete(postId, userId, token);
        dispatch(deletePost(postId));
    } catch (e){
        console.log(e)
    }
};

export const likePost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.like(postId, userId, token);
        dispatch(likeSinglePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};

export const dislikePost = (postId, userId, token) => async (dispatch) => {
    try{
        await PostAPI.dislike(postId, userId, token);
        dispatch(dislikeSinglePost(postId, userId));
    } catch (e){
        console.log(e)
    }
};


export default PostReducer;