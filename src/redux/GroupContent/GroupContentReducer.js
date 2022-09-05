import { GET_PAGE_DISCUSSIONS_FAIL, GET_PAGE_DISCUSSIONS_PROGRESS, GET_PAGE_DISCUSSIONS_SUCCESS, GET_PAGE_EVENTS_FAIL, GET_PAGE_EVENTS_PROGRESS, GET_PAGE_EVENTS_SUCCESS, GET_PAGE_INFO_FAIL, GET_PAGE_INFO_PROGRESS, GET_PAGE_INFO_SUCCESS, RESET_PAGE_DISCUSSIONS, RESET_PAGE_EVENTS, RESET_PAGE_INFO } from './GroupContentTypes';

const initialState = {
    info: null,
    isFetchingInfo: false,
    errorInfo: '',
    events: null,
    isFetchingEvents: false,
    errorEvents: '',
    discussions: null,
    isFetchingDiscussions: false,
    errorDiscussions: '',
}


const GroupContentReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PAGE_INFO_PROGRESS:
            return {
                ...state, 
                isFetchingInfo: true,
            };
        case GET_PAGE_INFO_SUCCESS:
            return {
                ...state, 
                isFetchingInfo: false,
                info: action.payload,
            };
        case GET_PAGE_INFO_FAIL:
            return {
                ...state, 
                isFetchingInfo: false,
                errorInfo: 'An error has occurred',
            };
        case RESET_PAGE_INFO:
            return {
                ...state,
                info: null,
                isFetchingInfo: false,
                errorInfo: '',
            };
        case GET_PAGE_EVENTS_PROGRESS:
            return {
                ...state, 
                isFetchingEvents: true,
            };
        case GET_PAGE_EVENTS_SUCCESS:
            return {
                ...state, 
                isFetchingEvents: false,
                events: action.payload,
            };
        case GET_PAGE_EVENTS_FAIL:
            return {
                ...state, 
                isFetchingEvents: false,
                errorEvents: 'An error has occurred',
            };
        case RESET_PAGE_EVENTS:
            return {
                ...state,
                events: null,
                isFetchingEvents: false,
                errorEvents: '',
            };
        case GET_PAGE_DISCUSSIONS_PROGRESS:
            return {
                ...state, 
                isFetchingDiscussions: true,
            };
        case GET_PAGE_DISCUSSIONS_SUCCESS:
            return {
                ...state, 
                isFetchingDiscussions: false,
                discussions: action.payload,
            };
        case GET_PAGE_DISCUSSIONS_FAIL:
            return {
                ...state, 
                isFetchingDiscussions: false,
                errorDiscussions: 'An error has occurred',
            };
        case RESET_PAGE_DISCUSSIONS:
            return {
                ...state, 
                discussions: null,
                isFetchingDiscussions: false,
                errorDiscussions: '',
            };
        default: 
            return state;
    }
}

export default GroupContentReducer;