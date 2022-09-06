import { AlbumAPI } from "../api/AlbumApi";
import { AudiofileAPI } from "../api/AudiofileApi";
import { PreferencesAPI } from "../api/ContentPreferencesApi";
import { VideofileAPI } from './../api/VideofileApi';

const GET_USER_UPLOADED_AUDIO_PROGRESS = "GET_USER_UPLOADED_AUDIO_PROGRESS";
const GET_USER_UPLOADED_AUDIO_SUCCESS = "GET_USER_UPLOADED_AUDIO_SUCCESS";
const GET_USER_UPLOADED_AUDIO_FAIL = "GET_USER_UPLOADED_AUDIO_FAIL";
const GET_USER_FAVORITE_AUDIO_PROGRESS = "GET_USER_FAVORITE_AUDIO_PROGRESS";
const GET_USER_FAVORITE_AUDIO_SUCCESS = "GET_USER_FAVORITE_AUDIO_SUCCESS";
const GET_USER_FAVORITE_AUDIO_FAIL = "GET_USER_FAVORITE_AUDIO_FAIL";
const REMOVE_USER_AUDIO = "REMOVE_USER_AUDIO";
const SET_FAVORITE_USER_AUDIO = "SET_FAVORITE_USER_AUDIO";
const UNSET_FAVORITE_USER_AUDIO = "UNSET_FAVORITE_USER_AUDIO";

const GET_USER_UPLOADED_VIDEO_PROGRESS = "GET_USER_UPLOADED_VIDEO_PROGRESS";
const GET_USER_UPLOADED_VIDEO_SUCCESS = "GET_USER_UPLOADED_VIDEO_SUCCESS";
const GET_USER_UPLOADED_VIDEO_FAIL = "GET_USER_UPLOADED_VIDEO_FAIL";
const GET_USER_FAVORITE_VIDEO_PROGRESS = "GET_USER_FAVORITE_VIDEO_PROGRESS";
const GET_USER_FAVORITE_VIDEO_SUCCESS = "GET_USER_FAVORITE_VIDEO_SUCCESS";
const GET_USER_FAVORITE_VIDEO_FAIL = "GET_USER_FAVORITE_VIDEO_FAIL";

//gallery initial state
const initialState = {
    uploadedAudio: null,
    favoriteAudio: null,
    errorUploadedAudio: "",
    errorFavoriteAudio: "",
    uploadedVideo: null,
    favoriteVideo: null,
    errorUploadedVideo: "",
    errorFavoriteVideo: "",
    isFetching: false,
}


//========================
//=====gallery reducer====
//========================

const GalleryReducer = (state = initialState, action) => {
    switch(action.type){
        //audio
        case GET_USER_UPLOADED_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_USER_UPLOADED_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                uploadedAudio: action.payload,
            };
        case GET_USER_UPLOADED_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorUploadedAudio: "An error has occured",
            };
        case GET_USER_FAVORITE_AUDIO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_USER_FAVORITE_AUDIO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                favoriteAudio: action.payload,
            };
        case GET_USER_FAVORITE_AUDIO_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorFavoriteAudio: "An error has occured",
            };
        case REMOVE_USER_AUDIO:
            return {
                ...state, 
                uploadedAudio: state.uploadedAudio.filter(a => a._id !== action.payload),
            };
        case SET_FAVORITE_USER_AUDIO:
            return {
                ...state, 
                uploadedAudio: state.uploadedAudio ? state.uploadedAudio.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = [...t.favorite, action.payload.userId]
                    return t;
                }) : state.uploadedAudio,
                favoriteAudio: state.favoriteAudio ? state.favoriteAudio.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = [...t.favorite, action.payload.userId]
                    return t;
                }) : state.favoriteAudio,
            };
        case UNSET_FAVORITE_USER_AUDIO:
            return {
                ...state, 
                uploadedAudio: state.uploadedAudio ? state.uploadedAudio.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = t.favorite.filter(f => f !== action.payload.userId);
                    return t;
                }) : state.uploadedAudio,
                favoriteAudio: state.favoriteAudio ? state.favoriteAudio.map(t => {
                    if(t._id === action.payload.trackId) t.favorite = t.favorite.filter(f => f !== action.payload.userId);
                    return t;
                }) : state.favoriteAudio,
            };

        //video
        case GET_USER_UPLOADED_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_USER_UPLOADED_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                uploadedVideo: action.payload,
            };
        case GET_USER_UPLOADED_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorUploadedVideo: "An error has occured",
            };
        case GET_USER_FAVORITE_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_USER_FAVORITE_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                favoriteVideo: action.payload,
            };
        case GET_USER_FAVORITE_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                errorFavoriteVideo: "An error has occured",
            };
        default: 
            return state;
    }
}


//========================
//gallery action creators
//========================

//audio action creators
const startGetUploadedAudio = () => ({type: GET_USER_UPLOADED_AUDIO_PROGRESS});
const successGetUploadedAudio = (data) => ({type: GET_USER_UPLOADED_AUDIO_SUCCESS, payload: data});
const failGetUploadedAudio = () => ({type: GET_USER_UPLOADED_AUDIO_FAIL});
const startGetFavoriteAudio = () => ({type: GET_USER_FAVORITE_AUDIO_PROGRESS});
const successGetFavoriteAudio = (data) => ({type: GET_USER_FAVORITE_AUDIO_SUCCESS, payload: data});
const failGetFavoriteAudio = () => ({type: GET_USER_FAVORITE_AUDIO_FAIL});
const removeUserAudio = (id) => ({type: REMOVE_USER_AUDIO, payload: id});
const setFavoriteAudio = (trackId, userId) => ({type: SET_FAVORITE_USER_AUDIO, payload: {trackId, userId}});
const unsetFavoriteAudio = (trackId, userId) => ({type: UNSET_FAVORITE_USER_AUDIO, payload: {trackId, userId}});


//video action creators
const startGetUploadedVideo = () => ({type: GET_USER_UPLOADED_VIDEO_PROGRESS});
const successGetUploadedVideo = (data) => ({type: GET_USER_UPLOADED_VIDEO_SUCCESS, payload: data});
const failGetUploadedVideo = () => ({type: GET_USER_UPLOADED_VIDEO_FAIL});
const startGetFavoriteVideo = () => ({type: GET_USER_FAVORITE_VIDEO_PROGRESS});
const successGetFavoriteVideo = (data) => ({type: GET_USER_FAVORITE_VIDEO_SUCCESS, payload: data});
const failGetFavoriteVideo = () => ({type: GET_USER_FAVORITE_VIDEO_FAIL});


//========================
//=====gallery thunks=====
//========================

//audio thunks
//audio retrieve
export const getUploadedAudio = (userId, token) => async (dispatch) => {
    dispatch(startGetUploadedAudio());
    try{
        const res = await AudiofileAPI.getUploadedByUser(userId, token);
        dispatch(successGetUploadedAudio(res.audiofiles.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })));
    } catch (e){
        dispatch(failGetUploadedAudio());
    }
};

export const getFavoriteAudio = (userId, token) => async (dispatch) => {
    dispatch(startGetFavoriteAudio());
    try{
        const res = await PreferencesAPI.get(userId, token);
        console.log(res);
        dispatch(successGetFavoriteAudio(res.preferences.audioFavorites.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })));
    } catch (e){
        dispatch(failGetFavoriteAudio());
    }
};

//audio removal
export const removeAudio = (audioId, userId, token) => async (dispatch) => {
    try{
        await AudiofileAPI.delete(audioId, userId, token);
        dispatch(removeUserAudio(audioId));
    } catch (e){
        console.log(e)
    }
};

//audio favorite control
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



//video thunks
export const getUploadedVideo = (userId, token) => async (dispatch) => {
    dispatch(startGetUploadedVideo());
    try{
        const res = await VideofileAPI.getUploadedByUser(userId, token);
        dispatch(successGetUploadedVideo(res.videofiles.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })));
    } catch (e){
        dispatch(failGetUploadedVideo());
    }
};

export const getFavoriteVideo = (userId, token) => async (dispatch) => {
    dispatch(startGetFavoriteVideo());
    try{
        const res = await PreferencesAPI.get(userId, token);
        console.log(res);
        dispatch(successGetFavoriteVideo(res.preferences.videoFavorites.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })));
    } catch (e){
        dispatch(failGetFavoriteVideo());
    }
};


export default GalleryReducer;