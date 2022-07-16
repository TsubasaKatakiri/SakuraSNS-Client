import { ADD_TO_BLACKLIST_FAIL, ADD_TO_BLACKLIST_SUCCESS, REMOVE_FROM_BLACKLIST, RESET_BLACKLIST, SET_BLACKLIST_FAIL, SET_BLACKLIST_PROGRESS, SET_BLACKLIST_SUCCESS } from './BlacklistTypes';

const initialState = {
    blacklist: null,
    isFetching: false,
    error: null,
    errorAdd: null,
}


const BlacklistReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_BLACKLIST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case SET_BLACKLIST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                blacklist: action.payload,
            };
        case SET_BLACKLIST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_BLACKLIST:
            return {
                ...state,
                blacklist: null,
                isFetching: false,
                error: null,
                errorAdd: null,
            };
        case ADD_TO_BLACKLIST_SUCCESS:
            return {
                ...state, 
                blacklist: [...state.blacklist, action.payload],
                errorAdd: null
            };
        case ADD_TO_BLACKLIST_FAIL:
            return {
                ...state, 
                errorAdd: action.payload,
            };
        case REMOVE_FROM_BLACKLIST:
            return {
                ...state, 
                blacklist: state.blacklist.filter(b => b._id !== action.payload),
            };
        default: 
            return state;
    }
}

export default BlacklistReducer;