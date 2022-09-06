import { GroupAPI } from "../api/GroupApi";

const GET_GROUP_PROGRESS = "GET_GROUP_PROGRESS";
const GET_GROUP_SUCCESS = "GET_GROUP_SUCCESS";
const GET_GROUP_FAIL = "GET_GROUP_FAIL";
const RESET_GROUP = "RESET_GROUP";

const JOIN_GROUP = "JOIN_GROUP";
const LEAVE_GROUP = "LEAVE_GROUP";
const TOGGLE_JOINING_PROGRESS = "TOGGLE_JOINING_PROGRESS";

const EDIT_GROUP_INFO = "EDIT_GROUP_INFO";
const EDIT_GROUP_POLICIES = "EDIT_GROUP_POLICIES";

const BLOCK_USER = "BLOCK_USER";
const UNBLOCK_USER = "UNBLOCK_USER";
const PROMOTE_USER = "PROMOTE_USER";
const ALLOW_JOIN_USER = "ALLOW_JOIN_USER";
const REFUSE_JOIN_USER = "REFUSE_JOIN_USER";

const ADD_MUSIC_TRACK = "ADD_MUSIC_TRACK";
const DELETE_MUSIC_TRACK = "DELETE_MUSIC_TRACK";

//group initial state
const initialState = {
    group: null,
    isFetching: false,
    error: "",
    joiningInProgress: false,
}

const GroupReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GROUP_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_GROUP_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                group: action.payload,
            };
        case GET_GROUP_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_GROUP:
            return {
                group: null,
                isFetching: false,
                error: "",
                joiningInProgress: false,
            };
        case JOIN_GROUP: 
            return {
                ...state, 
                group: {
                    ...state.group, 
                    members: state.group.policies.isFreeJoin ? [...state.group.members, action.payload] : state.group.members,
                    joinRequests: !state.group.policies.isFreeJoin ? [...state.group.joinRequests, action.payload] : state.group.joinRequests,
                },
            };
        case LEAVE_GROUP: 
            return {
                ...state, 
                group: {...state.group, members: state.group.members.filter(m => m._id !== action.payload)},
            };
        case TOGGLE_JOINING_PROGRESS:
            return {
                ...state,
                joiningInProgress: action.payload,
            }
        case EDIT_GROUP_INFO:
        case EDIT_GROUP_POLICIES:
            return {
                ...state, 
                group: action.payload,
            };
        case BLOCK_USER: 
            return {
                ...state,
                group: {
                    ...state.group, 
                    administrators: state.group.administrators.filter(m => m._id !== action.payload._id),
                    moderators: state.group.moderators.filter(m => m._id !== action.payload._id),
                    members: state.group.members.filter(m => m._id !== action.payload._id), 
                    bans: [...state.group.bans, action.payload]}
            };
        case UNBLOCK_USER: 
            return {
                ...state,
                group: {...state.group, bans: state.group.bans.filter(m => m._id !== action.payload)}
            };
        case PROMOTE_USER: 
            return {
                ...state,
                group: {
                    ...state.group,
                    administrators: action.payload.previous === 'administrators' 
                        ? state.group.administrators.filter(m => m._id !== action.payload.user._id) 
                        : action.payload.updated === 'administrators' 
                            ? [...state.group.administrators, action.payload.user] 
                            : state.group.administrators,
                    moderators: action.payload.previous === 'moderators' 
                        ? state.group.moderators.filter(m => m._id !== action.payload.user._id) 
                        : action.payload.updated === 'moderators' 
                            ? [...state.group.moderators, action.user] 
                            : state.group.moderators,
                }
            };
        case ALLOW_JOIN_USER:
            return {
                ...state,
                group: {
                    ...state.group,
                    members: [...state.group.members, action.payload],
                    joinRequests: state.group.joinRequests.filter(m => m._id !== action.payload), 
                }
            };
        case REFUSE_JOIN_USER:
            return {
                ...state,
                group: {
                    ...state.group,
                    joinRequests: state.group.joinRequests.filter(m => m._id !== action.payload), 
                }
            }
        case ADD_MUSIC_TRACK:
            return {
                ...state,
                group: {
                    ...state.group,
                    music: [...state.group.music, action.payload], 
                }
            }
        case DELETE_MUSIC_TRACK:
            return {
                ...state,
                group: {
                    ...state.group,
                    music: state.group.music.filter(m => m._id !== action.payload), 
                }
            }
        default: 
            return state;
    }
}

//groups action creators
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
const addMusic = (track) => ({type: ADD_MUSIC_TRACK, payload: track});
const deleteMusic = (trackId) => ({type: DELETE_MUSIC_TRACK, payload: trackId});

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

export const addGroupMusic = (groupId, audioData, token) => async (dispatch) => {
    try{
        const res = await GroupAPI.addGroupAudio(groupId, audioData, token);
        dispatch(addMusic(res.audio));
    } catch (e){
        console.log(e);
    }
};

export const deleteGroupMusic = (groupId, audioData, token) => async (dispatch) => {
    try{
        await GroupAPI.deletGroupAudio(groupId, audioData, token);
        dispatch(deleteMusic(audioData.audioId)); 
    } catch (e){
        console.log(e);
    }
};

export default GroupReducer;