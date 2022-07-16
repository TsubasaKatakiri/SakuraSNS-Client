import { AudiofileAPI } from '../../api/AudiofileApi';
import { ADD_AUDIO, DELETE_AUDIO, GET_AUDIO_FAIL, GET_AUDIO_PROGRESS, GET_AUDIO_SUCCESS, RESET_AUDIO, SET_FAVORITE, UNSET_FAVORITE } from './GroupMusicTypes';

const startGetMusic = () => ({type: GET_AUDIO_PROGRESS});
const successGetMusic = (music, page, totalPages, more) => ({type: GET_AUDIO_SUCCESS, payload: {music, page, totalPages, more}});
const failGetMusic = () => ({type: GET_AUDIO_FAIL});
export const resetGroupMusic = () => ({type: RESET_AUDIO});
const addMusic = (data) => ({type: ADD_AUDIO, payload: data});
const deleteMusic = (videoId) => ({type: DELETE_AUDIO, payload: videoId});
const setFavorite = (trackId, userId) => ({type: SET_FAVORITE, payload: {trackId, userId}});
const unsetFavorite = (trackId, userId) => ({type: UNSET_FAVORITE, payload: {trackId, userId}});


export const getGroupMusic = (groupId, token, page) => async (dispatch) => {
    dispatch(startGetMusic());
    try{
        const res = await AudiofileAPI.getGroupAudio(groupId, token, page);
        dispatch(successGetMusic(res.music, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetMusic());
    }
};

export const uploadGroupMusic = (audiofile, token) => async (dispatch) => {
    try{
        const res = await AudiofileAPI.create(audiofile, token);
        dispatch(addMusic(res.audiofile));
    } catch (e){
        console.log(e)
    }
};

export const addGroupMusic = (groupId, audioData, token) => async (dispatch) => {
    try{
        const res = await AudiofileAPI.addAudioToGroup(groupId, audioData, token);
        dispatch(addMusic(res.audio));
    } catch (e){
        console.log(e)
    }
};

export const removeGroupMusic = (groupId, audioData, token) => async (dispatch) => {
    try{
        const res = await AudiofileAPI.addAudioToGroup(groupId, audioData, token);
        dispatch(deleteMusic(res.audio._id));
    } catch (e){
        console.log(e)
    }
};

export const removeMusic = (audioId, groupData, token) => async (dispatch) => {
    try{
        await AudiofileAPI.delete(audioId, groupData, token);
        dispatch(deleteMusic(audioId));
    } catch (e){
        console.log(e)
    }
};

export const setFavoriteGroupAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.setFavorite(audioId, userId, token);
        dispatch(setFavorite(audioId, userId));
    } catch (e){
        console.log(e)
    }
};

export const unsetFavoriteGroupAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.setFavorite(audioId, userId, token);
        dispatch(unsetFavorite(audioId, userId));
    } catch (e){
        console.log(e)
    }
};
