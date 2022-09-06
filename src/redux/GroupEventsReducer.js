import { GroupEventAPI } from "../api/GroupEventApi";

const GET_EVENTS_PROGRESS = 'GET_EVENTS_PROGRESS';
const GET_EVENTS_SUCCESS = 'GET_EVENTS_SUCCESS';
const GET_EVENTS_FAIL = 'GET_EVENTS_FAIL';
const RESET_EVENTS = 'RESET_EVENTS';


const initialState = {
    events: null,
    isFetching: false,
    error: '',
}


const GroupEventsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_EVENTS_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_EVENTS_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                events: action.payload,
            };
        case GET_EVENTS_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_EVENTS:
            return {
                ...state,
                events: null,
                isFetching: false,
                error: '',
            };
        default: 
            return state;
    }
}


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

export default GroupEventsReducer;