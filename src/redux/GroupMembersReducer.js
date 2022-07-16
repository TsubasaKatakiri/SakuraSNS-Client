import { GroupAPI } from './../api/GroupApi';

const GET_MEMBERS_PROGRESS = "GET_MEMBERS_PROGRESS";
const GET_MEMBERS_SUCCESS = "GET_MEMBERS_SUCCESS";
const GET_MEMBERS_FAIL = "GET_MEMBERS_FAIL";
const RESET_MEMBERS = "RESET_MEMBERS";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const RESET_SEARCH_QUERY = "RESET_SEARCH_QUERY";
const RESET_SEARCH_QUERY_ADVANCED_PARAMS = "RESET_SEARCH_QUERY_ADVANCED_PARAMS";


const initialState = {
    searchQuery: {
        username: "",
        city: "",
        country: "",
        school: "",
        university: "",
        company: "",
        gender: "",
        currentStatus: "",
    },
    searchResults: [],
    totalResultsPages: null,
    resultsPage: null,
    moreResults: false,
    isFetching: false,
    error: "",
}

//members reducer
const GroupMembersReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_MEMBERS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_MEMBERS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                searchResults: [...state.searchResults, ...action.payload.members],
                totalResultsPages: action.payload.total,
                resultsPage: action.payload.page,
                moreResults: action.payload.more,
            };
        case GET_MEMBERS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_MEMBERS:
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
                    username: "",
                    city: "",
                    country: "",
                    school: "",
                    university: "",
                    company: "",
                    gender: "",
                    currentStatus: "",
                },
            }
        case RESET_SEARCH_QUERY_ADVANCED_PARAMS:
            return {
                ...state,
                searchQuery: {
                    ...state.searchQuery,
                    city: "",
                    country: "",
                    school: "",
                    university: "",
                    company: "",
                    gender: "",
                    currentStatus: "",
                },
            }
        default: 
            return state;
    }
}

//members action creators
const startGetMembers = () => ({type: GET_MEMBERS_PROGRESS});
const successGetMembers = (members, page, total, more) => ({type: GET_MEMBERS_SUCCESS, payload: {members, page, total, more}});
const failGetMembers = () => ({type: GET_MEMBERS_FAIL});
export const resetMembers = () => ({type: RESET_MEMBERS});
export const setMembersSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query});
export const resetMembersSearchQuery = () => ({type: RESET_SEARCH_QUERY});
export const resetMembersQueryAdvancedParams = () => ({type: RESET_SEARCH_QUERY_ADVANCED_PARAMS});

//people thunks
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

export default GroupMembersReducer;