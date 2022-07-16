import { GroupDiscussionAPI } from './../api/GroupDiscussionApi';

const GET_DISCUSSIONS_PROGRESS = "GET_DISCUSSIONS_PROGRESS";
const GET_DISCUSSIONS_SUCCESS = "GET_DISCUSSIONS_SUCCESS";
const GET_DISCUSSIONS_FAIL = "GET_DISCUSSIONS_FAIL";
const RESET_DISCUSSIONS = "RESET_DISCUSSIONS";

const GET_DISCUSSION = "GET_DISCUSSION";
const RESET_CURRENT_DISCUSSION = "RESET_CURRENT_DISCUSSION";

const GET_POSTS_PROGRESS = "GET_POSTS_PROGRESS";
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
const GET_POSTS_FAIL = "GET_POSTS_FAIL";
const RESET_POSTS = "RESET_POSTS";

const ADD_POST = "ADD_POST";
const DELETE_POST = "DELETE_POST";

const CHANGE_POST_PAGE = "CHANGE_POST_PAGE";

const HIDE_DISCUSSION = "HIDE_DISCUSSION";
const LOCK_DISCUSSION = "LOCK_DISCUSSION";
const DELETE_DISCUSSION = "DELETE_DISCUSSION";


const initialState = {
    discussions: null,
    currentDiscussion: null,
    posts: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: "",
}


const DiscussionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DISCUSSIONS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_DISCUSSIONS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                discussions: action.payload,
            };
        case GET_DISCUSSIONS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_DISCUSSIONS:
            return {
                ...state,
                discussions: null,
                isFetching: false,
                error: ""
            }
        case GET_DISCUSSION:
            return {
                ...state,
                currentDiscussion: action.payload,
            }
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
                error: "An error has occurred",
            };
        case RESET_POSTS:
            return {
                ...state,
                posts: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: ""
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
        case LOCK_DISCUSSION:
            return {
                ...state, 
                currentDiscussion: {
                    ...state.currentDiscussion,
                    isClosed: action.payload,
                },
            };
        case HIDE_DISCUSSION:
            return {
                ...state, 
                currentDiscussion: {
                    ...state.currentDiscussion,
                    isPrivate: action.payload,
                },
            };
        case RESET_CURRENT_DISCUSSION:
        case DELETE_DISCUSSION:
            return {
                ...state,
                currentDiscussion: null,
            }
        default: 
            return state;
    }
}


const startGetDiscussions = () => ({type: GET_DISCUSSIONS_PROGRESS});
const successGetDiscussions = (data) => ({type: GET_DISCUSSIONS_SUCCESS, payload: data});
const failGetDiscussions = () => ({type: GET_DISCUSSIONS_FAIL});
export const resetDiscussions = () => ({type: RESET_DISCUSSIONS});
const getDiscussion = (data) => ({type: GET_DISCUSSION, payload: data});
export const resetCurrentDiscussion = () => ({type: RESET_CURRENT_DISCUSSION});
const startGetPosts = () => ({type: GET_POSTS_PROGRESS});
const successGetPosts = (posts, page, total, more) => ({type: GET_POSTS_SUCCESS, payload: {posts, page, total, more}});
const failGetPosts = () => ({type: GET_POSTS_FAIL});
export const resetPosts = () => ({type: RESET_POSTS});
export const changePostPage = (page) => ({type: CHANGE_POST_PAGE, payload: page});
const addPost = (data) => ({type: ADD_POST, payload: data});
const deletePost = (data) => ({type: DELETE_POST, payload: data});
const hideDiscussion = (data) => ({type: HIDE_DISCUSSION, payload: data});
const lockDiscussion = (data) => ({type: LOCK_DISCUSSION, payload: data});
const deleteDiscussion = () => ({type: DELETE_DISCUSSION});


export const getDiscussions = (groupId, token) => async (dispatch) => {
    dispatch(startGetDiscussions());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussions(groupId, token);
        dispatch(successGetDiscussions(res.discussions));
    } catch (e){
        dispatch(failGetDiscussions());
    }
};

export const getSingleDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.getOneDiscussion(groupId, discussionId, userId, token);
        dispatch(getDiscussion(res.discussion));
    } catch (e){}
};

export const getDiscussionPosts = (groupId, discussionId, userId, token, page, limit) => async (dispatch) => {
    dispatch(startGetPosts());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussionPosts(groupId, discussionId, userId, token, limit, page);
        dispatch(successGetPosts(res.posts, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPosts());
    }
};

export const addDiscussionPost = (groupId, discussionId, postData, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.createDiscussionPost(groupId, discussionId, postData, token);
        dispatch(addPost(res.post));
    } catch (e){}
};

export const deleteDiscussionPost = (groupId, discussionId, postId, userId, token) => async (dispatch) => {
    try{
        await GroupDiscussionAPI.deleteDiscussionPost(groupId, discussionId, postId, userId, token);
        dispatch(deletePost(postId));
    } catch (e){}
};

export const closeDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.closeDiscussion(groupId, discussionId, userId, token);
        dispatch(lockDiscussion(res.isClosed));
    } catch (e){}
};

export const privateDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.hideDiscussion(groupId, discussionId, userId, token);
        dispatch(hideDiscussion(res.isPrivate));
    } catch (e){}
};

export const deleteCurrentDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        await GroupDiscussionAPI.deleteDiscussion(groupId, discussionId, userId, token);
        dispatch(deleteDiscussion());
    } catch (e){}
};


export default DiscussionReducer;