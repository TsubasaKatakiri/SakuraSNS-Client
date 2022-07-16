import { GroupDiscussionAPI } from "../api/GroupDiscussionApi";

const GET_POSTS_PROGRESS = 'GET_POSTS_PROGRESS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_FAIL = 'GET_POSTS_FAIL';
const RESET_POSTS = 'RESET_POSTS';
const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const CHANGE_POST_PAGE = 'CHANGE_POST_PAGE';


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


const startGetPosts = () => ({type: GET_POSTS_PROGRESS});
const successGetPosts = (posts, page, total, more) => ({type: GET_POSTS_SUCCESS, payload: {posts, page, total, more}});
const failGetPosts = () => ({type: GET_POSTS_FAIL});
export const resetPosts = () => ({type: RESET_POSTS});
export const changePostPage = (page) => ({type: CHANGE_POST_PAGE, payload: page});
const addDiscussionPost = (data) => ({type: ADD_POST, payload: data});
const deleteDiscussionPost = (data) => ({type: DELETE_POST, payload: data});


export const getPosts = (groupId, discussionId, userId, token, page) => async (dispatch) => {
    dispatch(startGetPosts());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussionPosts(groupId, discussionId, userId, token, page);
        dispatch(successGetPosts(res.posts, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPosts());
    }
};

export const addPost = (groupId, discussionId, postData, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.createDiscussionPost(groupId, discussionId, postData, token);
        dispatch(addDiscussionPost(res.post));
    } catch (e){}
};

export const deletePost = (groupId, discussionId, postId, userId, token) => async (dispatch) => {
    try{
        await GroupDiscussionAPI.deleteDiscussionPost(groupId, discussionId, postId, userId, token);
        dispatch(deleteDiscussionPost(postId));
    } catch (e){}
};


export default DiscussionPostReducer;