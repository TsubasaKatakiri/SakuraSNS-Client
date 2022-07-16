import { UserAPI } from './../api/UserApi';

const SET_USER_PROFILE_PROGRESS = "SET_USER_PROFILE_PROGRESS";
const SET_USER_PROFILE_SUCCESS = "SET_USER_PROFILE_SUCCESS";
const SET_USER_PROFILE_FAIL = "SET_USER_PROFILE_FAIL";

const RESET_PROFILE = "RESET_PROFILE";

const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const TOGGLE_FOLLOWING_PROGRESS = "TOGGLE_FOLLOWING_PROGRESS";

const CHANGE_USER_SETTINGS = "CHANGE_USER_SETTINGS";
const CHANGE_USER_STATUS = "CHANGE_USER_STATUS";
const CHANGE_USER_EXTRA_DATA = "CHANGE_USER_EXTRA_DATA";
const CHANGE_USER_EXTRA_SETTINGS = "CHANGE_USER_EXTRA_SETTINGS";

//profile initial state
const initialState = {
    profile: null,
    isFetching: false,
    error: "",
    followingInProgress: false,
}

//profile reducer
const ProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_USER_PROFILE_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case SET_USER_PROFILE_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                profile: action.payload,
            };
        case SET_USER_PROFILE_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_PROFILE:
            return {
                profile: null,
                isFetching: false,
                error: "",
                followingInProgress: false,
            };
        case FOLLOW_USER: 
            return {
                ...state, 
                profile: {...state.profile, followings: [...state.profile.followings, action.payload]},
            };
        case UNFOLLOW_USER: 
            return {
                ...state, 
                profile: {...state.profile, followings: state.profile.followings.filter(f => f !== action.payload)},
            };
        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.payload,
            }
        case CHANGE_USER_SETTINGS:
            return {
                ...state,
                profile: action.payload,
            }
        case CHANGE_USER_STATUS:
            return {
                ...state,
                profile: {...state.profile, status: action.payload},
            }
        case CHANGE_USER_EXTRA_DATA:
            return {
                state,
                profile: action.payload,
            }
        case CHANGE_USER_EXTRA_SETTINGS:
            return {
                state,
                profile: action.payload,
            }
        default: 
            return state;
    }
}

//profile action creators
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


//profile thunks
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
        console.log(res);
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
        console.log(res);
        dispatch(changeProfileExtraData(res.user));
    } catch (e){
        console.log(e);
    }
};

export const changeExtraSettings = (id, userSettings, token) => async (dispatch) => {
    try{
        const res = await UserAPI.modifyUserSettings(id, userSettings, token);
        console.log(res);
        dispatch(changeProfileExtraSettings(res.user));
    } catch (e){
        console.log(e);
    }
};

export default ProfileReducer;