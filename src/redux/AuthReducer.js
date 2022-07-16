import { AuthAPI } from "../api/AuthApi";
import { UserAPI } from "../api/UserApi";

const LOGIN_USER = "LOGIN_USER";
const GET_USER_INFO = "GET_USER_INFO";
const LOGOUT_USER = "LOGOUT_USER";
const GET_TOKEN = "GET_TOKEN";

const SET_USERS = "SET_USERS";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const TOGGLE_FOLLOW_PROGRESS = "TOGGLE_FOLLOW_PROGRESS";
const ENABLE_DARK = 'ENABLE_DARK';
const DISABLE_DARK = 'DISABLE_DARK';

//initial auth state
const initialState = {
    currentUser: null,
    onlineUsers: [],
    userFriends: [],
    followInProgress: [],
    isAuthenticated: false,
    isAdmin: false,
    token: '',
}

//auth reducer
const AuthReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                isAuthenticated: true,
            };
        case GET_USER_INFO:
            return {
                ...state,
                currentUser: action.payload.data,
                userFriends: action.payload.data.followings.map(f => f._id),
                isAdmin: action.payload.isAdmin,
            };
        case LOGOUT_USER:
            return {
                ...state,
                isAuthenticated: false,
                currentUser: null,
                onlineUsers: [],
                userFriends: [],
                followInProgress: false,
                isAdmin: false,
                token: '',
            };
        case GET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };   
        case FOLLOW: 
            return {
                ...state, 
                userFriends: [...state.userFriends, action.payload],
            };
        case UNFOLLOW: 
            return {
                ...state, 
                userFriends: state.userFriends.filter(f => f !== action.payload),
            };
        case TOGGLE_FOLLOW_PROGRESS:
            return {
                ...state,
                followInProgress: state.followInProgress.includes(action.payload) 
                ? state.followInProgress.filter(id => id !==action.payload)
                : [...state.followInProgress, action.payload],
            };
        case SET_USERS:
            return{
                ...state,
                onlineUsers: action.payload,
            }
        case ENABLE_DARK:
            return{
                ...state,
                currentUser:{
                    ...state.currentUser,
                    userSettings: {
                        ...state.currentUser.userSettings,
                        isDarkMode: true,
                    }
                }
            }
        case DISABLE_DARK:
            return{
                ...state,
                currentUser:{
                    ...state.currentUser,
                    userSettings: {
                        ...state.currentUser.userSettings,
                        isDarkMode: false,
                    }
                }
            }
        default: 
            return state;
    }
}

//auth action creators
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

//auth thunks
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

// export const login = (login, password) => (dispatch) => {
//     AuthAPI.login(login, password).then(response=>{
//         const user = response.data;
//         dispatch(loginUser(user));
//     }).catch(error => {
//         console.log(error.message);
//     })
// };

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

export default AuthReducer;