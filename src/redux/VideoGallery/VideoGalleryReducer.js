import { GET_FAVORITE_VIDEO_FAIL, GET_FAVORITE_VIDEO_PROGRESS, GET_FAVORITE_VIDEO_SUCCESS, GET_UPLOADED_VIDEO_FAIL, GET_UPLOADED_VIDEO_PROGRESS, GET_UPLOADED_VIDEO_SUCCESS, RESET_VIDEOS } from './VideoGalleryTypes';

const initialState = {
    videos: [],
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: null,
}


const GalleryVideoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_UPLOADED_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_UPLOADED_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_UPLOADED_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case GET_FAVORITE_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_FAVORITE_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_FAVORITE_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_VIDEOS:
            return {
                ...state, 
                videos: [],
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: null,
            };
        default: 
            return state;
        }
}

export default GalleryVideoReducer;