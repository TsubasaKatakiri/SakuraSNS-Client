import { GET_CURRENT_INFO_FAIL, GET_CURRENT_INFO_PROGRESS, GET_CURRENT_INFO_SUCCESS, RESET_CURRENT_INFO, UPDATE_CURRENT_INFO } from './GroupInfoTypes';

const initialState = {
    infoBlock: null,
    isFetching: false,
    error: '',
}


const GroupInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_CURRENT_INFO_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_CURRENT_INFO_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                infoBlock: action.payload,
            };
        case GET_CURRENT_INFO_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_CURRENT_INFO:
            return {
                ...state,
                infoBlock: null,
                isFetching: false,
                error: ''
            }
        case UPDATE_CURRENT_INFO:
            return {
                ...state,
                infoBlock: action.payload,
            }
        default: 
            return state;
    }
}

export default GroupInfoReducer;