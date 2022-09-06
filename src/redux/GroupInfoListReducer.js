import { GroupInfoAPI } from "../api/GroupInfoBlockApi";

const GET_INFOLIST_PROGRESS = 'GET_INFOLIST_PROGRESS';
const GET_INFOLIST_SUCCESS = 'GET_INFOLIST_SUCCESS';
const GET_INFOLIST_FAIL = 'GET_INFOLIST_FAIL';
const RESET_INFOLIST = 'RESET_INFOLIST';
const ADD_INFO_TO_LIST = 'ADD_INFO_TO_LIST';


const initialState = {
    info: null,
    isFetching: false,
    error: null,
}


const GroupInfoListReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INFOLIST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_INFOLIST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                info: action.payload,
            };
        case GET_INFOLIST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_INFOLIST:
            return {
                ...state,
                info: null,
                isFetching: false,
                error: null,
            };
        case ADD_INFO_TO_LIST:
            return {
                ...state,
                info: [...state.info, action.payload],
            };
        default: 
            return state;
    }
}


const startGetInfo = () => ({type: GET_INFOLIST_PROGRESS});
const successGetInfo = (info) => ({type: GET_INFOLIST_SUCCESS, payload: info});
const failGetInfo = () => ({type: GET_INFOLIST_FAIL});
export const resetInfo = () => ({type: RESET_INFOLIST});
const addInfo = (info) => ({type: ADD_INFO_TO_LIST, payload: info});


export const getInfoList = (groupId, token) => async (dispatch) => {
    dispatch(startGetInfo());
    try{
        const res = await GroupInfoAPI.getAllInfoBlocks(groupId, token);
        dispatch(successGetInfo(res.infoBlocks));
    } catch (e){
        dispatch(failGetInfo());
    }
};

export const addNewInfo = (groupId, infoData, token) => async (dispatch) => {
    try {
        const res = await GroupInfoAPI.createInfoBlock(groupId, infoData, token);
        dispatch(addInfo(res.infoBlock));
    } catch (e) {}
}

export default GroupInfoListReducer;