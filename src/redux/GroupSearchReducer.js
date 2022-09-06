import { GroupAPI } from "../api/GroupApi";

const GET_GROUPS_PROGRESS = "GET_GROUPS_PROGRESS";
const GET_GROUPS_SUCCESS = "GET_GROUPS_SUCCESS";
const GET_GROUPS_FAIL = "GET_GROUPS_FAIL";
const RESET_GROUPS = "RESET_PEOPLE";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const RESET_SEARCH_QUERY = "RESET_SEARCH_QUERY";
const RESET_SEARCH_QUERY_ADVANCED_PARAMS = "RESET_SEARCH_QUERY_ADVANCED_PARAMS";

//group search initial state
const initialState = {
    searchQuery: {
        groupname: "",
        groupCity: "",
        groupCountry: "",
        theme: "",
    },
    searchResults: [],
    totalResultsPages: null,
    resultsPage: null,
    moreResults: false,
    isFetching: false,
    error: "",
}

//group search reducer
const GroupSearchReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GROUPS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_GROUPS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                searchResults: [...state.searchResults, ...action.payload.groups],
                totalResultsPages: action.payload.total,
                resultsPage: action.payload.page,
                moreResults: action.payload.more,
            };
        case GET_GROUPS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_GROUPS:
            return {
                ...state,
                searchResults: [],
                totalResultsPages: null,
                resultsPage: null,
                moreResults: false,
                isFetching: false,
                error: "",
            };
        case SET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: action.payload,
            }
        case RESET_SEARCH_QUERY:
            return {
                ...state,
                searchQuery: {
                    groupName: "",
                    groupCity: "",
                    groupCountry: "",
                    theme: "",
                },
            }
        case RESET_SEARCH_QUERY_ADVANCED_PARAMS:
            return {
                ...state,
                searchQuery: {
                    ...state.searchQuery,
                    groupCity: "",
                    groupCountry: "",
                    theme: "",
                },
            }
        default: 
            return state;
    }
}

//groups search action creators
const startGetGroups = () => ({type: GET_GROUPS_PROGRESS});
const successGetGroups = (groups, page, total, more) => ({type: GET_GROUPS_SUCCESS, payload: {groups, page, total, more}});
const failGetGroups = () => ({type: GET_GROUPS_FAIL});
export const resetGroups = () => ({type: RESET_GROUPS});
export const setGroupsSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query});
export const resetGroupsSearchQuery = () => ({type: RESET_SEARCH_QUERY});
export const resetQueryAdvancedParams = () => ({type: RESET_SEARCH_QUERY_ADVANCED_PARAMS});

//groups search thunks
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

export default GroupSearchReducer;