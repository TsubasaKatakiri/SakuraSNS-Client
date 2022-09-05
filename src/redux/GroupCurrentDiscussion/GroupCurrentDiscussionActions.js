import { GroupDiscussionAPI } from '../../api/GroupDiscussionApi';
import { DELETE_DISCUSSION, GET_DISCUSSION_FAIL, GET_DISCUSSION_PROGRESS, GET_DISCUSSION_SUCCESS, HIDE_DISCUSSION, LOCK_DISCUSSION, RESET_DISCUSSION } from './GroupCurrentDiscussionTypes';

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