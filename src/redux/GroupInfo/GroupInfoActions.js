import { GroupInfoAPI } from '../../api/GroupInfoBlockApi';
import { GET_CURRENT_INFO_FAIL, GET_CURRENT_INFO_PROGRESS, GET_CURRENT_INFO_SUCCESS, RESET_CURRENT_INFO, UPDATE_CURRENT_INFO } from './GroupInfoTypes';

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