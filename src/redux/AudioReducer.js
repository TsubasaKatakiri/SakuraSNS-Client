import { AudiofileAPI } from '../api/AudiofileApi';

const GET_AUDIO_PROGRESS = 'GET_AUDIO_PROGRESS';
const GET_AUDIO_SUCCESS = 'GET_AUDIO_SUCCESS';
const GET_AUDIO_FAIL = 'GET_AUDIO_FAIL';
const RESET_AUDIO = 'RESET_AUDIO';
const ADD_AUDIO= 'ADD_AUDIO';
const DELETE_AUDIO= 'DELETE_AUDIO';
const SET_FAVORITE_AUDIO= 'SET_FAVORITE_AUDIO';
const UNSET_FAVORITE_AUDIO= 'UNSET_FAVORITE_AUDIO';


const initialState = {
    music: [],
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}


const AudioReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                music: action.payload.music,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case RESET_AUDIO:
            return {
                ...state,
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
                music: [action.payload, ...state.music],
            };
        case DELETE_AUDIO:
            return {
                ...state, 
                music: state.music.filter(p => p._id !== action.payload),
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

export default AudioReducer;