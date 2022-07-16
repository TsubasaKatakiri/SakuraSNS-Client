import { ADD_INFO_TO_LIST, GET_INFOLIST_FAIL, GET_INFOLIST_PROGRESS, GET_INFOLIST_SUCCESS, RESET_INFOLIST } from './GroupInfoListTypes';

const initialState = {
    info: null,
    isFetching: false,
    error: null,
}


const GroupInfoListReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_INFOLIST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_INFOLIST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                info: action.payload,
            };
        case GET_INFOLIST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_INFOLIST:
            return {
                ...state,
                info: null,
                isFetching: false,
                error: null,
            };
        case ADD_INFO_TO_LIST:
            return {
                ...state,
                info: [...state.info, action.payload],
            };
        default: 
            return state;
    }
}

export default GroupInfoListReducer;