import { VideofileAPI } from '../../api/VideofileApi';
import { ADD_VIDEO, DELETE_VIDEO, GET_VIDEO_FAIL, GET_VIDEO_PROGRESS, GET_VIDEO_SUCCESS, RESET_VIDEOS } from './GroupVideoTypes';

const startGetVideo = () => ({type: GET_VIDEO_PROGRESS});
const successGetVideo = (videos, page, totalPages, more) => ({type: GET_VIDEO_SUCCESS, payload: {videos, page, totalPages, more}});
const failGetVideo = () => ({type: GET_VIDEO_FAIL});
export const resetGroupVideo = () => ({type: RESET_VIDEOS});
const addVideo = (data) => ({type: ADD_VIDEO, payload: data});
const removeVideo = (videoId) => ({type: DELETE_VIDEO, payload: videoId});


export const getGroupVideos = (groupId, token, page) => async (dispatch) => {
    dispatch(startGetVideo());
    try{
        const res = await VideofileAPI.getGroupVideo(groupId, token, page);
        dispatch(successGetVideo(res.videos, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetVideo());
    }
};

export const uploadGroupVideofile = (videofile, token) => async (dispatch) => {
    try{
        const res = await VideofileAPI.create(videofile, token);
        dispatch(addVideo(res.videofile));
    } catch (e){
        console.log(e)
    }
};

export const addGroupVideofile = (groupId, videoData, token) => async (dispatch) => {
    try{
        const res = await VideofileAPI.addVideoToGroup(groupId, videoData, token);
        dispatch(addVideo(res.video));
    } catch (e){
        console.log(e)
    }
};

export const removeGroupVideofile = (videoId, groupData, token) => async (dispatch) => {
    try{
        const res = await VideofileAPI.addVideoToGroup(videoId, groupData, token);
        dispatch(removeVideo(res.video._id));
    } catch (e){
        console.log(e)
    }
};