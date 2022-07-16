import { GET_SEARCH_RESULTS_FAIL, GET_SEARCH_RESULTS_PROGRESS, GET_SEARCH_RESULTS_SUCCESS, RESET_VIDEOS } from './VideoSearchTypes';

const initialState = {
    videos: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}


const VideoSearchReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SEARCH_RESULTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
                videos: null,
            };
        case GET_SEARCH_RESULTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_SEARCH_RESULTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_VIDEOS:
            return {
                ...state,
                videos: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: '',
            };
        default: 
            return state;
    }
}

export default VideoSearchReducer;