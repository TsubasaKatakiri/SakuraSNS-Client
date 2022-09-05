import { GET_GROUPS_FAIL, GET_GROUPS_PROGRESS, GET_GROUPS_SUCCESS, RESET_GROUPS, RESET_SEARCH_QUERY, RESET_SEARCH_QUERY_ADVANCED_PARAMS, SET_SEARCH_QUERY } from './GroupSearchTypes';

const initialState = {
    searchQuery: {
        groupname: '',
        groupCity: '',
        groupCountry: '',
        theme: '',
    },
    searchResults: [],
    totalResultsPages: null,
    resultsPage: null,
    moreResults: false,
    isFetching: false,
    error: '',
}


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
                error: 'An error has occurred',
            };
        case RESET_GROUPS:
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
                    groupName: '',
                    groupCity: '',
                    groupCountry: '',
                    theme: '',
                },
            }
        case RESET_SEARCH_QUERY_ADVANCED_PARAMS:
            return {
                ...state,
                searchQuery: {
                    ...state.searchQuery,
                    groupCity: '',
                    groupCountry: '',
                    theme: '',
                },
            }
        default: 
            return state;
    }
}

export default GroupSearchReducer;