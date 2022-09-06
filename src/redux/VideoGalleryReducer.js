import { PreferencesAPI } from "../api/ContentPreferencesApi";
import { VideofileAPI } from "../api/VideofileApi";


const GET_UPLOADED_VIDEO_PROGRESS = "GET_UPLOADED_VIDEO_PROGRESS";
const GET_UPLOADED_VIDEO_SUCCESS = "GET_UPLOADED_VIDEO_SUCCESS";
const GET_UPLOADED_VIDEO_FAIL = "GET_UPLOADED_VIDEO_FAIL";
const GET_FAVORITE_VIDEO_PROGRESS = "GET_FAVORITE_VIDEO_PROGRESS";
const GET_FAVORITE_VIDEO_SUCCESS = "GET_FAVORITE_VIDEO_SUCCESS";
const GET_FAVORITE_VIDEO_FAIL = "GET_FAVORITE_VIDEO_FAIL";
const RESET_VIDEOS = "RESET_VIDEOS";


const initialState = {
    videos: [],
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: null,
}


const GalleryVideoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_UPLOADED_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_UPLOADED_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_UPLOADED_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case GET_FAVORITE_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_FAVORITE_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_FAVORITE_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case RESET_VIDEOS:
            return {
                ...state, 
                videos: [],
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: null,
            };
        default: 
            return state;
        }
}


const startGetUploadedVideo = () => ({type: GET_UPLOADED_VIDEO_PROGRESS});
const successGetUploadedVideo = (videos, page, totalPages, more) => ({type: GET_UPLOADED_VIDEO_SUCCESS, payload: {videos, page, totalPages, more}});
const failGetUploadedVideo = () => ({type: GET_UPLOADED_VIDEO_FAIL});
const startGetFavoriteVideo = () => ({type: GET_FAVORITE_VIDEO_PROGRESS});
const successGetFavoriteVideo = (videos, page, totalPages, more) => ({type: GET_FAVORITE_VIDEO_SUCCESS, payload: {videos, page, totalPages, more}});
const failGetFavoriteVideo = () => ({type: GET_FAVORITE_VIDEO_FAIL});
export const resetGalleryVideos = () => ({type: RESET_VIDEOS});


export const getUploadedVideos = (userId, token, page) => async (dispatch) => {
    dispatch(startGetUploadedVideo());
    try{
        const res = await VideofileAPI.getUploadedByUser(userId, token, page);
        dispatch(successGetUploadedVideo(res.videos, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetUploadedVideo());
    }
};

export const getFavoriteVideos = (userId, token, page) => async (dispatch) => {
    dispatch(startGetFavoriteVideo());
    try{
        const res = await PreferencesAPI.getFavoriteVideo(userId, token, page);
        dispatch(successGetFavoriteVideo(res.videos, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetFavoriteVideo());
    }
};


export default GalleryVideoReducer;