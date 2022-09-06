import { PreferencesAPI } from '../api/ContentPreferencesApi';
import { VideofileAPI } from '../api/VideofileApi';

const GET_SEARCH_RESULTS_PROGRESS = 'GET_SEARCH_RESULTS_PROGRESS';
const GET_SEARCH_RESULTS_SUCCESS = 'GET_SEARCH_RESULTS_SUCCESS';
const GET_SEARCH_RESULTS_FAIL = 'GET_SEARCH_RESULTS_FAIL';
const RESET_VIDEOS = 'RESET_VIDEOS';


const initialState = {
    videos: null,
    page: 1,
    totalPages: null,
    more: false,
    isFetching: false,
    error: '',
}


const VideoSearchReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_SEARCH_RESULTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
                videos: null,
            };
        case GET_SEARCH_RESULTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                videos: action.payload.videos,
                page: action.payload.page,
                totalPages: action.payload.totalPages,
                more: action.payload.more,
            };
        case GET_SEARCH_RESULTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occured',
            };
        case RESET_VIDEOS:
            return {
                ...state,
                videos: null,
                page: 1,
                totalPages: null,
                more: false,
                isFetching: false,
                error: '',
            };
        default: 
            return state;
    }
}


const startGetSearchResults = () => ({type: GET_SEARCH_RESULTS_PROGRESS});
const successGetSearchResults = (videos, page, totalPages, more) => ({type: GET_SEARCH_RESULTS_SUCCESS, payload: {videos, page, totalPages, more}});
const failGetSearchResults = () => ({type: GET_SEARCH_RESULTS_FAIL});
export const resetSearchVideos = () => ({type: RESET_VIDEOS});


export const getSearchResults = (search, userId, token, page) => async (dispatch) => {
    dispatch(startGetSearchResults());
    try{
        if(search && page && page > 1) await PreferencesAPI.editVideoSearch(userId, search, token);
        const res = await VideofileAPI.getSpecific(search, token, page);
        dispatch(successGetSearchResults(res.videos, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetSearchResults());
    }
};

export const getTagResults = (tag, token, page) => async (dispatch) => {
    dispatch(startGetSearchResults());
    try{
        const res = await VideofileAPI.getByTag(tag, token, page);
        dispatch(successGetSearchResults(res.videos, res.page, res.totalPages, res.more));
    } catch (e){
        dispatch(failGetSearchResults());
    }
};

export default VideoSearchReducer;