import { GroupAPI } from '../../api/GroupApi';
import { GET_GROUPS_FAIL, GET_GROUPS_PROGRESS, GET_GROUPS_SUCCESS, RESET_GROUPS, RESET_SEARCH_QUERY, RESET_SEARCH_QUERY_ADVANCED_PARAMS, SET_SEARCH_QUERY } from './GroupSearchTypes';

const startGetGroups = () => ({type: GET_GROUPS_PROGRESS});
const successGetGroups = (groups, page, total, more) => ({type: GET_GROUPS_SUCCESS, payload: {groups, page, total, more}});
const failGetGroups = () => ({type: GET_GROUPS_FAIL});
export const resetGroups = () => ({type: RESET_GROUPS});
export const setGroupsSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query});
export const resetGroupsSearchQuery = () => ({type: RESET_SEARCH_QUERY});
export const resetQueryAdvancedParams = () => ({type: RESET_SEARCH_QUERY_ADVANCED_PARAMS});


export const getGroups = (searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetGroups());
    try{
        const res = await GroupAPI.getAllGroups(searchData, token, limit, page);
        dispatch(successGetGroups(res.groups, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetGroups());
    }
};

export const getUserGroups = (userId, searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetGroups());
    try{
        const res = await GroupAPI.getAllUserGroups(userId, searchData, token, limit, page);
        dispatch(successGetGroups(res.groups, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetGroups());
    }
};