import { GroupInfoAPI } from "../api/GroupInfoBlockApi";

const GET_CURRENT_INFO_PROGRESS = "GET_CURRENT_INFO_PROGRESS";
const GET_CURRENT_INFO_SUCCESS = "GET_CURRENT_INFO_SUCCESS";
const GET_CURRENT_INFO_FAIL = "GET_CURRENT_INFO_FAIL";
const RESET_CURRENT_INFO = "RESET_CURRENT_INFO";
const UPDATE_CURRENT_INFO = "UPDATE_CURRENT_INFO";


const initialState = {
    infoBlock: null,
    isFetching: false,
    error: '',
}


const GroupInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CURRENT_INFO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_CURRENT_INFO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                infoBlock: action.payload,
            };
        case GET_CURRENT_INFO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_CURRENT_INFO:
            return {
                ...state,
                infoBlock: null,
                isFetching: false,
                error: ''
            }
        case UPDATE_CURRENT_INFO:
            return {
                ...state,
                infoBlock: action.payload,
            }
        default: 
            return state;
    }
}


const startGetInfo = () => ({type: GET_CURRENT_INFO_PROGRESS});
const successGetInfo = (data) => ({type: GET_CURRENT_INFO_SUCCESS, payload: data});
const failGetInfo = () => ({type: GET_CURRENT_INFO_FAIL});
export const resetCurrentInfo = () => ({type: RESET_CURRENT_INFO});
const updateInfo = (data) => ({type: UPDATE_CURRENT_INFO, payload: data});


export const getInfoBlock = (infoId, token) => async (dispatch) => {
    dispatch(startGetInfo());
    try{
        const res = await GroupInfoAPI.getInfoBlock(infoId, token);
        dispatch(successGetInfo(res.infoBlock));
    } catch (e){
        dispatch(failGetInfo());
    }
};

export const updateInfoBlock = (groupId, infoId, infoData, token) => async (dispatch) => {
    try{
        const res = await GroupInfoAPI.editInfoBlock(groupId, infoId, infoData, token);
        dispatch(updateInfo(res.infoBlock));
    } catch (e){}
};

export default GroupInfoReducer;