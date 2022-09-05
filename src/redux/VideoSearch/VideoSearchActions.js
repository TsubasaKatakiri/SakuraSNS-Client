import { PreferencesAPI } from '../../api/ContentPreferencesApi';
import { VideofileAPI } from '../../api/VideofileApi';
import { GET_SEARCH_RESULTS_FAIL, GET_SEARCH_RESULTS_PROGRESS, GET_SEARCH_RESULTS_SUCCESS, RESET_VIDEOS } from './VideoSearchTypes';

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