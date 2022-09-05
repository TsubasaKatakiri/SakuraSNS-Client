import { UserAPI } from '../../api/UserApi';
import { CHANGE_USER_EXTRA_DATA, CHANGE_USER_EXTRA_SETTINGS, CHANGE_USER_SETTINGS, CHANGE_USER_STATUS, FOLLOW_USER, RESET_PROFILE, SET_USER_PROFILE_FAIL, SET_USER_PROFILE_PROGRESS, SET_USER_PROFILE_SUCCESS, TOGGLE_FOLLOWING_PROGRESS, UNFOLLOW_USER } from './ProfileTypes';

const startGetProfile = () => ({type: SET_USER_PROFILE_PROGRESS});
const successGetProfile = (user) => ({type: SET_USER_PROFILE_SUCCESS, payload: user});
const failGetProfile = () => ({type: SET_USER_PROFILE_FAIL});
const followProfile = (userId) => ({type: FOLLOW_USER, payload: userId});
const unfollowProfile = (userId) => ({type: UNFOLLOW_USER, payload: userId});
const toggleFollowingProgress = (progressState) => ({type: TOGGLE_FOLLOWING_PROGRESS, payload: progressState});
const changeProfileStatus = (status) => ({type: CHANGE_USER_STATUS, payload: status});
const changeProfileSettings = (profileData) => ({type: CHANGE_USER_SETTINGS, payload: profileData});
const changeProfileExtraData = (userData) => ({type: CHANGE_USER_EXTRA_DATA, payload: userData});
const changeProfileExtraSettings = (userSettings) => ({type: CHANGE_USER_EXTRA_SETTINGS, payload: userSettings});
export const resetProfile = () => ({type: RESET_PROFILE});


export const getProfile = (userId, token) => async (dispatch) => {
    dispatch(startGetProfile());
    try{
        const res = await UserAPI.getUser(userId, token);
        dispatch(successGetProfile(res));
    } catch (e){
        dispatch(failGetProfile());
    }
};

export const follow = (userId, currentId, token) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true));
    try{
        await UserAPI.followUser(userId, currentId, token);
        dispatch(followProfile(userId));
        dispatch(toggleFollowingProgress(false));
    } catch (e){
        console.log(e);
        dispatch(toggleFollowingProgress(false));
    }
}

export const unfollow = (userId, currentId, token) => async (dispatch) => {
    dispatch(toggleFollowingProgress(true));
    try{
        await UserAPI.unfollowUser(userId, currentId, token);
        dispatch(unfollowProfile(userId));
        dispatch(toggleFollowingProgress(false));
    } catch (e){
        console.log(e);
        dispatch(toggleFollowingProgress(false));
    }
}

export const changeStatus = (id, statusInfo, token) => async (dispatch) => {
    try{
        await UserAPI.changeUserStatus(id, statusInfo, token);
        dispatch(changeProfileStatus(statusInfo.status));
    } catch (e){
        console.log(e);
    }
};

export const changeSettings = (id, userData, token) => async (dispatch) => {
    try{
        const res = await UserAPI.modifyUser(id, userData, token);
        dispatch(changeProfileSettings(res.user));
    } catch (e){
        console.log(e);
    }
};

export const changePassword = (id, passwordData, token) => async (dispatch) => {
    try{
        const res = await UserAPI.changeUserPassword(id, passwordData, token);
        dispatch(changeProfileSettings(res.user));
    } catch (e){
        console.log(e);
    }
};

export const changeExtraData = (id, userData, token) => async (dispatch) => {
    try{
        const res = await UserAPI.modifyExtraData(id, userData, token);
        dispatch(changeProfileExtraData(res.user));
    } catch (e){
        console.log(e);
    }
};

export const changeExtraSettings = (id, userSettings, token) => async (dispatch) => {
    try{
        const res = await UserAPI.modifyUserSettings(id, userSettings, token);
        dispatch(changeProfileExtraSettings(res.user));
    } catch (e){
        console.log(e);
    }
};