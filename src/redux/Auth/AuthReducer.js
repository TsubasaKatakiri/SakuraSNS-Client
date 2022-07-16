import { DISABLE_DARK, ENABLE_DARK, FOLLOW, GET_TOKEN, GET_USER_INFO, LOGIN_USER, LOGOUT_USER, SET_USERS, TOGGLE_FOLLOW_PROGRESS, UNFOLLOW } from './AuthTypes';

const initialState = {
    currentUser: null,
    onlineUsers: [],
    userFriends: [],
    followInProgress: [],
    isAuthenticated: false,
    isAdmin: false,
    token: '',
}

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

export default AuthReducer;