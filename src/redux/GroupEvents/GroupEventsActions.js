import { GroupEventAPI } from '../../api/GroupEventApi';
import { GET_EVENTS_FAIL, GET_EVENTS_PROGRESS, GET_EVENTS_SUCCESS, RESET_EVENTS } from './GroupEventsTypes';

const startGetEvents = () => ({type: GET_EVENTS_PROGRESS});
const successGetEvents = (events) => ({type: GET_EVENTS_SUCCESS, payload: events});
const failGetEvents = () => ({type: GET_EVENTS_FAIL});
export const resetEvents = () => ({type: RESET_EVENTS});


export const getEvents = (groupId, token) => async (dispatch) => {
    dispatch(startGetEvents());
    try{
        const res = await GroupEventAPI.getAllEvents(groupId, token);
        dispatch(successGetEvents(res.events));
    } catch (e){
        dispatch(failGetEvents());
    }
};
