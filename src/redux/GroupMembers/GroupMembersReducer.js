import { GET_MEMBERS_FAIL, GET_MEMBERS_PROGRESS, GET_MEMBERS_SUCCESS, RESET_MEMBERS, RESET_SEARCH_QUERY, RESET_SEARCH_QUERY_ADVANCED_PARAMS, SET_SEARCH_QUERY } from './GroupMembersTypes';

const initialState = {
    searchQuery: {
        username: '',
        city: '',
        country: '',
        school: '',
        university: '',
        company: '',
        gender: '',
        currentStatus: '',
    },
    searchResults: [],
    totalResultsPages: null,
    resultsPage: null,
    moreResults: false,
    isFetching: false,
    error: '',
}

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
                error: 'An error has occurred',
            };
        case RESET_MEMBERS:
            return {
                ...state,
                searchResults: [],
                totalResultsPages: null,
                resultsPage: null,
                moreResults: false,
                isFetching: false,
                error: '',
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
                    username: '',
                    city: '',
                    country: '',
                    school: '',
                    university: '',
                    company: '',
                    gender: '',
                    currentStatus: '',
                },
            }
        case RESET_SEARCH_QUERY_ADVANCED_PARAMS:
            return {
                ...state,
                searchQuery: {
                    ...state.searchQuery,
                    city: '',
                    country: '',
                    school: '',
                    university: '',
                    company: '',
                    gender: '',
                    currentStatus: '',
                },
            }
        default: 
            return state;
    }
}

export default GroupMembersReducer;