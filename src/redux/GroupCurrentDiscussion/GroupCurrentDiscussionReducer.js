import { DELETE_DISCUSSION, GET_DISCUSSION_FAIL, GET_DISCUSSION_PROGRESS, GET_DISCUSSION_SUCCESS, HIDE_DISCUSSION, LOCK_DISCUSSION } from './GroupCurrentDiscussionTypes';

const initialState = {
    discussion: null,
    isFetching: false,
    error: '',
}


const CurrentDiscussionReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DISCUSSION_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_DISCUSSION_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                discussion: action.payload,
            };
        case GET_DISCUSSION_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case LOCK_DISCUSSION:
            return {
                ...state, 
                discussion: {
                    ...state.discussion,
                    isClosed: action.payload,
                },
            };
        case HIDE_DISCUSSION:
            return {
                ...state, 
                discussion: {
                    ...state.discussion,
                    isPrivate: action.payload,
                },
            };
        case DELETE_DISCUSSION:
            return {
                ...state,
                discussion: null,
            }
        default: 
            return state;
    }
}

export default CurrentDiscussionReducer;