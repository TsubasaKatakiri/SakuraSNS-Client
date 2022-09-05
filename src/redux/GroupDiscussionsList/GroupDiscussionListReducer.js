import { ADD_DISCUSSION, GET_DISCUSSIONS_LIST_FAIL, GET_DISCUSSIONS_LIST_PROGRESS, GET_DISCUSSIONS_LIST_SUCCESS, RESET_DISCUSSIONS_LIST } from './GroupDiscussionListTypes';

const initialState = {
    discussions: null,
    isFetching: false,
    error: null,
}


const DiscussionListReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DISCUSSIONS_LIST_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_DISCUSSIONS_LIST_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                discussions: action.payload,
            };
        case GET_DISCUSSIONS_LIST_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_DISCUSSIONS_LIST:
            return {
                ...state,
                discussions: null,
                isFetching: false,
                error: null
            }
        case ADD_DISCUSSION:
            return {
                ...state, 
                discussions: [...state.discussions, action.payload],
            }
        default: 
            return state;
    }
}

export default DiscussionListReducer;