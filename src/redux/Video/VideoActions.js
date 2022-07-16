import { VideofileAPI } from '../../api/VideofileApi';
import { ADD_VIDEO, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, REMOVE_VIDEO, RESET_VIDEOS } from './VideoTypes';

const startGetVideo = () => ({type: GET_VIDEO_PROGRESS});
const successGetVideo = (videos, page, totalPages, more) => ({type: GET_VIDEO_SUCCESS, payload: {videos, page, totalPages, more}});
const failGetVideo = () => ({type: GET_VIDEO_FAIL});
const addVideo = (video) => ({type: ADD_VIDEO, payload: video});
const removeVideo = (id) => ({type: REMOVE_VIDEO, payload: id});
export const resetVideos = () => ({type: RESET_VIDEOS});

//video thunks
export const getVideos = (token, page) => async (dispatch) => {
    dispatch(startGetVideo());
    try{
        const res = await VideofileAPI.getAll(token, page);
        dispatch(successGetVideo(res.videos, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetVideo());
    }
};

export const getVideosOfGroup = (groupId, token) => async (dispatch) => {
    dispatch(startGetVideo());
    try{
        const res = await VideofileAPI.getGroupVideo(groupId, token);
        dispatch(successGetVideo(res.videos));
    } catch (e){
        dispatch(failGetVideo());
    }
};

export const getSearchedVideos = (search, token) => async (dispatch) => {
    dispatch(startGetVideo());
    try{
        const res = await VideofileAPI.getSpecific(search, token);
        dispatch(successGetVideo(res.videofiles.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
        })));
    } catch (e){
        dispatch(failGetVideo());
    }
};

export const addVideofile = (videofile, token) => async (dispatch) => {
    try{
        const res = await VideofileAPI.create(videofile, token);
        console.log(res);
        dispatch(addVideo(res.videofile));
    } catch (e){
        console.log(e)
    }
};

export const removeVideofile = (videoId, userId, token) => async (dispatch) => {
    try{
        await VideofileAPI.delete(videoId, userId, token);
        dispatch(removeVideo(videoId));
    } catch (e){
        console.log(e)
    }
};