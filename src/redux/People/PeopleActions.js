import { GroupAPI } from '../../api/GroupApi';
import { UserAPI } from '../../api/UserApi';
import { GET_PEOPLE_FAIL, GET_PEOPLE_PROGRESS, GET_PEOPLE_SUCCESS, RESET_PEOPLE, RESET_SEARCH_QUERY, RESET_SEARCH_QUERY_ADVANCED_PARAMS, SET_SEARCH_QUERY } from './PeopleTypes';

const startGetPeople = () => ({type: GET_PEOPLE_PROGRESS});
const successGetPeople = (people, page, total, more) => ({type: GET_PEOPLE_SUCCESS, payload: {people, page, total, more}});
const failGetPeople = () => ({type: GET_PEOPLE_FAIL});
export const resetPeople = () => ({type: RESET_PEOPLE});
export const setPeopleSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query});
export const resetPeopleSearchQuery = () => ({type: RESET_SEARCH_QUERY});
export const resetQueryAdvancedParams = () => ({type: RESET_SEARCH_QUERY_ADVANCED_PARAMS});


export const getPeople = (searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetPeople());
    try{
        const res = await UserAPI.searchAdvanced(searchData, token, limit, page);
        dispatch(successGetPeople(res.users, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPeople());
    }
};

export const getFriends = (userId, searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetPeople());
    try{
        const res = await UserAPI.searchFriendsAdvanced(userId, searchData, token, limit, page);
        dispatch(successGetPeople(res.friends, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPeople());
    }
};

export const getFollowers = (userId, searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetPeople());
    try{
        const res = await UserAPI.searchFollowersAdvanced(userId, searchData, token, limit, page);
        dispatch(successGetPeople(res.friends, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPeople());
    }
};

export const getGroupUsers = (groupId, searchData, token, page, limit) => async (dispatch) => {
    dispatch(startGetPeople());
    try{
        const res = await GroupAPI.getGroupUsers(groupId, searchData, token, page, limit);
        dispatch(successGetPeople(res.members, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetPeople());
    }
};