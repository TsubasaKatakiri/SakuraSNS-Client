import { PreferencesAPI } from "../api/ContentPreferencesApi";
import { AudiofileAPI } from './../api/AudiofileApi';

const GET_UPLOADED_AUDIO_PROGRESS = "GET_UPLOADED_AUDIO_PROGRESS";
const GET_UPLOADED_AUDIO_SUCCESS = "GET_UPLOADED_AUDIO_SUCCESS";
const GET_UPLOADED_AUDIO_FAIL = "GET_UPLOADED_AUDIO_FAIL";
const GET_FAVORITE_AUDIO_PROGRESS = "GET_FAVORITE_AUDIO_PROGRESS";
const GET_FAVORITE_AUDIO_SUCCESS = "GET_FAVORITE_AUDIO_SUCCESS";
const GET_FAVORITE_AUDIO_FAIL = "GET_FAVORITE_AUDIO_FAIL";
const RESET_AUDIO = "RESET_AUDIO";
const ADD_AUDIO = "ADD_AUDIO";
const DELETE_AUDIO = "DELETE_AUDIO";
const SET_FAVORITE_AUDIO = "SET_FAVORITE_AUDIO";
const UNSET_FAVORITE_AUDIO = "UNSET_FAVORITE_AUDIO";


const initialState = {
    music: [],
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: "",
}


const GalleryAudioReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_UPLOADED_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_UPLOADED_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                music: action.payload.music,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_UPLOADED_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case GET_FAVORITE_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_FAVORITE_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                music: action.payload.music,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_FAVORITE_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case RESET_AUDIO:
            return {
                music: [],
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: null,
            };
        case ADD_AUDIO:
            return {
                ...state, 
                music: [...state.music, action.payload],
            };
        case DELETE_AUDIO:
            return {
                ...state, 
                music: state.music.filter(a => a._id !== action.payload),
            };
        case SET_FAVORITE_AUDIO:
            return {
                ...state, 
                music: state.music.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = [...t.favorite, action.payload.userId]
                    return t;
                }),
            };
        case UNSET_FAVORITE_AUDIO:
            return {
                ...state, 
                music: state.music.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = t.favorite.filter(f => f !== action.payload.userId);
                    return t;
                }),
            };

        default: 
            return state;
    }
}


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


export default GalleryAudioReducer;