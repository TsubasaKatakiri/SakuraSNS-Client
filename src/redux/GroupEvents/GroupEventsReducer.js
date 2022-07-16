import { GET_EVENTS_FAIL, GET_EVENTS_PROGRESS, GET_EVENTS_SUCCESS, RESET_EVENTS } from './GroupEventsTypes';

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

export default GroupEventsReducer;