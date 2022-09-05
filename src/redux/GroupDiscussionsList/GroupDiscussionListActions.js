import { GroupDiscussionAPI } from '../../api/GroupDiscussionApi';
import { ADD_DISCUSSION, GET_DISCUSSIONS_LIST_FAIL, GET_DISCUSSIONS_LIST_PROGRESS, GET_DISCUSSIONS_LIST_SUCCESS, RESET_DISCUSSIONS_LIST } from './GroupDiscussionListTypes';

const startGetDiscussions = () => ({type: GET_DISCUSSIONS_LIST_PROGRESS});
const successGetDiscussions = (data) => ({type: GET_DISCUSSIONS_LIST_SUCCESS, payload: data});
const failGetDiscussions = () => ({type: GET_DISCUSSIONS_LIST_FAIL});
export const resetDiscussions = () => ({type: RESET_DISCUSSIONS_LIST});
const addNewDiscussion = (data) => ({type: ADD_DISCUSSION, payload: data});


export const getDiscussions = (groupId, token) => async (dispatch) => {
    dispatch(startGetDiscussions());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussions(groupId, token);
        dispatch(successGetDiscussions(res.discussions));
    } catch (e){
        dispatch(failGetDiscussions());
    }
};

export const addDiscussion = (groupId, discussion, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.createDiscussion(groupId, discussion, token);
        dispatch(addNewDiscussion(res.discussion));
    } catch (e){}
};
