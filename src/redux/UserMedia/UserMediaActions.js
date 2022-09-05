import { AlbumAPI } from '../../api/AlbumApi';
import { PreferencesAPI } from '../../api/ContentPreferencesApi';
import { GET_ALBUMS_FAIL, GET_ALBUMS_PROGRESS, GET_ALBUMS_SUCCESS, GET_MUSIC_FAIL, GET_MUSIC_PROGRESS, GET_MUSIC_SUCCESS, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, RESET_ALBUMS, RESET_MUSIC, RESET_VIDEOS } from './UserMediaTypes';

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