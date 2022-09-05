import { GET_EVENT_FAIL, GET_EVENT_PROGRESS, GET_EVENT_SUCCESS, JOIN_EVENT, LEAVE_EVENT, RESET_EVENT, TOGGLE_JOIN_EVENT, UPDATE_EVENT } from './GroupEventTypes';

const initialState = {
    currentEvent: null,
    isFetching: false,
    joinInProgress: false,
    error: '',
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
                error: 'An error has occurred',
            };
        case RESET_EVENT:
            return {
                ...state,
                currentEvent: null,
                isFetching: false,
                joinInProgress: false,
                error: ''
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

export default EventReducer;