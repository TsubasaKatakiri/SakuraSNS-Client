import { UserAPI } from "../api/UserApi";

const SET_BLACKLIST_PROGRESS = 'SET_BLACKLIST_PROGRESS';
const SET_BLACKLIST_SUCCESS = 'SET_BLACKLIST_SUCCESS';
const SET_BLACKLIST_FAIL = 'SET_BLACKLIST_FAIL';
const RESET_BLACKLIST = 'RESET_BLACKLIST';
const ADD_TO_BLACKLIST_SUCCESS = 'ADD_TO_BLACKLIST_SUCCESS';
const ADD_TO_BLACKLIST_FAIL = 'ADD_TO_BLACKLIST_FAIL';
const REMOVE_FROM_BLACKLIST = 'REMOVE_FROM_BLACKLIST';


const initialState = {
    blacklist: null,
    isFetching: false,
    error: null,
    errorAdd: null,
}


const BlacklistReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_BLACKLIST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case SET_BLACKLIST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                blacklist: action.payload,
            };
        case SET_BLACKLIST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_BLACKLIST:
            return {
                ...state,
                blacklist: null,
                isFetching: false,
                error: null,
                errorAdd: null,
            };
        case ADD_TO_BLACKLIST_SUCCESS:
            return {
                ...state, 
                blacklist: [...state.blacklist, action.payload],
                errorAdd: null
            };
        case ADD_TO_BLACKLIST_FAIL:
            return {
                ...state, 
                errorAdd: action.payload,
            };
        case REMOVE_FROM_BLACKLIST:
            return {
                ...state, 
                blacklist: state.blacklist.filter(b => b._id !== action.payload),
            };
        default: 
            return state;
    }
}


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


export default BlacklistReducer;