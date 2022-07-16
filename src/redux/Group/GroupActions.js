import { GroupAPI } from '../../api/GroupApi';
import { ALLOW_JOIN_USER, BLOCK_USER, EDIT_GROUP_INFO, EDIT_GROUP_POLICIES, GET_GROUP_FAIL, GET_GROUP_PROGRESS, GET_GROUP_SUCCESS, JOIN_GROUP, LEAVE_GROUP, PROMOTE_USER, REFUSE_JOIN_USER, RESET_GROUP, TOGGLE_JOINING_PROGRESS, UNBLOCK_USER } from './GroupTypes';

const startGetGroup = () => ({type: GET_GROUP_PROGRESS});
const successGetGroup = (data) => ({type: GET_GROUP_SUCCESS, payload: data});
const failGetGroup = () => ({type: GET_GROUP_FAIL});
const joinGroup = (userData) => ({type: JOIN_GROUP, payload: userData});
const leaveGroup = (userId) => ({type: LEAVE_GROUP, payload: userId});
const toggleGroupJoiningProgress = (progressState) => ({type: TOGGLE_JOINING_PROGRESS, payload: progressState});
const editGroupInfo = (data) => ({type: EDIT_GROUP_INFO, payload: data});
const editGroupPolicies = (data) => ({type: EDIT_GROUP_POLICIES, payload: data});
const blockUser = (data) => ({type: BLOCK_USER, payload: data});
const unblockUser = (data) => ({type: UNBLOCK_USER, payload: data});
const promoteUser = (user, previous, updated) => ({type: PROMOTE_USER, payload: {user, previous, updated}});
const allowJoinUser = (userId) => ({type: ALLOW_JOIN_USER, payload: userId});
const refuseJoinUser = (userId) => ({type: REFUSE_JOIN_USER, payload: userId});
export const resetGroup = () => ({type: RESET_GROUP});

//group thunks
export const getGroup = (groupId, token) => async (dispatch) => {
    dispatch(startGetGroup());
    try{
        const res = await GroupAPI.getOneGroup(groupId, token);
        dispatch(successGetGroup(res.group));
    } catch (e){
        dispatch(failGetGroup());
    }
};

export const updateGroupInfo = (groupId, infoData, token) => async (dispatch) => {
    try{
        const res = await GroupAPI.editGroupInfo(groupId, infoData, token);
        dispatch(editGroupInfo(res.group));
    } catch (e){
        console.log(e);
    }
};

export const updateGroupPolicies = (groupId, policiesData, token) => async (dispatch) => {
    try{
        const res = await GroupAPI.editGroupPolicies(groupId, policiesData, token);
        dispatch(editGroupPolicies(res.group));
    } catch (e){
        console.log(e);
    }
};

export const join = (groupId, userData, token) => async (dispatch) => {
    dispatch(toggleGroupJoiningProgress(true));
    try{
        await GroupAPI.joinToGroup(groupId, userData._id, token);
        dispatch(joinGroup(userData));
        dispatch(toggleGroupJoiningProgress(false));
    } catch (e){
        console.log(e);
        dispatch(toggleGroupJoiningProgress(false));
    }
}

export const leave = (groupId, userId, token) => async (dispatch) => {
    dispatch(toggleGroupJoiningProgress(true));
    try{
        await GroupAPI.leaveGroup(groupId, userId, token);
        dispatch(leaveGroup(userId));
        dispatch(toggleGroupJoiningProgress(false));
    } catch (e){
        console.log(e);
        dispatch(toggleGroupJoiningProgress(false));
    }
}

export const groupBlock = (groupId, banData, token) => async (dispatch) => {
    try{
        const res = await GroupAPI.processUserBan(groupId, banData, token);
        if(res.banned === true) dispatch(blockUser(res.user));
        else dispatch(unblockUser(res.user));
    } catch (e){
        console.log(e);
    }
}

export const groupPromote = (groupId, levelData, token) => async (dispatch) => {
    try{
        const res = await GroupAPI.processUserLeveling(groupId, levelData, token);
        dispatch(promoteUser(res.user, res.oldLevel, res.newLevel));
    } catch (e){
        console.log(e);
    }
}

export const joinRequestProcess = (groupId, requestData, token) => async (dispatch) => {
    try{
        const res = await GroupAPI.processJoinRequest(groupId, requestData, token);
        if(res.allowed) dispatch(allowJoinUser(requestData.userId));
        else dispatch(refuseJoinUser(requestData.userId));
    } catch (e){
        console.log(e);
    }
}