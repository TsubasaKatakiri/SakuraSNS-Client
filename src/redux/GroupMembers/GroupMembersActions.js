import { GroupAPI } from '../../api/GroupApi';
import { GET_MEMBERS_FAIL, GET_MEMBERS_PROGRESS, GET_MEMBERS_SUCCESS, RESET_MEMBERS, RESET_SEARCH_QUERY, RESET_SEARCH_QUERY_ADVANCED_PARAMS, SET_SEARCH_QUERY } from './GroupMembersTypes';

const startGetMembers = () => ({type: GET_MEMBERS_PROGRESS});
const successGetMembers = (members, page, total, more) => ({type: GET_MEMBERS_SUCCESS, payload: {members, page, total, more}});
const failGetMembers = () => ({type: GET_MEMBERS_FAIL});
export const resetMembers = () => ({type: RESET_MEMBERS});
export const setMembersSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query});
export const resetMembersSearchQuery = () => ({type: RESET_SEARCH_QUERY});
export const resetMembersQueryAdvancedParams = () => ({type: RESET_SEARCH_QUERY_ADVANCED_PARAMS});


export const getMembers = (groupId, searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetMembers());
    try{
        const res = await GroupAPI.getGroupUsers(groupId, searchData, token, limit, page);
        dispatch(successGetMembers(res.members, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetMembers());
    }
};

export const getBans = (groupId, searchData, token, page) => async (dispatch) => {
    dispatch(startGetMembers());
    try{
        const res = await GroupAPI.getGroupBans(groupId, searchData, token, page);
        dispatch(successGetMembers(res.members, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetMembers());
    }
};

export const getRequests = (groupId, searchData, token, page) => async (dispatch) => {
    dispatch(startGetMembers());
    try{
        const res = await GroupAPI.getGroupRequests(groupId, searchData, token, page);
        dispatch(successGetMembers(res.members, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetMembers());
    }
};