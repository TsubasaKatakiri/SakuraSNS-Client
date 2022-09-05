import { ADD_TO_BLACKLIST_FAIL, ADD_TO_BLACKLIST_SUCCESS, REMOVE_FROM_BLACKLIST, RESET_BLACKLIST, SET_BLACKLIST_FAIL, SET_BLACKLIST_PROGRESS, SET_BLACKLIST_SUCCESS } from './BlacklistTypes';
import { UserAPI } from './../../api/UserApi';

const startGetBlacklist = () => ({type: SET_BLACKLIST_PROGRESS});
const successGetBlacklist = (blacklist) => ({type: SET_BLACKLIST_SUCCESS, payload: blacklist});
const failGetBlacklist = () => ({type: SET_BLACKLIST_FAIL});
const successAddToBlacklist = (user) => ({type: ADD_TO_BLACKLIST_SUCCESS, payload: user});
const failAddToBlacklist = (error) => ({type: ADD_TO_BLACKLIST_FAIL, payload: error});
const removeFromBlacklist = (userId) => ({type: REMOVE_FROM_BLACKLIST, payload: userId});
export const resetBlacklist = () => ({type: RESET_BLACKLIST});


export const getBlacklist = (userId, token) => async (dispatch) => {
    dispatch(startGetBlacklist());
    try{
        const res = await UserAPI.getUserBlacklist(userId, token);
        dispatch(successGetBlacklist(res.users));
    } catch (e){
        dispatch(failGetBlacklist());
    }
};

export const blacklistAdd = (blacklistUserId, userId, token) => async (dispatch) => {
    try{
        const res = await UserAPI.blacklistUser(blacklistUserId, userId, token);
        dispatch(successAddToBlacklist(res.user));
    } catch (e){
        dispatch(failAddToBlacklist('User does not exist'));
    }
};

export const blacklistRemove = (blacklistUserId, userId, token) => async (dispatch) => {
    try{
        const res = await UserAPI.blacklistUser(blacklistUserId, userId, token);
        dispatch(removeFromBlacklist(res.user._id));
    } catch (e){}
};