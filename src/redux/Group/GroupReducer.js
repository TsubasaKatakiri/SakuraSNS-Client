import { ALLOW_JOIN_USER, BLOCK_USER, EDIT_GROUP_INFO, EDIT_GROUP_POLICIES, GET_GROUP_FAIL, GET_GROUP_PROGRESS, GET_GROUP_SUCCESS, JOIN_GROUP, LEAVE_GROUP, PROMOTE_USER, REFUSE_JOIN_USER, RESET_GROUP, TOGGLE_JOINING_PROGRESS, UNBLOCK_USER } from './GroupTypes';

const initialState = {
    group: null,
    isFetching: false,
    error: '',
    joiningInProgress: false,
}

const GroupReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_GROUP_PROGRESS:
            return {
                ...state, 
                isFetching: true,
            };
        case GET_GROUP_SUCCESS:
            return {
                ...state, 
                isFetching: false,
                group: action.payload,
            };
        case GET_GROUP_FAIL:
            return {
                ...state, 
                isFetching: false,
                error: 'An error has occurred',
            };
        case RESET_GROUP:
            return {
                group: null,
                isFetching: false,
                error: '',
                joiningInProgress: false,
            };
        case JOIN_GROUP: 
            return {
                ...state, 
                group: {
                    ...state.group, 
                    members: state.group.policies.isFreeJoin ? [...state.group.members, action.payload] : state.group.members,
                    joinRequests: !state.group.policies.isFreeJoin ? [...state.group.joinRequests, action.payload] : state.group.joinRequests,
                },
            };
        case LEAVE_GROUP: 
            return {
                ...state, 
                group: {...state.group, members: state.group.members.filter(m => m._id !== action.payload)},
            };
        case TOGGLE_JOINING_PROGRESS:
            return {
                ...state,
                joiningInProgress: action.payload,
            }
        case EDIT_GROUP_INFO:
        case EDIT_GROUP_POLICIES:
            return {
                ...state, 
                group: action.payload,
            };
        case BLOCK_USER: 
            return {
                ...state,
                group: {
                    ...state.group, 
                    administrators: state.group.administrators.filter(m => m._id !== action.payload._id),
                    moderators: state.group.moderators.filter(m => m._id !== action.payload._id),
                    members: state.group.members.filter(m => m._id !== action.payload._id), 
                    bans: [...state.group.bans, action.payload]}
            };
        case UNBLOCK_USER: 
            return {
                ...state,
                group: {...state.group, bans: state.group.bans.filter(m => m._id !== action.payload)}
            };
        case PROMOTE_USER: 
            return {
                ...state,
                group: {
                    ...state.group,
                    administrators: action.payload.previous === 'administrators' 
                        ? state.group.administrators.filter(m => m._id !== action.payload.user._id) 
                        : action.payload.updated === 'administrators' 
                            ? [...state.group.administrators, action.payload.user] 
                            : state.group.administrators,
                    moderators: action.payload.previous === 'moderators' 
                        ? state.group.moderators.filter(m => m._id !== action.payload.user._id) 
                        : action.payload.updated === 'moderators' 
                            ? [...state.group.moderators, action.user] 
                            : state.group.moderators,
                }
            };
        case ALLOW_JOIN_USER:
            return {
                ...state,
                group: {
                    ...state.group,
                    members: [...state.group.members, action.payload],
                    joinRequests: state.group.joinRequests.filter(m => m._id !== action.payload), 
                }
            };
        case REFUSE_JOIN_USER:
            return {
                ...state,
                group: {
                    ...state.group,
                    joinRequests: state.group.joinRequests.filter(m => m._id !== action.payload), 
                }
            }
        default: 
            return state;
    }
}

export default GroupReducer;