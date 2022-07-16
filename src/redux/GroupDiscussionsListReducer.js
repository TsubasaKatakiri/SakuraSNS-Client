import { GroupDiscussionAPI } from "../api/GroupDiscussionApi";

const GET_DISCUSSIONS_LIST_PROGRESS = 'GET_DISCUSSIONS_LIST_PROGRESS';
const GET_DISCUSSIONS_LIST_SUCCESS = 'GET_DISCUSSIONS_LIST_SUCCESS';
const GET_DISCUSSIONS_LIST_FAIL = 'GET_DISCUSSIONS_LIST_FAIL';
const RESET_DISCUSSIONS_LIST = 'RESET_DISCUSSIONS_LIST';
const ADD_DISCUSSION = 'ADD_DISCUSSION';


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


const startGetDiscussions = () => ({type: GET_DISCUSSIONS_LIST_PROGRESS});
const successGetDiscussions = (data) => ({type: GET_DISCUSSIONS_LIST_SUCCESS, payload: data});
const failGetDiscussions = () => ({type: GET_DISCUSSIONS_LIST_FAIL});
export const resetDiscussions = () => ({type: RESET_DISCUSSIONS_LIST});
const addNewDiscussion = (data) => ({type: ADD_DISCUSSION, payload: data});


export const getDiscussions = (groupId, token) => async (dispatch) => {
    dispatch(startGetDiscussions());
    try{
        const res = await GroupDiscussionAPI.getAllDiscussions(groupId, token);
        dispatch(successGetDiscussions(res.discussions));
    } catch (e){
        dispatch(failGetDiscussions());
    }
};

export const addDiscussion = (groupId, discussion, token) => async (dispatch) => {
    try{
        const res = await GroupDiscussionAPI.createDiscussion(groupId, discussion, token);
        dispatch(addNewDiscussion(res.discussion));
    } catch (e){}
};


export default DiscussionListReducer;