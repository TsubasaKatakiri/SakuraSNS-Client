import { VideofileAPI } from '../../api/VideofileApi';
import { GET_FAVORITE_VIDEO_FAIL, GET_FAVORITE_VIDEO_PROGRESS, GET_FAVORITE_VIDEO_SUCCESS, GET_UPLOADED_VIDEO_FAIL, GET_UPLOADED_VIDEO_PROGRESS, GET_UPLOADED_VIDEO_SUCCESS, RESET_VIDEOS } from './VideoGalleryTypes';
import { PreferencesAPI } from './../../api/ContentPreferencesApi';

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