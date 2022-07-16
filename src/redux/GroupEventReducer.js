import { GroupEventAPI } from './../api/GroupEventApi';

const GET_EVENT_PROGRESS = "GET_EVENT_PROGRESS";
const GET_EVENT_SUCCESS = "GET_EVENT_SUCCESS";
const GET_EVENT_FAIL = "GET_EVENT_FAIL";
const RESET_EVENT = "RESET_EVENT";
const UPDATE_EVENT = "UPDATE_EVENT";
const JOIN_EVENT = "JOIN_EVENT";
const LEAVE_EVENT = "LEAVE_EVENT";
const TOGGLE_JOIN_EVENT = "TOGGLE_JOIN_EVENT";

const initialState = {
    currentEvent: null,
    isFetching: false,
    joinInProgress: false,
    error: "",
}

const EventReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_EVENT_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_EVENT_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                currentEvent: action.payload,
            };
        case GET_EVENT_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: "An error has occurred",
            };
        case RESET_EVENT:
            return {
                ...state,
                currentEvent: null,
                isFetching: false,
                joinInProgress: false,
                error: ""
            }
        case UPDATE_EVENT:
            return {
                ...state,
                currentEvent: action.payload,
            }
        case JOIN_EVENT:
            return {
                ...state,
                currentEvent: {
                    ...state.currentEvent,
                    participants: [...state.currentEvent.participants, action.payload],
                }
            }
        case LEAVE_EVENT:
            return {
                ...state,
                currentEvent: {
                    ...state.currentEvent,
                    participants: state.currentEvent.participants.filter(p=>p._id !==action.payload),
                }
            }
        case TOGGLE_JOIN_EVENT:
            return {
                ...state,
                joinInProgress: action.payload,
            }
        default: 
            return state;
    }
}


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

export default EventReducer;