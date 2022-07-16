import { GroupDiscussionAPI } from '../../api/GroupDiscussionApi';
import { GroupEventAPI } from '../../api/GroupEventApi';
import { GroupInfoAPI } from '../../api/GroupInfoBlockApi';
import { GET_PAGE_DISCUSSIONS_FAIL, GET_PAGE_DISCUSSIONS_PROGRESS, GET_PAGE_DISCUSSIONS_SUCCESS, GET_PAGE_EVENTS_FAIL, GET_PAGE_EVENTS_PROGRESS, GET_PAGE_EVENTS_SUCCESS, GET_PAGE_INFO_FAIL, GET_PAGE_INFO_PROGRESS, GET_PAGE_INFO_SUCCESS, RESET_PAGE_DISCUSSIONS, RESET_PAGE_EVENTS, RESET_PAGE_INFO } from './GroupContentTypes';

const startGetInfo = () => ({type: GET_PAGE_INFO_PROGRESS});
const successGetInfo = (info) => ({type: GET_PAGE_INFO_SUCCESS, payload: info});
const failGetInfo = () => ({type: GET_PAGE_INFO_FAIL});
export const resetGroupInfo = () => ({type: RESET_PAGE_INFO});
const startGetEvents = () => ({type: GET_PAGE_EVENTS_PROGRESS});
const successGetEvents = (events) => ({type: GET_PAGE_EVENTS_SUCCESS, payload: events});
const failGetEvents = () => ({type: GET_PAGE_EVENTS_FAIL});
export const resetGroupEvents = () => ({type: RESET_PAGE_EVENTS});
const startGetDiscussions = () => ({type: GET_PAGE_DISCUSSIONS_PROGRESS});
const successGetDiscussions = (discussions) => ({type: GET_PAGE_DISCUSSIONS_SUCCESS, payload: discussions});
const failGetDiscussions = () => ({type: GET_PAGE_DISCUSSIONS_FAIL});
export const resetGroupDiscussions = () => ({type: RESET_PAGE_DISCUSSIONS});


export const getGroupInfo = (groupId, token) => async (dispatch) => {
    dispatch(startGetInfo());
    try{
        const res = await GroupInfoAPI.getAllInfoBlocks(groupId, token)
        dispatch(successGetInfo(res.infoBlocks));
    } catch (e){
        dispatch(failGetInfo());
    }
};

export const getGroupEvents = (groupId, token) => async (dispatch) => {
    dispatch(startGetEvents());
    try{
        const res = await GroupEventAPI.getAllEvents(groupId, token);
        dispatch(successGetEvents(res.events));
    } catch (e){
        dispatch(failGetEvents());
    }
};

export const getGroupDiscussions = (groupId, token) => async (dispatch) => {
    dispatch(startGetDiscussions());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussions(groupId, token);
        dispatch(successGetDiscussions(res.discussions));
    } catch (e){
        dispatch(failGetDiscussions());
    }
};