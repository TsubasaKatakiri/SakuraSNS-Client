import { GroupInfoAPI } from '../../api/GroupInfoBlockApi';
import { ADD_INFO_TO_LIST, GET_INFOLIST_FAIL, GET_INFOLIST_PROGRESS, GET_INFOLIST_SUCCESS, RESET_INFOLIST } from './GroupInfoListTypes';

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