import { GroupDiscussionAPI } from "../api/GroupDiscussionApi";

const GET_DISCUSSION_PROGRESS = "GET_DISCUSSIONS_PROGRESS";
const GET_DISCUSSION_SUCCESS = "GET_DISCUSSIONS_SUCCESS";
const GET_DISCUSSION_FAIL = "GET_DISCUSSIONS_FAIL";
const RESET_DISCUSSION = "RESET_DISCUSSIONS";
const HIDE_DISCUSSION = "HIDE_DISCUSSION";
const LOCK_DISCUSSION = "LOCK_DISCUSSION";
const DELETE_DISCUSSION = "DELETE_DISCUSSION";


const initialState = {
    discussion: null,
    isFetching: false,
    error: '',
}


const CurrentDiscussionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DISCUSSION_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_DISCUSSION_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                discussion: action.payload,
            };
        case GET_DISCUSSION_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case LOCK_DISCUSSION:
            return {
                ...state, 
                discussion: {
                    ...state.discussion,
                    isClosed: action.payload,
                },
            };
        case HIDE_DISCUSSION:
            return {
                ...state, 
                discussion: {
                    ...state.discussion,
                    isPrivate: action.payload,
                },
            };
        case DELETE_DISCUSSION:
            return {
                ...state,
                discussion: null,
            }
        default: 
            return state;
    }
}


const startGetDiscussion = () => ({type: GET_DISCUSSION_PROGRESS});
const successGetDiscussion = (data) => ({type: GET_DISCUSSION_SUCCESS, payload: data});
const failGetDiscussion = () => ({type: GET_DISCUSSION_FAIL});
export const resetDiscussion = () => ({type: RESET_DISCUSSION});
const hideCurrentDiscussion = (data) => ({type: HIDE_DISCUSSION, payload: data});
const lockCurrentDiscussion = (data) => ({type: LOCK_DISCUSSION, payload: data});
const deleteCurrentDiscussion = () => ({type: DELETE_DISCUSSION});


export const getDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    dispatch(startGetDiscussion());
    try{
        const res = await GroupDiscussionAPI.getOneDiscussion(groupId, discussionId, userId, token);
        dispatch(successGetDiscussion(res.discussion));
    } catch (e){
        dispatch(failGetDiscussion());
    }
};

export const lockDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.closeDiscussion(groupId, discussionId, userId, token);
        dispatch(lockCurrentDiscussion(res.isClosed));
    } catch (e){}
};

export const hideDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.hideDiscussion(groupId, discussionId, userId, token);
        dispatch(hideCurrentDiscussion(res.isPrivate));
    } catch (e){}
};

export const deleteDiscussion = (groupId, discussionId, userId, token) => async (dispatch) => {
    try{
        await GroupDiscussionAPI.deleteDiscussion(groupId, discussionId, userId, token);
        dispatch(deleteCurrentDiscussion());
    } catch (e){}
};

export default CurrentDiscussionReducer;