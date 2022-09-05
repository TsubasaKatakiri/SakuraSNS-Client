import { ADD_VIDEO, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, REMOVE_VIDEO, RESET_VIDEOS } from "./VideoTypes";

const initialState={
    videos: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}


const VideoReducer = (state = initialState, action) => {
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
                error: 'An error has occured',
            };
        case ADD_VIDEO:
            return {
                ...state, 
                videos: [action.payload, ...state.videos],
            };
        case REMOVE_VIDEO:
            return {
                ...state, 
                videos: state.videos.filter(p => p._id !== action.payload),
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

export default VideoReducer;