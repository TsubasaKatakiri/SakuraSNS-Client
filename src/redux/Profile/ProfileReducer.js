import { CHANGE_USER_EXTRA_DATA, CHANGE_USER_EXTRA_SETTINGS, CHANGE_USER_SETTINGS, CHANGE_USER_STATUS, FOLLOW_USER, RESET_PROFILE, SET_USER_PROFILE_FAIL, SET_USER_PROFILE_PROGRESS, SET_USER_PROFILE_SUCCESS, TOGGLE_FOLLOWING_PROGRESS, UNFOLLOW_USER } from './ProfileTypes';

const initialState = {
    profile: null,
    isFetching: false,
    error: '',
    followingInProgress: false,
}


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
                error: 'An error has occurred',
            };
        case RESET_PROFILE:
            return {
                profile: null,
                isFetching: false,
                error: '',
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

export default ProfileReducer;