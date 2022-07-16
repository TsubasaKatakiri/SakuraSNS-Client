import { GET_ALBUMS_FAIL, GET_ALBUMS_PROGRESS, GET_ALBUMS_SUCCESS, GET_MUSIC_FAIL, GET_MUSIC_PROGRESS, GET_MUSIC_SUCCESS, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, RESET_ALBUMS, RESET_MUSIC, RESET_VIDEOS } from './GroupMediaTypes';

const initialState = {
    videos: null,
    isFetchingVideos: false,
    errorVideos: '',
    music: null,
    isFetchingMusic: false,
    errorMusic: '',
    albums: null,
    isFetchingAlbums: false,
    errorAlbums: '',
}


const GroupMediaReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetchingVideos: true,
            };
        case GET_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetchingVideos: false,
                videos: action.payload,
            };
        case GET_VIDEO_FAIL:
            return {
                ...state, 
                isFetchingVideos: false,
                errorVideos: 'An error has occurred',
            };
        case RESET_VIDEOS:
            return {
                ...state,
                videos: null,
                isFetchingVideos: false,
                errorVideos: '',
            };
        case GET_MUSIC_PROGRESS:
            return {
                ...state, 
                isFetchingMusic: true,
            };
        case GET_MUSIC_SUCCESS:
            return {
                ...state, 
                isFetchingMusic: false,
                music: action.payload,
            };
        case GET_MUSIC_FAIL:
            return {
                ...state, 
                isFetchingMusic: false,
                errorMusic: 'An error has occurred',
            };
        case RESET_MUSIC:
            return {
                ...state,
                music: null,
                isFetchingMusic: false,
                errorMusic: '',
            };
        case GET_ALBUMS_PROGRESS:
            return {
                ...state, 
                isFetchingAlbums: true,
            };
        case GET_ALBUMS_SUCCESS:
            return {
                ...state, 
                isFetchingAlbums: false,
                albums: action.payload,
            };
        case GET_ALBUMS_FAIL:
            return {
                ...state, 
                isFetchingAlbums: false,
                errorAlbums: 'An error has occurred',
            };
        case RESET_ALBUMS:
            return {
                ...state, 
                albums: null,
                isFetchingAlbums: false,
                errorAlbums: '',
            };
        default: 
            return state;
    }
}

export default GroupMediaReducer;