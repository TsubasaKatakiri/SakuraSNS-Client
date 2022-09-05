import { AudiofileAPI } from "../../api/AudiofileApi";
import { PreferencesAPI } from "../../api/ContentPreferencesApi";
import { ADD_AUDIO, DELETE_AUDIO, GET_FAVORITE_AUDIO_FAIL, GET_FAVORITE_AUDIO_PROGRESS, GET_FAVORITE_AUDIO_SUCCESS, GET_UPLOADED_AUDIO_FAIL, GET_UPLOADED_AUDIO_PROGRESS, GET_UPLOADED_AUDIO_SUCCESS, RESET_AUDIO, SET_FAVORITE_AUDIO, UNSET_FAVORITE_AUDIO } from "./AudioGalleryTypes";

const startGetUploadedAudio = () => ({type: GET_UPLOADED_AUDIO_PROGRESS});
const successGetUploadedAudio = (music, page, totalPages, more) => ({type: GET_UPLOADED_AUDIO_SUCCESS, payload: {music, page, totalPages, more}});
const failGetUploadedAudio = () => ({type: GET_UPLOADED_AUDIO_FAIL});
const startGetFavoriteAudio = () => ({type: GET_FAVORITE_AUDIO_PROGRESS});
const successGetFavoriteAudio = (music, page, totalPages, more) => ({type: GET_FAVORITE_AUDIO_SUCCESS, payload: {music, page, totalPages, more}});
const failGetFavoriteAudio = () => ({type: GET_FAVORITE_AUDIO_FAIL});
const addUserAudio = (data) => ({type: ADD_AUDIO, payload: data});
const removeUserAudio = (id) => ({type: DELETE_AUDIO, payload: id});
const setFavoriteAudio = (trackId, userId) => ({type: SET_FAVORITE_AUDIO, payload: {trackId, userId}});
const unsetFavoriteAudio = (trackId, userId) => ({type: UNSET_FAVORITE_AUDIO, payload: {trackId, userId}});
export const resetUserAudio = () => ({type: RESET_AUDIO});


export const getUploadedAudio = (userId, token, page) => async (dispatch) => {
    dispatch(startGetUploadedAudio());
    try{
        const res = await AudiofileAPI.getUploadedByUser(userId, token, page);
        dispatch(successGetUploadedAudio(res.music, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetUploadedAudio());
    }
};

export const getFavoriteAudio = (userId, token, page) => async (dispatch) => {
    dispatch(startGetFavoriteAudio());
    try{
        const res = await PreferencesAPI.getFavoriteMusic(userId, token, page);
        dispatch(successGetFavoriteAudio(res.music, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFavoriteAudio());
    }
};

export const uploadUserAudio = (audiofile, token) => async (dispatch) => {
    try{
        const res = await AudiofileAPI.create(audiofile, token);
        dispatch(addUserAudio(res.audiofile));
    } catch (e){
        console.log(e)
    }
};

export const deleteAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.delete(audioId, userId, token);
        dispatch(removeUserAudio(audioId));
    } catch (e){
        console.log(e)
    }
};

export const setFavoriteGalleryAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.setFavorite(audioId, userId, token);
        dispatch(setFavoriteAudio(audioId, userId));
    } catch (e){
        console.log(e)
    }
};

export const unsetFavoriteGalleryAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.setFavorite(audioId, userId, token);
        dispatch(unsetFavoriteAudio(audioId, userId));
    } catch (e){
        console.log(e)
    }
};
