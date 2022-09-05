import { AuthAPI } from '../../api/AuthApi';
import { UserAPI } from '../../api/UserApi';
import { DISABLE_DARK, ENABLE_DARK, FOLLOW, GET_TOKEN, GET_USER_INFO, LOGIN_USER, LOGOUT_USER, SET_USERS, TOGGLE_FOLLOW_PROGRESS, UNFOLLOW } from './AuthTypes';

export const loginUser = () => ({type: LOGIN_USER});
export const getUserInfo = (data) => ({type: GET_USER_INFO, payload: {data: data.user, isAdmin: data.user.role === 0 ? false : true}})
const logoutUser = () => ({type: LOGOUT_USER});
export const getToken = (token) => ({type: GET_TOKEN, payload: token});
export const setOnlineUsers = (users) => ({type: SET_USERS, payload: users});
const followUser = (userId) => ({type: FOLLOW, payload: userId});
const unfollowUser = (userId) => ({type: UNFOLLOW, payload: userId});
const toggleFollowProgress = (userId) => ({type: TOGGLE_FOLLOW_PROGRESS, payload: userId});
const enableDark = () => ({type: ENABLE_DARK});
const disableDark = () => ({type: DISABLE_DARK});


export const followUnfollowProfile = (userId, currentId, token) => async (dispatch) => {
    dispatch(toggleFollowProgress(userId));
    try{
        const res = await UserAPI.followUser(userId, currentId, token);
        if(res.followed) dispatch(followUser(userId));
        else dispatch(unfollowUser(userId));
    } catch (e){
        console.log(e);
    }
    dispatch(toggleFollowProgress(userId));
}

export const switchDarkMode = (id, token) => async (dispatch) => {
    try{
        const res = await UserAPI.switchDarkMode(id, token);
        if(res.isDark){
            dispatch(enableDark());
        } else {
            dispatch(disableDark());
        }
    }catch(e){}
};

export const logout = () => async (dispatch) => {
    try{
        await AuthAPI.logout();
        dispatch(logoutUser());
    }catch(e){}
};
