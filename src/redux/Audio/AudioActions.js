import { AudiofileAPI } from "../../api/AudiofileApi";
import { ADD_AUDIO, DELETE_AUDIO, GET_AUDIO_FAIL, GET_AUDIO_PROGRESS, GET_AUDIO_SUCCESS, RESET_AUDIO, SET_FAVORITE_AUDIO, UNSET_FAVORITE_AUDIO } from "./AudioTypes";

const startGetAudio = () => ({type: GET_AUDIO_PROGRESS});
const successGetAudio = (music, page, totalPages, more) => ({type: GET_AUDIO_SUCCESS, payload: {music, page, totalPages, more}});
const failGetAudio = () => ({type: GET_AUDIO_FAIL});
const addAudio = (audio) => ({type: ADD_AUDIO, payload: audio});
const removeAudio = (id) => ({type: DELETE_AUDIO, payload: id});
const setFavorite = (trackId, userId) => ({type: SET_FAVORITE_AUDIO, payload: {trackId, userId}});
const unsetFavorite = (trackId, userId) => ({type: UNSET_FAVORITE_AUDIO, payload: {trackId, userId}});
export const resetAudio = () => ({type: RESET_AUDIO});


export const getAudiofiles = (token, page) => async (dispatch) => {
    dispatch(startGetAudio());
    try{
        const res = await  AudiofileAPI.getAll(token, page);
        dispatch(successGetAudio(res.music, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetAudio());
    }
};

export const getSearchedAudiofiles = (search, token, page) => async (dispatch) => {
    dispatch(startGetAudio());
    try{
        const res = await AudiofileAPI.getSpecific(search, token, page);
        dispatch(successGetAudio(res.music, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetAudio());
    }
};

export const addAudiofile = (audiofile, token) => async (dispatch) => {
    try{
        const res = await AudiofileAPI.create(audiofile, token);
        dispatch(addAudio(res.audiofile));
    } catch (e){
        console.log(e)
    }
};

export const removeAudiofile = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.delete(audioId, userId, token);
        dispatch(removeAudio(audioId));
    } catch (e){
        console.log(e)
    }
};

export const setFavoriteAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.setFavorite(audioId, userId, token);
        dispatch(setFavorite(audioId, userId));
    } catch (e){
        console.log(e)
    }
};

export const unsetFavoriteAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.setFavorite(audioId, userId, token);
        dispatch(unsetFavorite(audioId, userId));
    } catch (e){
        console.log(e)
    }
};