import { GroupAPI } from "../api/GroupApi";
import { UserAPI } from "../api/UserApi";

const GET_PEOPLE_PROGRESS = "GET_PEOPLE_PROGRESS";
const GET_PEOPLE_SUCCESS = "GET_PEOPLE_SUCCESS";
const GET_PEOPLE_FAIL = "GET_PEOPLE_FAIL";
const RESET_PEOPLE = "RESET_PEOPLE";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const RESET_SEARCH_QUERY = "RESET_SEARCH_QUERY";
const RESET_SEARCH_QUERY_ADVANCED_PARAMS = "RESET_SEARCH_QUERY_ADVANCED_PARAMS";

//people initial state
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

//people reducer
const PeopleReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PEOPLE_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_PEOPLE_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                searchResults: [...state.searchResults, ...action.payload.people],
                totalResultsPages: action.payload.total,
                resultsPage: action.payload.page,
                moreResults: action.payload.more,
            };
        case GET_PEOPLE_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_PEOPLE:
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

//people action creators
const startGetPeople = () => ({type: GET_PEOPLE_PROGRESS});
const successGetPeople = (people, page, total, more) => ({type: GET_PEOPLE_SUCCESS, payload: {people, page, total, more}});
const failGetPeople = () => ({type: GET_PEOPLE_FAIL});
export const resetPeople = () => ({type: RESET_PEOPLE});
export const setPeopleSearchQuery = (query) => ({type: SET_SEARCH_QUERY, payload: query});
export const resetPeopleSearchQuery = () => ({type: RESET_SEARCH_QUERY});
export const resetQueryAdvancedParams = () => ({type: RESET_SEARCH_QUERY_ADVANCED_PARAMS});

//people thunks
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

export default PeopleReducer;