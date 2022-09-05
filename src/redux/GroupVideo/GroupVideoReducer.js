import { ADD_VIDEO, DELETE_VIDEO, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, RESET_VIDEOS } from './GroupVideoTypes';

const initialState = {
    videos: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: null,
}

const GroupVideoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_VIDEOS:
            return {
                videos: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: null,
            };
        case ADD_VIDEO:
            return {
                ...state, 
                videos: [...state.videos, action.payload],
            };
        case DELETE_VIDEO:
            return {
                ...state, 
                videos: state.videos.filter(v => v._id !== action.payload),
            };
        default: 
            return state;
    }
}

export default GroupVideoReducer;