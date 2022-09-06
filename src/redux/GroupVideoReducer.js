import { VideofileAPI } from "../api/VideofileApi";

const GET_VIDEO_PROGRESS = "GET_VIDEO_PROGRESS";
const GET_VIDEO_SUCCESS = "GET_VIDEO_SUCCESS";
const GET_VIDEO_FAIL = "GET_VIDEO_FAIL";
const RESET_VIDEOS = "RESET_VIDEO";
const ADD_VIDEO = "ADD_VIDEO";
const DELETE_VIDEO = "DELETE_VIDEO";


const initialState = {
    videos: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: null,
}


const GroupVideoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_VIDEO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_VIDEO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_VIDEO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occured",
            };
        case RESET_VIDEOS:
            return {
                videos: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: null,
            };
        case ADD_VIDEO:
            return {
                ...state, 
                videos: [...state.videos, action.payload],
            };
        case DELETE_VIDEO:
            return {
                ...state, 
                videos: state.videos.filter(v => v._id !== action.payload),
            };
        default: 
            return state;
    }
}


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

export default GroupVideoReducer;