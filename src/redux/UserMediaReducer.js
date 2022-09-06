import { AlbumAPI } from '../api/AlbumApi';
import { PreferencesAPI } from '../api/ContentPreferencesApi';

const GET_VIDEO_PROGRESS = 'GET_VIDEO_PROGRESS';
const GET_VIDEO_SUCCESS = 'GET_VIDEO_SUCCESS';
const GET_VIDEO_FAIL = 'GET_VIDEO_FAIL';
const RESET_VIDEOS = 'RESET_VIDEOS';
const GET_MUSIC_PROGRESS = 'GET_MUSIC_PROGRESS';
const GET_MUSIC_SUCCESS = 'GET_MUSIC_SUCCESS';
const GET_MUSIC_FAIL = 'GET_MUSIC_FAIL';
const RESET_MUSIC = 'RESET_MUSIC';
const GET_ALBUMS_PROGRESS = 'GET_ALBUMS_PROGRESS';
const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
const GET_ALBUMS_FAIL = 'GET_ALBUMS_FAIL';
const RESET_ALBUMS = 'RESET_ALBUMS';


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


const UserMediaReducer = (state = initialState, action) => {
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


const startGetVideo = () => ({type: GET_VIDEO_PROGRESS});
const successGetVideo = (videos) => ({type: GET_VIDEO_SUCCESS, payload: videos});
const failGetVideo = () => ({type: GET_VIDEO_FAIL});
export const resetUserVideos = () => ({type: RESET_VIDEOS});
const startGetMusic = () => ({type: GET_MUSIC_PROGRESS});
const successGetMusic = (music) => ({type: GET_MUSIC_SUCCESS, payload: music});
const failGetMusic = () => ({type: GET_MUSIC_FAIL});
export const resetUserMusic = () => ({type: RESET_MUSIC});
const startGetAlbums = () => ({type: GET_ALBUMS_PROGRESS});
const successGetAlbums = (albums) => ({type: GET_ALBUMS_SUCCESS, payload: albums});
const failGetAlbums = () => ({type: GET_ALBUMS_FAIL});
export const resetUserAlbums = () => ({type: RESET_ALBUMS});


export const getUserVideos = (userId, token, page) => async (dispatch) => {
    dispatch(startGetVideo());
    try{
        const res = await PreferencesAPI.getFavoriteVideo(userId, token, page);
        dispatch(successGetVideo(res.videos));
    } catch (e){
        dispatch(failGetVideo());
    }
};

export const getUserMusic = (userId, token, page) => async (dispatch) => {
    dispatch(startGetMusic());
    try{
        const res = await PreferencesAPI.getFavoriteMusic(userId, token, page);
        dispatch(successGetMusic(res.music));
    } catch (e){
        dispatch(failGetMusic());
    }
};

export const getUserAlbums = (userId, token) => async (dispatch) => {
    dispatch(startGetAlbums());
    try{
        const res = await AlbumAPI.getAll(userId, token);
        dispatch(successGetAlbums(res.albums));
    } catch (e){
        dispatch(failGetAlbums());
    }
};

export default UserMediaReducer;