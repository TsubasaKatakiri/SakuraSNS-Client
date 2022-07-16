import { GroupEventAPI } from '../../api/GroupEventApi';
import { GET_EVENT_FAIL, GET_EVENT_PROGRESS, GET_EVENT_SUCCESS, JOIN_EVENT, LEAVE_EVENT, RESET_EVENT, TOGGLE_JOIN_EVENT, UPDATE_EVENT } from './GroupEventTypes';

const startGetEvent = () => ({type: GET_EVENT_PROGRESS});
const successGetEvent = (data) => ({type: GET_EVENT_SUCCESS, payload: data});
const failGetEvent = () => ({type: GET_EVENT_FAIL});
export const resetEvent = () => ({type: RESET_EVENT});
const updateEvent = (data) => ({type: UPDATE_EVENT, payload: data});
const joinEvent = (user) => ({type: JOIN_EVENT, payload: user});
const leaveEvent = (userId) => ({type: LEAVE_EVENT, payload: userId});
const toggleJoinEvent = (actionState) => ({type: TOGGLE_JOIN_EVENT, payload: actionState});


export const getCurrentEvent = (eventId, token) => async (dispatch) => {
    dispatch(startGetEvent());
    try{
        const res = await GroupEventAPI.getEvent(eventId, token);
        dispatch(successGetEvent(res.event));
    } catch (e){
        dispatch(failGetEvent());
    }
};

export const updateCurrentEvent = (groupId, eventId, eventData, token) => async (dispatch) => {
    try{
        const res = await GroupEventAPI.editEvent(groupId, eventId, eventData, token);
        console.log(res);
        dispatch(updateEvent(res.event));
    } catch (e){}
};

export const joinCurrentEvent = (groupId, eventId, userId, token) => async (dispatch) => {
    dispatch(toggleJoinEvent(true));
    try{
        const res = await GroupEventAPI.joinEvent(groupId, eventId, userId, token);
        if(res.joined === true) dispatch(joinEvent(res.user));
        if(res.left === true) dispatch(leaveEvent(res.user._id));
    } catch (e){}
    dispatch(toggleJoinEvent(false));
};