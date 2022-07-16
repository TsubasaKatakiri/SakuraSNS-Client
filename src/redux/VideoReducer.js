import { VideofileAPI } from '../api/VideofileApi';

const GET_VIDEO_PROGRESS = 'GET_VIDEO_PROGRESS';
const GET_VIDEO_SUCCESS = 'GET_VIDEO_SUCCESS';
const GET_VIDEO_FAIL = 'GET_VIDEO_FAIL';
const ADD_VIDEO = 'ADD_VIDEO';
const REMOVE_VIDEO = 'REMOVE_VIDEO';
const RESET_VIDEOS = 'RESET_VIDEOS';

//video initial state
const initialState={
    videos: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}

//video reducer
const VideoReducer = (state = initialState, action) => {
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
        case ADD_VIDEO:
            return {
                ...state, 
                videos: [action.payload, ...state.videos],
            };
        case REMOVE_VIDEO:
            return {
                ...state, 
                videos: state.videos.filter(p => p._id !== action.payload),
            };
        case RESET_VIDEOS:
            return {
                ...state,
                videos: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: "",
            };
        default: 
            return state;
    }
}

//video action creators
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

export default VideoReducer;