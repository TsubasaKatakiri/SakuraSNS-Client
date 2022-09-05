import { AlbumAPI } from '../../api/AlbumApi';
import { AudiofileAPI } from '../../api/AudiofileApi';
import { VideofileAPI } from '../../api/VideofileApi';
import { GET_ALBUMS_FAIL, GET_ALBUMS_PROGRESS, GET_ALBUMS_SUCCESS, GET_MUSIC_FAIL, GET_MUSIC_PROGRESS, GET_MUSIC_SUCCESS, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, RESET_ALBUMS, RESET_MUSIC, RESET_VIDEOS } from './GroupMediaTypes';

const startGetVideo = () => ({type: GET_VIDEO_PROGRESS});
const successGetVideo = (videos) => ({type: GET_VIDEO_SUCCESS, payload: videos});
const failGetVideo = () => ({type: GET_VIDEO_FAIL});
export const resetGroupVideos = () => ({type: RESET_VIDEOS});
const startGetMusic = () => ({type: GET_MUSIC_PROGRESS});
const successGetMusic = (music) => ({type: GET_MUSIC_SUCCESS, payload: music});
const failGetMusic = () => ({type: GET_MUSIC_FAIL});
export const resetGroupMusic = () => ({type: RESET_MUSIC});
const startGetAlbums = () => ({type: GET_ALBUMS_PROGRESS});
const successGetAlbums = (albums) => ({type: GET_ALBUMS_SUCCESS, payload: albums});
const failGetAlbums = () => ({type: GET_ALBUMS_FAIL});
export const resetGroupAlbums = () => ({type: RESET_ALBUMS});


export const getGroupVideos = (groupId, token, page) => async (dispatch) => {
    dispatch(startGetVideo());
    try{
        const res = await VideofileAPI.getGroupVideo(groupId, token, page)
        dispatch(successGetVideo(res.videos));
    } catch (e){
        dispatch(failGetVideo());
    }
};

export const getGroupMusic = (groupId, token, page) => async (dispatch) => {
    dispatch(startGetMusic());
    try{
        const res = await AudiofileAPI.getGroupAudio(groupId, token, page);
        dispatch(successGetMusic(res.music));
    } catch (e){
        dispatch(failGetMusic());
    }
};

export const getGroupAlbums = (groupId, token) => async (dispatch) => {
    dispatch(startGetAlbums());
    try{
        const res = await AlbumAPI.getAllOfGroup(groupId, token);
        dispatch(successGetAlbums(res.albums));
    } catch (e){
        dispatch(failGetAlbums());
    }
};
